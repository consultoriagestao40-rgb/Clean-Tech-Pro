
import Link from 'next/link';

interface Category {
    id: string;
    name: string;
    slug: string;
    imageUrl: string | null;
}

export function CategoryGrid({ categories }: { categories: Category[] }) {
    return (
        <div className="py-12 bg-gray-50">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center mb-16">
                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl mb-6 leading-tight">
                        Soluções em <span className="text-blue-600">locação de equipamentos</span>, assistência técnica especializada e suporte completo para o seu negócio.
                    </h2>
                    <p className="text-lg leading-8 text-gray-600">
                        Quaisquer que sejam as suas necessidades de limpeza, a <span className="font-semibold text-slate-900">Clean Tech Pro</span> oferece as soluções ideais em <strong>locação de equipamentos profissionais</strong> para tornar sua operação mais eficiente.
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {categories.map((category) => (
                        <Link key={category.id} href={`/categoria/${category.slug}`} className="group relative block overflow-hidden rounded-lg bg-white shadow-md hover:shadow-xl transition-all duration-300">
                            <div className="aspect-h-2 aspect-w-3 overflow-hidden bg-white">
                                {category.imageUrl ? (
                                    <img
                                        src={category.imageUrl}
                                        alt={category.name}
                                        className="h-48 w-full object-contain object-center p-2 group-hover:scale-105 transition-transform duration-300"
                                    />
                                ) : (
                                    <div className="h-48 w-full flex items-center justify-center bg-gray-100 text-gray-400">
                                        Sem imagem
                                    </div>
                                )}
                            </div>
                            <div className="p-6 text-center">
                                <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600">
                                    {category.name}
                                </h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
