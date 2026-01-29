import { db } from "@/lib/db";
import { products, categories } from "@/lib/db/schema";
import { Hero } from "@/components/ui/hero";
import { ProductCatalog } from "@/components/product-catalog";
import { CategoryGrid } from "@/components/category-grid";
import { desc, eq } from "drizzle-orm";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  // Fetch active categories
  const activeCategories = await db.query.categories.findMany({
    where: eq(categories.active, true),
    orderBy: [desc(categories.name)],
  });

  // Fetch products with their plans (active only)
  const allProducts = await db.query.products.findMany({
    where: eq(products.active, true),
    with: {
      rentalPlans: true
    },
    orderBy: [desc(products.name)],
  });

  return (
    <main className="min-h-screen bg-gray-50 text-slate-900">
      <Hero />

      <section id="catalogo" className="py-16 sm:py-24">
        {/* Category Grid */}
        <CategoryGrid categories={activeCategories} />

        <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Nossa Frota
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Equipamentos de alta performance revisados e prontos para operação.
            </p>
          </div>

          {/* Interactive Catalog */}
          <ProductCatalog products={allProducts} />

        </div>
      </section>

      <section id="contato" className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Fale com um Especialista</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Não sabe qual máquina é ideal para sua operação? Nossa equipe técnica analisa sua necessidade.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <a href="https://wa.me/5541999999999" target="_blank" className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
                Chamar no WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 py-12 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 flex justify-between items-center">
          <p className="text-sm text-gray-400">© 2026 Clean Tech Pro. Todos os direitos reservados.</p>
          <a href="/admin" className="text-xs text-slate-700 hover:text-slate-500">Admin</a>
        </div>
      </footer>
    </main>
  );
}
