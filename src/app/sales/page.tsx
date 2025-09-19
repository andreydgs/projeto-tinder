
'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle, Heart, Lock, MessageCircle, User, Users, ShieldCheck, BadgeCheck, Accessibility, Hourglass, Crown, Star, Wifi } from 'lucide-react';
import { Logo } from '@/components/logo';
import { LiteVideoPlayer } from '@/components/lite-video-player';
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"


const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ minutes: 14, seconds: 44 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime.seconds > 0) {
          return { ...prevTime, seconds: prevTime.seconds - 1 };
        }
        if (prevTime.minutes > 0) {
          return { minutes: prevTime.minutes - 1, seconds: 59 };
        }
        return prevTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <span className="font-bold">
      {String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
    </span>
  );
};

const testimonials = [
  {
    quote: "Encontrei meu noivo aqui! Finalmente achei alguém que compartilha minha fé ❤️",
    name: "Ana Carolina",
    age: 28,
    location: "São Paulo, SP",
    imageUrl: "https://i.imgur.com/3qV0WxN.jpeg",
  },
  {
    quote: "Diferente de outros apps, aqui encontrei pessoas sérias que querem algo real. Vale cada centavo! ⭐",
    name: "João Pedro",
    age: 29,
    location: "Brasília, DF",
    imageUrl: "https://i.imgur.com/t3CUM7I.jpeg",
  },
    {
    quote: "Casei há 6 meses com quem conheci aqui! Deus realmente tinha preparado alguém especial para mim 💒",
    name: "Priscila Lima",
    age: 26,
    location: "Belo Horizonte, MG",
    imageUrl: "https://i.pinimg.com/736x/4e/7b/75/4e7b7540dd1b95e727692dc32f59eeda.jpg",
  },
]

export default function SalesPage() {
    const [userLocation, setUserLocation] = useState<string>('sua cidade');

    const autoplayPlugin = useRef(
      Autoplay({ delay: 4000, stopOnInteraction: true })
    );

    useEffect(() => {
        async function fetchLocation() {
            try {
                const response = await fetch('https://ipapi.co/json/');
                if (!response.ok) throw new Error('Failed to fetch location');
                const data = await response.json();
                setUserLocation(data.city);
            } catch (error) {
                console.error("Error fetching user's location:", error);
            }
        }
        fetchLocation();
    }, []);

  return (
    <div className="bg-background text-foreground">
        <header className="py-4 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-20">
          <div className="container mx-auto flex flex-col gap-2 px-4">
            <div className="flex justify-center">
              <Logo />
            </div>
          </div>
        </header>

        <section className="bg-destructive text-destructive-foreground text-center py-2">
          <div className="container mx-auto px-4">
              <p className="text-sm font-medium flex items-center justify-center gap-1">
                  <Hourglass className="h-4 w-4"/> OFERTA EXCLUSIVA | Tempo restante: <CountdownTimer />
              </p>
          </div>
        </section>

      <main className="container mx-auto px-4 py-4 sm:py-6 md:py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <section className="text-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Você está a um passo de viver o amor que Deus preparou para você.
            </h1>
            <p className="text-base md:text-lg text-muted-foreground">
              Nossa comunidade exclusiva conecta milhares de solteiros cristãos em todo o Brasil que, assim como você, buscam um relacionamento sério baseado na fé e nos valores do Reino.
            </p>
              <div className="w-full max-w-sm mx-auto my-4 rounded-xl overflow-hidden shadow-lg">
                <LiteVideoPlayer
                    videoId="9e71b1eb-1df5-40a3-848e-b56dc655bf67"
                    aspectRatio="9:16"
                    baseUrl="https://app.litevideo.net"
                    params="aspectRatio=9%3A16&coverColor=%23e44960&progressSpeed=normal&progressBarHeight=7&showCover=true&coverStyle=gradient&playIconStyle=circle&playIconSize=huge&showTitle=true&showControls=false&showProgressBar=true&iconColor=%23ffffff&progressBarColor=%23ffffff&controlsStyle=default&controlsPosition=bottom&controlsColor=%23ffffff&controlsBackground=gradient&hoverEffect=fade&autoPlay=true&loop=true&liveSimulatorEnabled=false&liveSimulatorViewersMin=10&liveSimulatorViewersMax=50&liveSimulatorGrowthRate=moderate&domainLockEnabled=false&domainLockDomains=&showComments=false"
                />
              </div>
              <Button asChild size="lg" className="w-full max-w-sm mx-auto text-white text-base py-6 rounded-lg" style={{ backgroundColor: '#22C55E' }}>
                <Link href="#">ACESSAR AGORA</Link>
              </Button>
          </section>

          {/* Good News */}
          <div className="bg-green-100 text-green-800 rounded-lg p-3 text-center font-semibold text-base mb-6">
            💡 Boa notícia: 37 pessoas com seus valores estão online em {userLocation}.
          </div>

          {/* Our Commitment & Testimonial */}
           <section className="mb-8 space-y-8">
              <div>
                <h2 className="text-xl md:text-3xl font-bold mb-3">Nosso Compromisso</h2>
                <p className="text-muted-foreground mb-4 text-sm">Criar um ambiente cristão seguro onde conexões são construídas com autenticidade, fé e propósito.</p>
                <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-3"><CheckCircle className="h-4 w-4 text-primary" /> Relacionamentos com intenção</li>
                    <li className="flex items-center gap-3"><CheckCircle className="h-4 w-4 text-primary" /> Trocas significativas com pessoas de fé</li>
                    <li className="flex items-center gap-3"><CheckCircle className="h-4 w-4 text-primary" /> Crescimento espiritual e emocional</li>
                </ul>
              </div>
              <Carousel
                plugins={[autoplayPlugin.current]}
                className="w-full max-w-md mx-auto"
                onMouseEnter={autoplayPlugin.current.stop}
                onMouseLeave={autoplayPlugin.current.reset}
                opts={{ loop: true }}
              >
                <CarouselContent>
                  {testimonials.map((testimonial, index) => (
                    <CarouselItem key={index}>
                      <div className="bg-secondary p-4 rounded-lg flex flex-col h-full">
                        <MessageCircle className="h-6 w-6 text-secondary-foreground mb-2" />
                        <p className="text-base italic mb-3 flex-grow">"{testimonial.quote}"</p>
                        <div className="flex items-center gap-3">
                           <div className="relative w-10 h-10">
                              <Image 
                                src={testimonial.imageUrl} 
                                alt={`Foto de ${testimonial.name}`} 
                                fill
                                className="rounded-full object-cover"
                              />
                           </div>
                          <div>
                            <p className="font-bold text-sm">{testimonial.name}, {testimonial.age} anos</p>
                            <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
          </section>
          
          <div className="flex justify-around text-center mb-8">
            <div>
              <p className="text-2xl font-bold text-primary">+12.8K</p>
              <p className="text-muted-foreground text-xs">membros ativos</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">2.3K</p>
              <p className="text-muted-foreground text-xs">relacionamentos</p>
            </div>
          </div>
          
           {/* Who is this for Section */}
          <section className="bg-secondary rounded-lg p-6 mb-8">
            <h2 className="text-lg font-bold text-center mb-4">💝 Essa comunidade é para você se...</h2>
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
              <li className="flex items-start gap-2"><Heart className="h-4 w-4 text-primary mt-0.5 shrink-0" /> Busca um relacionamento com propósito</li>
              <li className="flex items-start gap-2"><Heart className="h-4 w-4 text-primary mt-0.5 shrink-0" /> Cansado(a) de apps rasos</li>
              <li className="flex items-start gap-2"><Heart className="h-4 w-4 text-primary mt-0.5 shrink-0" /> Quer alguém com mesmos valores</li>
              <li className="flex items-start gap-2"><Heart className="h-4 w-4 text-primary mt-0.5 shrink-0" /> Acredita no tempo de Deus</li>
            </ul>
          </section>

           {/* Pricing Section */}
          <section className="mb-8">
             <h2 className="text-xl md:text-3xl font-bold text-center mb-4">Escolha seu Plano</h2>
            <div className="grid md:grid-cols-3 gap-6 items-center">

              {/* Basic Plan */}
                <Card className="rounded-2xl">
                    <CardHeader className="p-6 text-center">
                    <CardTitle className="text-xl">Plano Básico</CardTitle>
                    <p className="text-4xl font-bold">R$ 17,90</p>
                    <CardDescription>Acesso limitado</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 p-6 pt-0">
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> 5 matches por dia</li>
                        <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> Chat básico</li>
                        <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> Filtros simples</li>
                    </ul>
                    <Button asChild className="w-full btn-gradient"><Link href="#">Escolher Plano</Link></Button>
                    </CardContent>
                </Card>

              {/* Premium Plan */}
                <Card className="border-primary border-2 rounded-2xl relative bg-gradient-to-br from-pink-500 to-red-500 text-white">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-black text-sm font-semibold px-4 py-1 rounded-full flex items-center gap-2">
                        <Crown className="w-4 h-4"/>
                        Mais Popular
                    </div>
                    <CardHeader className="p-6 text-center">
                    <CardTitle className="text-xl">Plano Premium</CardTitle>
                    <p className="text-4xl font-bold">R$ 27,90</p>
                    <CardDescription className="text-white/90">Acesso completo</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 p-6 pt-0">
                    <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4" /> Matches ilimitados</li>
                        <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4" /> Chat ilimitado</li>
                        <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4" /> Filtros avançados</li>
                        <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4" /> Prioridade no suporte</li>
                        <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4" /> Ver quem curtiu você</li>
                    </ul>
                     <Button asChild className="w-full bg-white text-primary hover:bg-white/90"><Link href="#">Escolher Plano</Link></Button>
                    </CardContent>
                </Card>

              {/* Alliance Plan */}
                <Card className="rounded-2xl bg-amber-50 border-2 border-amber-400 relative">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-400 text-black text-sm font-semibold px-4 py-1 rounded-full flex items-center gap-2">
                        <Star className="w-4 h-4"/>
                        Premium Plus
                    </div>
                    <CardHeader className="p-6 text-center">
                    <CardTitle className="text-xl">Plano Aliança</CardTitle>
                    <p className="text-4xl font-bold">R$ 37,90</p>
                    <CardDescription className="text-amber-800">Acesso completo + benefícios exclusivos</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 p-6 pt-0">
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-amber-600" /> Matches ilimitados</li>
                        <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-amber-600" /> Chat ilimitado</li>
                        <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-amber-600" /> Filtros avançados</li>
                        <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-amber-600" /> Prioridade no suporte</li>
                        <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-amber-600" /> Ver quem curtiu você</li>
                        <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-amber-600" /> Ver quem visitou seu perfil</li>
                        <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-amber-600" /> Enviar mensagens sem match</li>
                        <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-amber-600" /> 1 Boost por semana</li>
                        <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-amber-600" /> Destaque no ranking</li>
                        <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-amber-600" /> Selo "Busca Relacionamento Sério"</li>
                    </ul>
                    <Button asChild className="w-full btn-gradient"><Link href="#">Escolher Plano</Link></Button>
                    </CardContent>
                </Card>

            </div>
          </section>

          {/* Community Section */}
          <section className="text-center mb-8">
            <h2 className="text-xl md:text-3xl font-bold mb-2">Nossa Comunidade</h2>
            <p className="text-muted-foreground text-sm mb-4">
              Um espaço acolhedor, organizado e seguro para conexões com base na fé.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="text-left bg-card p-4">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-400 fill-red-400" />
                    Chat Jovens
                  </CardTitle>
                  <CardDescription className="text-xs pl-7 mb-2">(19 a 39 anos)</CardDescription>
                <CardContent className="p-0 pl-7 text-xs text-muted-foreground">
                  Conexões leves, trocas sinceras e relacionamentos com propósito.
                </CardContent>
              </Card>
              <Card className="text-left bg-card p-4">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Heart className="h-5 w-5 text-blue-400 fill-blue-400" />
                    Chat Adultos
                  </CardTitle>
                  <CardDescription className="text-xs pl-7 mb-2">(40 a 59 anos)</CardDescription>
                <CardContent className="p-0 pl-7 text-xs text-muted-foreground">
                  Conversas conscientes, experiências de vida e relacionamentos edificantes.
                </CardContent>
              </Card>
              <Card className="text-left bg-card p-4">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Heart className="h-5 w-5 text-green-400 fill-green-400" />
                    Chat Sêniores
                  </CardTitle>
                  <CardDescription className="text-xs pl-7 mb-2">(60+)</CardDescription>
                <CardContent className="p-0 pl-7 text-xs text-muted-foreground">
                  Sabedoria, fé e novas possibilidades para viver o amor com maturidade.
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Final CTA */}
          <section className="text-center mb-8">
            <h2 className="text-xl font-bold mb-2">Sua nova história pode começar agora, essa chance pode não aparecer novamente</h2>
             <p className="bg-green-100 text-green-800 rounded-full px-3 py-1 mb-4 inline-flex items-center gap-2 text-sm">
                <Wifi className="h-4 w-4 animate-pulse" />
                746 pessoas estão online agora.
            </p>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto text-sm">Milhares de pessoas já encontraram seu par através do APP. Faça parte da nossa comunidade cristã exclusiva.</p>
            <Button asChild size="lg" className="text-white text-base py-6 rounded-lg" style={{ backgroundColor: '#22C55E' }}><Link href="#">ACESSAR AGORA</Link></Button>
          </section>

          {/* FAQ */}
          <section className="max-w-2xl mx-auto mb-8">
             <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="text-sm">COMO VOU RECEBER O ACESSO?</AccordionTrigger>
                    <AccordionContent className="text-sm">
                    O acesso à comunidade será enviado para seu e-mail após a confirmação de pagamento. Verifique sua caixa de spam. Em caso de dificuldade, contate-nos em @tindercristao.app
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger className="text-sm">A COMUNIDADE É SEGURA?</AccordionTrigger>
                    <AccordionContent className="text-sm">
                    Sim! A segurança é nossa prioridade. Monitoramos as interações para garantir um espaço respeitososo e cristão, com uma equipe dedicada para orientar e cuidar do bem-estar de todos.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
          </section>

          {/* Security Footer */}
          <section className="text-center text-xs text-muted-foreground">
             <div className="flex justify-center items-center gap-3 mb-2">
                <ShieldCheck className="h-4 w-4" />
                <span>100% Seguro</span>
             </div>
             <p>Seus dados estão protegidos. Transação processada por ambiente seguro.</p>
          </section>

        </div>
      </main>
    </div>
  );
}
