'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export default function ThreeDemo() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.shadowMap.enabled = true;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const fov = 45;
    const aspect = canvas.clientWidth / canvas.clientHeight;
    const near = 0.1;
    const far = 100;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 10, 20);

    // Camera will be repositioned after model loads via frameArea
    // Mouse-driven camera orbit replaces manual OrbitControls

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#000000');



    {
      const skyColor = 0xd7e0e6;
      const groundColor = 0x8a8a8a;
      const intensity = 1;
      const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
      scene.add(light);
    }

    let dirLight;
    let helper;
    let cameraHelper;

    {
      const color = 0xf2f2f2;
      const intensity = 0.8;
      dirLight = new THREE.DirectionalLight(color, intensity);
      dirLight.castShadow = true;
      dirLight.position.set(-250, 800, -850);
      dirLight.target.position.set(-550, 40, -450);

      dirLight.shadow.bias = -0.004;
      dirLight.shadow.mapSize.width = 2048;
      dirLight.shadow.mapSize.height = 2048;

      scene.add(dirLight);
      scene.add(dirLight.target);
      
      const cam = dirLight.shadow.camera;
      cam.near = 1;
      cam.far = 2000;
      cam.left = -1500;
      cam.right = 1500;
      cam.top = 1500;
      cam.bottom = -1500;

      cameraHelper = new THREE.CameraHelper(cam);
      scene.add(cameraHelper);
      cameraHelper.visible = false;
      
      helper = new THREE.DirectionalLightHelper(dirLight, 100);
      scene.add(helper);
      helper.visible = false;
    }

    function updateCamera() {
      dirLight.updateMatrixWorld();
      dirLight.target.updateMatrixWorld();
      helper.update();
      dirLight.shadow.camera.updateProjectionMatrix();
      cameraHelper.update();
    }

    function frameArea(sizeToFitOnScreen, boxSize, boxCenter, camera) {
      const halfSizeToFitOnScreen = sizeToFitOnScreen * 0.5;
      const halfFovY = THREE.MathUtils.degToRad(camera.fov * .5);
      const distance = halfSizeToFitOnScreen / Math.tan(halfFovY);
      const direction = (new THREE.Vector3())
        .subVectors(camera.position, boxCenter)
        .multiply(new THREE.Vector3(1, 0, 1))
        .normalize();

      camera.position.copy(direction.multiplyScalar(distance).add(boxCenter));
      camera.near = boxSize / 100;
      camera.far = boxSize * 100;
      camera.updateProjectionMatrix();
      camera.lookAt(boxCenter.x, boxCenter.y, boxCenter.z);
    }

    let curve;
    let curveObject;
    {
      const controlPoints = [
        [1.118281, 5.115846, -3.681386],
        [3.948875, 5.115846, -3.641834],
        [3.960072, 5.115846, -0.240352],
        [3.985447, 5.115846, 4.585005],
        [-3.793631, 5.115846, 4.585006],
        [-3.826839, 5.115846, -14.736200],
        [-14.542292, 5.115846, -14.765865],
        [-14.520929, 5.115846, -3.627002],
        [-5.452815, 5.115846, -3.634418],
        [-5.467251, 5.115846, 4.549161],
        [-13.266233, 5.115846, 4.567083],
        [-13.250067, 5.115846, -13.499271],
        [4.081842, 5.115846, -13.435463],
        [4.125436, 5.115846, -5.334928],
        [-14.521364, 5.115846, -5.239871],
        [-14.510466, 5.115846, 5.486727],
        [5.745666, 5.115846, 5.510492],
        [5.787942, 5.115846, -14.728308],
        [-5.423720, 5.115846, -14.761919],
        [-5.373599, 5.115846, -3.704133],
        [1.004861, 5.115846, -3.641834],
      ];
      const p0 = new THREE.Vector3();
      const p1 = new THREE.Vector3();
      curve = new THREE.CatmullRomCurve3(
        controlPoints.map((p, ndx) => {
          p0.set(...p);
          p1.set(...controlPoints[(ndx + 1) % controlPoints.length]);
          return [
            (new THREE.Vector3()).copy(p0),
            (new THREE.Vector3()).lerpVectors(p0, p1, 0.1),
            (new THREE.Vector3()).lerpVectors(p0, p1, 0.9),
          ];
        }).flat(),
        true,
      );
      {
        const points = curve.getPoints(250);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({ color: 0x888888 });
        curveObject = new THREE.Line(geometry, material);
        curveObject.scale.set(100, 100, 100);
        curveObject.position.y = -621;
        curveObject.visible = false;
        scene.add(curveObject);
      }
    }

    const cars = [];
    {
      const gltfLoader = new GLTFLoader();
      gltfLoader.load(
        '/models/cartoon_lowpoly_small_city_free_pack/scene.gltf',
        (gltf) => {
          const root = gltf.scene;
          scene.add(root);

          root.traverse((obj) => {
            if (obj.castShadow !== undefined) {
              obj.castShadow = true;
              obj.receiveShadow = true;
            }
          });

          const loadedCars = root.getObjectByName('Cars');
          const fixes = [
            { prefix: 'Car_08', y: 0, rot: [Math.PI * .5, 0, Math.PI * .5], },
            { prefix: 'CAR_03', y: 33, rot: [0, Math.PI, 0], },
            { prefix: 'Car_04', y: 40, rot: [0, Math.PI, 0], },
          ];

          root.updateMatrixWorld();
          for (const car of loadedCars.children.slice()) {
            const fix = fixes.find(fix => car.name.startsWith(fix.prefix));
            if (!fix) continue;
            const obj = new THREE.Object3D();
            car.position.set(0, fix.y, 0);
            car.rotation.set(...fix.rot);
            obj.add(car);
            scene.add(obj);
            cars.push(obj);
          }

          const box = new THREE.Box3().setFromObject(root);
          const boxSize = box.getSize(new THREE.Vector3()).length();
          const boxCenter = box.getCenter(new THREE.Vector3());

          frameArea(boxSize * 0.5, boxSize, boxCenter, camera);
          cameraTarget.copy(boxCenter);
        }
      );
    }

    function resizeRendererToDisplaySize(renderer) {
      const canvas = renderer.domElement;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const needResize = canvas.width !== width || canvas.height !== height;
      if (needResize) {
        renderer.setSize(width, height, false);
      }
      return needResize;
    }

    const carPosition = new THREE.Vector3();
    const carTarget = new THREE.Vector3();
    let animId;

    // Mouse cursor camera orbit
    let mouseX = 0;
    let mouseY = 0;
    let currentCamX = 0;
    let currentCamY = 0;
    let cameraTarget = new THREE.Vector3(0, 5, 0);
    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    function render(time) {
      time *= 0.001;

      if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }

      // Smooth cursor-driven camera orbit
      currentCamX += (mouseX - currentCamX) * 0.04;
      currentCamY += (mouseY - currentCamY) * 0.04;
      const radius = camera.position.distanceTo(cameraTarget);
      if (radius > 0) {
        const theta = currentCamX * (Math.PI / 6);
        const phi  = (0.35 + currentCamY * 0.15) * Math.PI;
        camera.position.set(
          cameraTarget.x + radius * Math.sin(phi) * Math.sin(theta),
          cameraTarget.y + radius * Math.cos(phi),
          cameraTarget.z + radius * Math.sin(phi) * Math.cos(theta)
        );
        camera.lookAt(cameraTarget);
      }

      if (curveObject) {
        const pathTime = time * .01;
        const targetOffset = 0.01;
        cars.forEach((car, ndx) => {
          const u = pathTime + ndx / cars.length;

          curve.getPointAt(u % 1, carPosition);
          carPosition.applyMatrix4(curveObject.matrixWorld);

          curve.getPointAt((u + targetOffset) % 1, carTarget);
          carTarget.applyMatrix4(curveObject.matrixWorld);

          car.position.copy(carPosition);
          car.lookAt(carTarget);
          car.position.lerpVectors(carPosition, carTarget, 0.5);
        });
      }

      renderer.render(scene, camera);
      animId = requestAnimationFrame(render);
    }

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animId);
      renderer.dispose();
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative', backgroundColor: '#000000' }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
    </div>
  );
}
