'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle, Heart, Lock, MessageCircle, Seniors, User, Users, ShieldCheck, BadgeCheck } from 'lucide-react';
import { Logo } from '@/components/logo';

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

export default function SalesPage() {
    const [userLocation, setUserLocation] = useState<string>('sua cidade');

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
        <header className="p-4 sm:p-6 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-20">
          <div className="container mx-auto flex flex-col gap-4">
            <div className="flex justify-center">
              <Logo />
            </div>
          </div>
        </header>

      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <section className="text-center mb-10">
            <div className="inline-block bg-destructive/10 text-destructive font-semibold rounded-full px-4 py-2 mb-4">
              🚨 Oferta Exclusiva
            </div>
            <p className="text-lg font-medium mb-4">
              ⏳ Tempo restante: <CountdownTimer />
            </p>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Entre Hoje e Garanta Seu Desconto Exclusivo!
            </h1>
            <p className="text-lg text-muted-foreground">
              🙏 Você está a um passo de viver o amor que Deus preparou para você.
            </p>
            <p className="max-w-3xl mx-auto mt-2">
              Nossa comunidade exclusiva conecta milhares de solteiros cristãos em todo o Brasil que, assim como você, buscam um relacionamento sério baseado na fé e nos valores do Reino.
            </p>
          </section>

          {/* Good News */}
          <div className="bg-green-100 text-green-800 rounded-lg p-4 text-center font-semibold text-lg mb-10">
            💡 Boa notícia: 37 pessoas com seus valores estão online em {userLocation}.
          </div>

          {/* Community Section */}
          <section className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Nossa Comunidade</h2>
            <p className="text-muted-foreground mb-8">
              Um espaço acolhedor, organizado e seguro, criado para facilitar conexões com base na fé, respeito e propósito em diferentes fases da vida.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="text-center">
                <CardHeader>
                  <Heart className="mx-auto h-10 w-10 text-red-400" />
                  <CardTitle>Chat Jovens</CardTitle>
                  <CardDescription>(19 a 39 anos)</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Conexões leves, trocas sinceras e relacionamentos com propósito.</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <Users className="mx-auto h-10 w-10 text-blue-400" />
                  <CardTitle>Chat Adultos</CardTitle>
                  <CardDescription>(40 a 59 anos)</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Conversas conscientes, experiências de vida e relacionamentos edificantes.</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <Seniors className="mx-auto h-10 w-10 text-green-400" />
                  <CardTitle>Chat Sêniores</CardTitle>
                  <CardDescription>(60+)</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Sabedoria, fé e novas possibilidades para viver o amor com maturidade.</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Intentional Interactions */}
          <section className="mb-12">
             <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">💖 Interações com Intenção</h2>
                <p className="text-muted-foreground">Antes de iniciar uma conversa privada, sinalize sua intenção com um coração. Isso ajuda a manter as conexões respeitosas e com propósito.</p>
             </div>
             <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-3 bg-muted p-3 rounded-lg"><Heart className="h-6 w-6 text-red-500 fill-red-500" /> Aberto(a) a um relacionamento sério com base na fé</div>
                <div className="flex items-center gap-3 bg-muted p-3 rounded-lg"><Heart className="h-6 w-6 text-blue-500 fill-blue-500" /> Conversa com propósito e trocas significativas</div>
                <div className="flex items-center gap-3 bg-muted p-3 rounded-lg"><Heart className="h-6 w-6 text-green-500 fill-green-500" /> Disponível para ser chamado no privado</div>
                <div className="flex items-center gap-3 bg-muted p-3 rounded-lg"><Lock className="h-5 w-5 text-gray-500" /> Apenas observando a comunidade por enquanto</div>
             </div>
          </section>

          {/* Our Commitment & Testimonial */}
           <section className="grid md:grid-cols-2 gap-10 items-center mb-12">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Nosso Compromisso</h2>
                <p className="text-muted-foreground mb-6">Criar um ambiente cristão seguro e acolhedor, onde conexões são construídas com autenticidade, fé e propósito.</p>
                <ul className="space-y-3">
                    <li className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-primary" /> Relacionamentos com intenção e direção espiritual</li>
                    <li className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-primary" /> Trocas significativas com pessoas alinhadas na fé</li>
                    <li className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-primary" /> Novas formas de enxergar o amor e o propósito</li>
                    <li className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-primary" /> Espaço para crescer espiritualmente e emocionalmente</li>
                </ul>
              </div>
              <div className="bg-secondary p-6 rounded-lg">
                <MessageCircle className="h-8 w-8 text-secondary-foreground mb-4" />
                <p className="text-lg italic mb-4">"Encontrei meu noivo aqui! Depois de anos em apps vazios, finalmente achei alguém que compartilha minha fé ❤️"</p>
                <div className="flex items-center gap-4">
                  <Image src="https://i.imgur.com/3qV0WxN.jpeg" alt="Foto de Ana Carolina" width={50} height={50} className="rounded-full" />
                  <div>
                    <p className="font-bold">Ana Carolina, 28 anos</p>
                    <p className="text-sm text-muted-foreground">São Paulo, SP</p>
                  </div>
                </div>
              </div>
          </section>
          
          <div className="flex flex-wrap justify-center gap-6 text-center mb-12">
            <div>
              <p className="text-3xl font-bold text-primary">+12.847</p>
              <p className="text-muted-foreground">membros ativos em todo o Brasil</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">2.394</p>
              <p className="text-muted-foreground">relacionamentos iniciados na comunidade</p>
            </div>
          </div>


          {/* Pricing Section */}
          <section className="mb-12">
            <div className="grid md:grid-cols-3 gap-6 items-start">
              {/* Monthly Plan */}
              <Card>
                <CardHeader>
                  <CardTitle>🔹 Acesso Mensal</CardTitle>
                  <CardDescription>Conheça pessoas incríveis que buscam relacionamento com propósito</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <p className="line-through text-muted-foreground">R$ 49,90</p>
                    <p className="text-3xl font-bold">R$ 19,96</p>
                    <p className="text-sm text-muted-foreground">por 30 dias</p>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> Acesso a todos os chats por idade</li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> Sistema de conexão por corações</li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> Conversa privada liberada</li>
                  </ul>
                  <Button asChild className="w-full btn-gradient"><Link href="#">Quero Fazer Parte Agora</Link></Button>
                </CardContent>
              </Card>

              {/* Annual Plan */}
              <Card className="border-primary border-2 relative">
                 <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-sm font-semibold px-3 py-1 rounded-full">MAIS POPULAR</div>
                <CardHeader>
                  <CardTitle>🔸 Acesso Anual</CardTitle>
                  <CardDescription>12 meses de conexões e oportunidades para viver um relacionamento cristão</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <p className="line-through text-muted-foreground">R$ 214,90</p>
                    <p className="text-3xl font-bold">R$ 27,94</p>
                    <p className="text-sm text-muted-foreground">por 12 meses</p>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2 font-bold text-primary"><BadgeCheck className="h-4 w-4" /> Economia de 87%</li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> Acesso a todos os chats por idade</li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> Sistema de conexão por corações</li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> Suporte</li>
                  </ul>
                  <Button asChild className="w-full btn-gradient"><Link href="#">Escolha Inteligente</Link></Button>
                </CardContent>
              </Card>

              {/* Lifetime Plan */}
              <Card>
                 <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-600 text-white text-sm font-semibold px-3 py-1 rounded-full">Melhor Escolha!</div>
                <CardHeader>
                  <CardTitle>🔰 Acesso Vitalício</CardTitle>
                  <CardDescription>🔒 Acesso para sempre + 🎁 Ebook cristão: “Como Superar Traumas de Relacionamentos Passados”</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <p className="line-through text-muted-foreground">R$ 214,90</p>
                    <p className="text-3xl font-bold">R$ 57,90</p>
                    <p className="text-sm text-muted-foreground">pagamento único</p>
                  </div>
                   <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> Acesso vitalício completo</li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> eBook exclusivo (R$ 47,90)</li>
                     <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> Acesso a todos os chats por idade</li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> Sistema de conexão por corações</li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> Suporte VIP vitalício</li>
                  </ul>
                  <Button asChild className="w-full btn-gradient"><Link href="#">🎁 Melhor Escolha!</Link></Button>
                </CardContent>
              </Card>
            </div>
          </section>
          
           {/* Who is this for Section */}
          <section className="bg-secondary rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-center mb-6">💝 Essa comunidade é para você se...</h2>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
              <li className="flex items-start gap-3"><Heart className="h-5 w-5 text-primary mt-1 shrink-0" /> Você busca um relacionamento com propósito e fundamentado na fé</li>
              <li className="flex items-start gap-3"><Heart className="h-5 w-5 text-primary mt-1 shrink-0" /> Está cansado(a) de apps rasos que não levam a nada sério</li>
              <li className="flex items-start gap-3"><Heart className="h-5 w-5 text-primary mt-1 shrink-0" /> Quer conhecer alguém que compartilhe os mesmos valores cristãos</li>
              <li className="flex items-start gap-3"><Heart className="h-5 w-5 text-primary mt-1 shrink-0" /> Acredita que Deus tem alguém especial preparado para você</li>
              <li className="flex items-start gap-3"><Heart className="h-5 w-5 text-primary mt-1 shrink-0" /> Deseja fazer parte de uma comunidade séria e comprometida</li>
            </ul>
          </section>

          {/* Final CTA */}
          <section className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">💖 Sua nova história pode começar agora</h2>
            <p className="bg-green-100 text-green-800 rounded-full px-4 py-2 mb-4 inline-block">✅ 65 pessoas estão online agora — alguém pode estar esperando por você.</p>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">Milhares de pessoas como você já transformaram suas vidas. Não deixe a felicidade passar por você!</p>
            <Button asChild size="lg" className="btn-gradient text-lg px-12 py-8 rounded-full shadow-lg"><Link href="#">Entrar Agora</Link></Button>
          </section>

          {/* FAQ */}
          <section className="max-w-2xl mx-auto mb-12">
             <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>COMO VOU RECEBER O ACESSO?</AccordionTrigger>
                    <AccordionContent>
                    O acesso à comunidade será enviado diretamente para seu e-mail após a confirmação de pagamento. Verifique sua caixa de spam, o link pode estar lá. Caso tenha dificuldade, entre em contato pelo Instagram ou por e-mail. Por favor, aguarde que logo você será respondido! @namoradoscristao
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>A COMUNIDADE É SEGURA?</AccordionTrigger>
                    <AccordionContent>
                    Sim! A segurança e o bem-estar de todos os membros da nossa comunidade Tinder Gospel são prioridade. Estamos sempre atentos, monitorando com responsabilidade cada interação para garantir um espaço respeitoso, saudável e cristão. 🛡️ Contamos com uma equipe que acompanha e orienta os participantes, cuidando para que o ambiente seja acolhedor, verdadeiro e guiado por princípios cristãos. Aqui, você pode se conectar com tranquilidade, sabendo que está em um lugar onde o amor é levado a sério — com fé, respeito e intenção. ❤️✝️
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
          </section>

          {/* Security Footer */}
          <section className="text-center text-sm text-muted-foreground">
             <div className="flex justify-center items-center gap-4 mb-2">
                <ShieldCheck className="h-5 w-5" />
                <span>100% Seguro</span>
                <ShieldCheck className="h-5 w-5" />
                <span>Privacidade Garantida</span>
                <ShieldCheck className="h-5 w-5" />
                <span>Suporte 24h</span>
             </div>
             <p>Seus dados estão protegidos. Transação processada por ambiente seguro.</p>
          </section>

        </div>
      </main>
    </div>
  );
}
