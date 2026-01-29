
import Link from 'next/link';
import { Wrench, Settings, ShoppingCart } from 'lucide-react';

export function SolutionsSection() {
    return (
        <section className="bg-white">
            {/* CTA Banner */}
            <div className="bg-slate-600 py-12 sm:py-16">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
                    <div className="max-w-3xl text-white">
                        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-3">
                            Encontre as peças ideais para os seus equipamentos de limpeza.
                        </h2>
                        <p className="text-lg text-gray-200 leading-relaxed">
                            Quaisquer que sejam as suas necessidades de limpeza, a Clean Tech Pro oferece as soluções ideais em locação e manutenção para tornar sua operação mais eficiente.
                        </p>
                    </div>
                    <div className="flex-shrink-0">
                        <a
                            href="https://wa.me/5541992938103?text=Ol%C3%A1%2C%20gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20pe%C3%A7as%20e%20equipamentos."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center rounded-lg border-2 border-white px-8 py-3 text-base font-bold text-white transition-all hover:bg-white hover:text-slate-600"
                        >
                            Solicitar Informações
                        </a>
                    </div>
                </div>
            </div>

            {/* Solutions Content */}
            <div className="py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-4xl text-center mb-20">
                        <h2 className="text-3xl font-bold tracking-tight text-blue-500 sm:text-4xl mb-6">
                            Soluções completas para manter seus equipamentos sempre prontos
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Na <strong>Clean Tech Pro</strong>, o suporte vai muito além da locação. Oferecemos <strong>assistência técnica especializada</strong>, planos de manutenção e uma linha completa de <strong>peças e consumíveis</strong> para garantir que seus equipamentos funcionem sempre com máxima performance.
                        </p>
                        <p className="mt-4 text-gray-500">
                            Conte com a gente para manter sua operação rodando com segurança, eficiência e agilidade — tudo em um só lugar, sem complicações.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        {/* Column 1 */}
                        <div className="flex flex-col items-center group">
                            <h3 className="text-sm font-bold tracking-widest text-blue-400 uppercase mb-8 group-hover:text-blue-600 transition-colors">PLANOS E LOCAÇÃO</h3>
                            <div className="mb-8 p-5 bg-blue-50 rounded-full text-blue-600 group-hover:scale-110 transition-transform duration-300">
                                <Settings size={40} strokeWidth={1.5} />
                            </div>
                            <Link href="/#catalogo" className="min-w-[160px] rounded-full px-6 py-2.5 text-sm font-bold text-slate-800 ring-2 ring-inset ring-slate-800/20 hover:bg-slate-800 hover:text-white hover:ring-slate-800 transition-all">
                                Saiba Mais
                            </Link>
                        </div>

                        {/* Column 2 */}
                        <div className="flex flex-col items-center group">
                            <h3 className="text-sm font-bold tracking-widest text-blue-400 uppercase mb-8 group-hover:text-blue-600 transition-colors">ASSISTÊNCIA TÉCNICA</h3>
                            <div className="mb-8 p-5 bg-blue-50 rounded-full text-blue-600 group-hover:scale-110 transition-transform duration-300">
                                <Wrench size={40} strokeWidth={1.5} />
                            </div>
                            <a href="https://wa.me/5541992938103?text=Ol%C3%A1%2C%20preciso%20de%20assist%C3%AAncia%20t%C3%A9cnica." target="_blank" rel="noopener noreferrer" className="min-w-[160px] rounded-full px-6 py-2.5 text-sm font-bold text-slate-800 ring-2 ring-inset ring-slate-800/20 hover:bg-slate-800 hover:text-white hover:ring-slate-800 transition-all">
                                Saiba Mais
                            </a>
                        </div>

                        {/* Column 3 */}
                        <div className="flex flex-col items-center group">
                            <h3 className="text-sm font-bold tracking-widest text-blue-400 uppercase mb-8 group-hover:text-blue-600 transition-colors">COMPRA DE PEÇAS</h3>
                            <div className="mb-8 p-5 bg-blue-50 rounded-full text-blue-600 group-hover:scale-110 transition-transform duration-300">
                                <ShoppingCart size={40} strokeWidth={1.5} />
                            </div>
                            <a href="https://wa.me/5541992938103?text=Ol%C3%A1%2C%20gostaria%20de%20cotar%20pe%C3%A7as." target="_blank" rel="noopener noreferrer" className="min-w-[160px] rounded-full px-6 py-2.5 text-sm font-bold text-slate-800 ring-2 ring-inset ring-slate-800/20 hover:bg-slate-800 hover:text-white hover:ring-slate-800 transition-all">
                                Saiba Mais
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
