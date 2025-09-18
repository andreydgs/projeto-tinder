'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, MapPin, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { maleProfiles, type MaleProfile } from '@/lib/male-profiles';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';


const ProfileCard = ({ profile, isLocked }: { profile: MaleProfile, isLocked?: boolean }) => {
    const [isFavorited, setIsFavorited] = useState(false);
  
    const handleFavorite = () => {
      setIsFavorited(!isFavorited);
    };

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-none rounded-2xl text-white p-4">
      <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 shrink-0">
             {isLocked ? (
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                    <User className="w-8 h-8 text-white/50" />
                </div>
             ) : (
                <Image
                    src={profile.imageUrl}
                    alt={`Foto de ${profile.name}`}
                    width={64}
                    height={64}
                    className="rounded-full object-cover w-16 h-16"
                    data-ai-hint={profile.imageHint}
                />
             )}
          </div>
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <div>
                <h3 className="text-lg font-bold">{profile.name}, {profile.age}</h3>
                <p className="text-sm text-white/80 mt-1">
                {profile.description}
                </p>
            </div>
            <div className="flex items-center gap-1 text-xs bg-black/20 text-white rounded-full px-2 py-1 shrink-0 ml-2">
                <MapPin className="h-3 w-3" />
                <span>{profile.distance} km</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};


export default function Step9m() {
  return (
    <div className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center p-4" style={{backgroundImage: "url('https://images.unsplash.com/photo-1505015390626-60729354b67b?q=80&w=2070&auto=format&fit=crop')"}}>
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
        <Card className="relative z-10 w-full max-w-md bg-black/40 backdrop-blur-lg border-white/20 rounded-3xl text-white shadow-2xl overflow-hidden">
            <CardContent className="p-6">
                <div className="text-center mb-6">
                    <Heart className="w-10 h-10 text-primary mx-auto mb-2" fill="hsl(var(--primary))" />
                    <h1 className="text-2xl md:text-3xl font-bold">
                        Pessoas especiais em Porto Alegre
                    </h1>
                    <p className="text-base text-white/80 mt-1">
                        Encontramos perfis que combinam com seus valores e fé.
                    </p>
                </div>
                
                <ScrollArea className="h-80 w-full pr-3">
                    <div className="space-y-3">
                        {maleProfiles.slice(0, 3).map((profile, index) => (
                            <ProfileCard key={index} profile={profile} isLocked={index > 0} />
                        ))}
                    </div>
                </ScrollArea>
                
                <div className="text-center mt-6">
                    <div className="bg-white/10 rounded-xl p-3 text-sm mb-4">
                        <p>+78 pessoas com seus valores estão esperando por você em Porto Alegre</p>
                    </div>
                    <Button asChild size="lg" className="w-full btn-gradient px-10 py-7 rounded-full shadow-lg text-lg">
                        <Link href="#">
                            Ver Todas as Conexões
                            <Heart className="w-5 h-5 ml-2" />
                        </Link>
                    </Button>
                    <p className="text-xs text-white/60 mt-3">Seus valores e fé atraíram pessoas incríveis da sua região</p>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
