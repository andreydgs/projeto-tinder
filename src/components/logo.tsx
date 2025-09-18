import { Heart } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2 text-2xl font-bold font-headline text-primary">
      <Heart className="h-8 w-8 fill-primary text-primary-foreground" />
      <span className="text-3xl">Divine Match</span>
    </div>
  );
}
