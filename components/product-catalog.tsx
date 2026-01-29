'use client';

import { useState } from 'react';
import { ProductCard } from "@/components/ui/product-card";
import { ProductModal } from "@/components/product-modal";
import type { products, rentalPlans, servicePlans } from '@/lib/db/schema';

type Product = typeof products.$inferSelect;
type RentalPlan = typeof rentalPlans.$inferSelect;
type ServicePlan = typeof servicePlans.$inferSelect;

interface ProductWithPlans extends Product {
    rentalPlans: RentalPlan[];
}

interface ProductCatalogProps {
    products: ProductWithPlans[];
    servicePlans?: ServicePlan[];
}

export function ProductCatalog({ products, servicePlans = [] }: ProductCatalogProps) {
    const [selectedProduct, setSelectedProduct] = useState<ProductWithPlans | null>(null);

    return (
        <>
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {products.filter(p => p.active !== false).length > 0 ? (
                    products.filter(p => p.active !== false).map((product) => (
                        <div key={product.id} onClick={() => setSelectedProduct(product)} className="cursor-pointer">
                            <ProductCard
                                id={product.id}
                                name={product.name}
                                category={product.category}
                                description={product.shortDescription || ''}
                                imageUrl={product.imageUrl || undefined}
                            />
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-12">
                        <div className="rounded-lg border-2 border-dashed border-gray-300 p-12">
                            <span className="mt-2 block text-sm font-semibold text-gray-900">Nenhum equipamento cadastrado ainda.</span>
                            <p className="mt-2 text-sm text-gray-500">Acesse o painel administrativo para adicionar produtos.</p>
                        </div>
                    </div>
                )}
            </div>

            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    servicePlans={servicePlans}
                    isOpen={!!selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            )}
        </>
    );
}
