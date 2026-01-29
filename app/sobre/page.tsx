
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Footer } from '@/components/ui/footer';

export const dynamic = 'force-dynamic';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-gray-50 text-slate-900 flex flex-col">
            <div className="bg-slate-900 py-12">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
                    <Link href="/" className="absolute left-6 top-1 text-gray-400 hover:text-white flex items-center gap-2 transition-colors">
                        <ArrowLeft size={20} />
                        Voltar
                    </Link>
                    <div className="text-center">
                        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Sobre a Clean Tech Pro</h1>
                    </div>
                </div>
            </div>

            <div className="flex-grow py-16 sm:py-24">
                <div className="mx-auto max-w-3xl px-6 lg:px-8">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        {/* Placeholder for Image - User can replace src later or provide valid URL */}
                        <div className="mb-8 rounded-xl overflow-hidden bg-gray-100 aspect-video relative">
                            {/* Attempting to use the image user hinted at, or a solid fallback if it fails */}
                            <img
                                src="https://cleantechpro.com.br/wp-content/uploads/2024/08/jose-vanderlei.jpg"
                                alt="Jose Vanderlei Santos"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                    e.currentTarget.parentElement!.innerText = 'Foto do Fundador (Adicione aqui)';
                                    e.currentTarget.parentElement!.className += ' flex items-center justify-center text-gray-400 font-medium';
                                }}
                            />
                        </div>

                        <div className="space-y-6 text-lg leading-8 text-gray-600">
                            <p>
                                A Clean Tech Pro nasceu com um propósito claro: levar soluções acessíveis e eficientes em locação de equipamentos de limpeza para empresas de todos os tamanhos. Nosso diferencial vai além da tecnologia de ponta — oferecemos suporte técnico especializado, com agilidade e qualidade, resolvendo uma das maiores dores do setor: a manutenção dos equipamentos.
                            </p>
                            <p>
                                Por trás dessa missão está o nosso fundador, <strong>Jose Vanderlei Santos</strong>, um nome com mais de 30 anos de experiência no mercado de limpeza profissional. Sua trajetória começou como vendedor e evoluiu até se tornar distribuidor de grandes marcas de produtos químicos e equipamentos de limpeza. Ao longo desse caminho, Vanderlei acumulou conhecimento prático, visão estratégica e uma profunda compreensão das necessidades do setor.
                            </p>
                            <p>
                                Foi justamente essa vivência que o motivou a criar a Clean Tech Pro: uma empresa que unisse tecnologia, praticidade e suporte técnico de verdade — tudo com foco em acessibilidade e atendimento de excelência, tanto para pequenos negócios quanto para grandes operações.
                            </p>
                            <p>
                                Hoje, com centenas de clientes atendidos e um portfólio robusto de equipamentos modernos como lavadoras, varredeiras, polidoras e muito mais, seguimos firmes no nosso compromisso: oferecer performance e tranquilidade para quem cuida da limpeza profissional.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
