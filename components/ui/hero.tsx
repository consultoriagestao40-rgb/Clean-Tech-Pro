import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
    return (
        <div className="relative overflow-hidden bg-slate-900 py-24 sm:py-32">
            {/* Background gradient/image placeholder */}
            <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-900/10 to-slate-900" />

            <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-sans">
                        Tecnologia e Performance em Limpeza Profissional
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-300">
                        Locação de lavadoras e varredeiras de piso com a melhor relação custo-benefício do mercado. Planos flexíveis de 12 a 60 meses.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            href="#catalogo"
                            className="rounded-md bg-orange-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 transition-all flex items-center gap-2"
                        >
                            Ver Catálogo <ArrowRight size={16} />
                        </Link>
                        <Link href="#contato" className="text-sm font-semibold leading-6 text-white hover:text-orange-400 transition-colors">
                            Falar com Consultor <span aria-hidden="true">→</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
