import { Heart } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2 text-2xl font-bold font-headline text-transparent bg-clip-text bg-gradient-to-r from-[#EA6553] to-[#E34562]">
      <Heart className="h-8 w-8 text-[#E34562]" fill="#E34562" />
      <span className="text-3xl">Divine Match</span>
    </div>
  );
}
