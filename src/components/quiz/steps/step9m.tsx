'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { maleProfiles, type MaleProfile } from '@/lib/male-profiles';
import { cn } from '@/lib/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


const ProfileCard = ({ profile }: { profile: MaleProfile }) => {
    const [isFavorited, setIsFavorited] = useState(false);
  
    const handleFavorite = () => {
      setIsFavorited(!isFavorited);
    };

  return (
    <Card className="overflow-hidden rounded-xl shadow-lg w-full max-w-sm mx-auto">
        <div className="relative">
            <Image
                src={profile.imageUrl}
                alt={`Foto de ${profile.name}`}
                width={400}
                height={400}
                className="w-full h-80 object-cover"
                data-ai-hint={profile.imageHint}
            />
            <div 
                onClick={handleFavorite}
                className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full p-2 cursor-pointer transition-transform hover:scale-110"
            >
                <Heart className={cn("w-6 h-6 text-primary", isFavorited && "fill-current text-primary")} />
            </div>
        </div>
      <CardContent className="p-4 bg-white">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-bold text-foreground">{profile.name}, {profile.age}</h3>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{profile.distance} km</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          {profile.description}
        </p>
      </CardContent>
    </Card>
  );
};


export default function Step9m() {
  return (
    <div className="text-center p-4 flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-primary">
            Pessoas especiais próximas a você
        </h1>
        <p className="text-base text-muted-foreground mb-8 max-w-lg">
            Encontramos perfis que combinam com seus valores e fé.
        </p>
        
        <Carousel className="w-full max-w-sm md:max-w-xl lg:max-w-2xl mb-8" opts={{ loop: true }}>
            <CarouselContent>
                {maleProfiles.map((profile, index) => (
                    <CarouselItem key={index}>
                        <ProfileCard profile={profile} />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
        </Carousel>

        <div className="text-center">
            <p className="text-lg font-semibold text-muted-foreground mb-4">+44 pessoas com seus valores estão esperando por você.</p>
            <Button asChild size="lg" className="btn-gradient px-10 py-6 rounded-full shadow-lg text-base">
                <Link href="#">Ver Todas as Conexões</Link>
            </Button>
        </div>
    </div>
  );
}
