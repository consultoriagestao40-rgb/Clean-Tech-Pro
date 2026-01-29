
import { db } from "@/lib/db";
import { products, categories } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { ProductCatalog } from "@/components/product-catalog";
import { Hero } from "@/components/ui/hero";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // Fetch Category
    const category = await db.query.categories.findFirst({
        where: eq(categories.slug, slug)
    });

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

    return (
        <main className="min-h-screen bg-gray-50 text-slate-900">
            {/* Reuse Hero or simpler header? User wants "sub pagina". Let's use a simpler header. */}
            <div className="bg-slate-900 py-16">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{category.name}</h1>
                </div>
            </div>

            <section className="py-12">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    {categoryProducts.length > 0 ? (
                        <ProductCatalog products={categoryProducts} />
                    ) : (
                        <div className="text-center py-24 text-gray-500">
                            Nenhum equipamento encontrado nesta categoria.
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
