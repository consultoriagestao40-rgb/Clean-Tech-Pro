
import Link from 'next/link';
import { Wrench, Settings, ShoppingCart, ArrowRight } from 'lucide-react';

export function SolutionsSection() {
    return (
        <section className="bg-slate-50 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 inset-x-0 h-64 bg-slate-900 -z-10" />

            <div className="py-16 sm:py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">

                    {/* Header / CTA Combined */}
                    <div className="relative rounded-3xl bg-blue-600 px-6 py-16 shadow-2xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 mb-24 overflow-hidden">
                        <div className="absolute -top-[100px] -left-[100px] w-[300px] h-[300px] bg-blue-500 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
                        <div className="absolute bottom-[0px] right-[0px] w-[300px] h-[300px] bg-indigo-500 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>

                        <div className="relative mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-8 lg:text-left">
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl text-shadow-sm">
                                Peças e manutenção <br />para sua frota
                            </h2>
                            <p className="mt-6 text-lg leading-8 text-blue-100">
                                Precisa de uma peça específica ou manutenção urgente? Garantimos a solução ideal para manter sua operação rodando.
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                                <a
                                    href="https://wa.me/5541992938103?text=Ol%C3%A1%2C%20gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20pe%C3%A7as%20e%20equipamentos."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-blue-600 shadow-sm hover:bg-blue-50 hover:scale-105 transition-all duration-300"
                                >
                                    Falar com um Especialista
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Features Grid - Cards */}
                    <div className="mx-auto max-w-2xl lg:max-w-none">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                                Tudo o que você precisa em um só lugar
                            </h2>
                            <p className="mt-4 text-lg text-slate-600">
                                Simplifique sua gestão de limpeza com nossos serviços integrados.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                            {/* Card 1 */}
                            <div className="group relative flex flex-col items-start bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:-translate-y-2">
                                <div className="mb-6 inline-flex p-4 rounded-2xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                    <Settings size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">
                                    Planos de Locação
                                </h3>
                                <p className="text-slate-600 leading-relaxed mb-8 flex-auto">
                                    Flexibilidade para sua empresa. Alugue equipamentos de ponta com planos que cabem no seu orçamento e inclua manutenção preventiva.
                                </p>
                                <Link href="/#catalogo" className="flex items-center gap-2 text-sm font-bold text-blue-600 group-hover:gap-3 transition-all">
                                    Ver Catálogo <ArrowRight size={16} />
                                </Link>
                            </div>

                            {/* Card 2 */}
                            <div className="group relative flex flex-col items-start bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:-translate-y-2">
                                <div className="mb-6 inline-flex p-4 rounded-2xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                                    <Wrench size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">
                                    Assistência Técnica
                                </h3>
                                <p className="text-slate-600 leading-relaxed mb-8 flex-auto">
                                    Seu equipamento parou? Nossa equipe especializada resolve. Atendimento ágil para minimizar o tempo de inatividade da sua operação.
                                </p>
                                <a href="https://wa.me/5541992938103?text=Ol%C3%A1%2C%20preciso%20de%20assist%C3%AAncia%20t%C3%A9cnica." target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-bold text-indigo-600 group-hover:gap-3 transition-all">
                                    Solicitar Reparo <ArrowRight size={16} />
                                </a>
                            </div>

                            {/* Card 3 */}
                            <div className="group relative flex flex-col items-start bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:-translate-y-2">
                                <div className="mb-6 inline-flex p-4 rounded-2xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                                    <ShoppingCart size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">
                                    Venda de Peças
                                </h3>
                                <p className="text-slate-600 leading-relaxed mb-8 flex-auto">
                                    Reposição rápida de peças originais e consumíveis para diversas marcas. Garanta a durabilidade e eficiência da sua máquina.
                                </p>
                                <a href="https://wa.me/5541992938103?text=Ol%C3%A1%2C%20gostaria%20de%20cotar%20pe%C3%A7as." target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-bold text-emerald-600 group-hover:gap-3 transition-all">
                                    Cotar Peças <ArrowRight size={16} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
