'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, Lock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { maleProfiles, type MaleProfile } from '@/lib/male-profiles';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useQuiz } from '@/contexts/quiz-provider';


const ProfileCard = ({ profile, isLocked }: { profile: MaleProfile, isLocked?: boolean }) => {

  return (
    <Card className="bg-secondary/50 border-border rounded-2xl p-4">
      <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 shrink-0">
             <Image
                src={profile.imageUrl}
                alt={`Foto de ${profile.name}`}
                fill
                className={cn("rounded-full object-cover", isLocked && "blur-sm")}
                data-ai-hint={profile.imageHint}
            />
             {isLocked && (
                <div className="absolute inset-0 w-16 h-16 rounded-full bg-black/30 flex items-center justify-center">
                    <Lock className="w-6 h-6 text-white" />
                </div>
             )}
          </div>
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <div>
                <h3 className="text-lg font-bold">{profile.name}, {profile.age}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                {profile.description}
                </p>
            </div>
            <div className="flex items-center gap-1 text-xs bg-black/10 dark:bg-white/10 text-foreground rounded-full px-2 py-1 shrink-0 ml-2">
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
  const { answers } = useQuiz();
  const userAge = answers.age || 0;

  const getFilteredProfiles = () => {
    let minAge: number, maxAge: number;

    if (userAge <= 29) {
      minAge = 20;
      maxAge = 40;
    } else if (userAge >= 30 && userAge <= 49) {
      minAge = 25;
      maxAge = 50;
    } else {
      minAge = 40;
      maxAge = 65;
    }
    
    const firstProfile = maleProfiles[0];
    const otherProfiles = maleProfiles.slice(1).filter(p => p.age >= minAge && p.age <= maxAge);

    return [firstProfile, ...otherProfiles];
  }

  const profilesToShow = getFilteredProfiles();

  return (
    <div className="container mx-auto py-4 px-4 sm:py-6 md:py-8">
        <Card className="w-full max-w-2xl mx-auto bg-card border-none shadow-none text-card-foreground">
            <CardContent className="p-0">
                <div className="text-center mb-4">
                    <Heart className="w-10 h-10 text-primary mx-auto mb-2" fill="hsl(var(--primary))" />
                    <h1 className="text-2xl md:text-3xl font-bold">
                        Pessoas especiais próximas a você
                    </h1>
                    <p className="text-base text-muted-foreground mt-1">
                        Encontramos perfis que combinam com seus valores e fé.
                    </p>
                </div>
                
                <ScrollArea className="h-80 w-full pr-3 mb-4">
                    <div className="space-y-3">
                        {profilesToShow.map((profile, index) => (
                            <ProfileCard key={index} profile={profile} isLocked={index > 0} />
                        ))}
                    </div>
                </ScrollArea>
                
                <div className="text-center">
                    <div className="bg-muted rounded-xl p-3 text-sm mb-4">
                        <p>+78 pessoas com seus valores estão esperando por você</p>
                    </div>
                    <Button asChild size="lg" className="w-full btn-gradient px-10 py-7 rounded-full shadow-lg text-lg">
                        <Link href="/sales">
                            Ver Todas as Conexões
                            <Heart className="w-5 h-5 ml-2" />
                        </Link>
                    </Button>
                    <p className="text-xs text-muted-foreground mt-3">Seus valores e fé atraíram pessoas incríveis da sua região</p>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
