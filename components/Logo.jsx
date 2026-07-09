import Image from 'next/image';
import logoImg from './Dr.Street_Logo_bg_removed.png';

export default function Logo({ scale = 1 }) {
  return (
    <Image 
      src={logoImg} 
      alt="Dr.Street Logo"
      width={250 * scale} 
      height={70 * scale} 
      style={{ objectFit: 'contain', flexShrink: 0 }}
      priority
    />
  );
}
