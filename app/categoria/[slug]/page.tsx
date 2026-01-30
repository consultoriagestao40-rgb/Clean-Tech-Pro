
import { db } from "@/lib/db";
import { products, categories, servicePlans } from "@/lib/db/schema";
import { eq, asc } from "drizzle-orm";
import { notFound } from "next/navigation";
import { ProductCatalog } from "@/components/product-catalog";
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Footer } from "@/components/ui/footer";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // Fetch Category
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let category: any = null;
    try {
        category = await db.query.categories.findFirst({
            where: eq(categories.slug, slug)
        });
    } catch (e) {
        console.warn("DB not ready (category detail), returning 404");
    }

    if (!category) {
        notFound();
    }

    // Fetch Products in Category
    const categoryProducts = await db.query.products.findMany({
        where: (products, { eq, and }) => and(
            eq(products.categoryId, category.id),
            eq(products.active, true)
        ),
        with: {
            rentalPlans: true
        }
    });

    // Fetch Service Plans for this Category
    let plans: any[] = [];
    try {
        plans = await db.query.servicePlans.findMany({
            where: eq(servicePlans.categoryId, category.id),
            orderBy: [asc(servicePlans.order)]
        });
    } catch (e) {
        console.warn("Could not fetch service plans (migration might be missing):", e);
        // Fallback to empty plans to keep page working
    }

    return (
        <main className="min-h-screen bg-gray-50 text-slate-900 flex flex-col">
            {/* Enhanced Header with Background */}
            <div className="relative bg-slate-900 text-white overflow-hidden">
                {/* Abstract Background Pattern/Gradient */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-500 via-slate-900 to-slate-900"></div>
                    <div className="h-full w-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                </div>

                <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-20 sm:py-24 flex flex-col items-center text-center">
                    <Link href="/#catalogo" className="absolute left-6 top-6 sm:left-8 sm:top-8 text-gray-400 hover:text-white flex items-center gap-2 transition-colors z-10">
                        <ArrowLeft size={20} />
                        <span className="hidden sm:inline">Voltar ao Catálogo</span>
                    </Link>

                    <div className="max-w-3xl space-y-4">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 font-medium text-sm tracking-wide mb-2 backdrop-blur-sm">
                            Locação de Equipamentos Profissionais
                        </span>

                        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl mb-2">
                            {category.name}
                        </h1>

                        <p className="text-lg sm:text-xl text-gray-300 leading-relaxed font-light max-w-2xl mx-auto">
                            Soluções completas com <strong>Planos Personalizados</strong> e a <br className="hidden sm:block" />
                            <span className="text-green-400 font-medium">Melhor Assistência Técnica do Mercado</span>.
                        </p>
                    </div>
                </div>
            </div>

            <section className="py-12 flex-grow">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    {categoryProducts.length > 0 ? (
                        <ProductCatalog products={categoryProducts} servicePlans={plans} />
                    ) : (
                        <div className="text-center py-24 text-gray-500">
                            Nenhum equipamento encontrado nesta categoria.
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
