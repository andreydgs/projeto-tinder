import Image from 'next/image';

export function Logo() {
  return (
    <Image
      src="https://i.imgur.com/zLYYCsd.png"
      alt="Divine Match Logo"
      width={180}
      height={45}
      priority
    />
  );
}
