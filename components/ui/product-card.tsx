import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

interface ProductCardProps {
    name: string;
    category: string;
    id: string;
    imageUrl?: string;
    description: string;
}

export function ProductCard({ name, category, imageUrl, description }: ProductCardProps) {
    return (
        <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
            <div className="aspect-[4/3] bg-white relative overflow-hidden">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={name}
                        className="h-full w-full object-contain object-center p-4 transition-transform duration-300 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-gray-400">
                        Sem imagem
                    </div>
                )}
                <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/5" />
            </div>
            <div className="flex flex-1 flex-col p-4">
                <h3 className="text-sm font-medium text-orange-600">{category}</h3>
                <h2 className="mt-2 text-lg font-bold text-gray-900">{name}</h2>
                <p className="mt-2 text-sm text-gray-500 line-clamp-2">{description}</p>
                <div className="mt-4 flex items-center gap-1 text-sm font-medium text-blue-900 group-hover:text-blue-700">
                    Ver detalhes <ArrowUpRight size={16} />
                </div>
            </div>
        </div>
    );
}
