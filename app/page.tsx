import { db } from "@/lib/db";
import { products } from "@/lib/db/schema";
import { Hero } from "@/components/ui/hero";
import { ProductCard } from "@/components/ui/product-card";
import { desc } from "drizzle-orm";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const allProducts = await db.select().from(products).orderBy(desc(products.name));

  return (
    <main className="min-h-screen bg-gray-50 text-slate-900">
      <Hero />

      <section id="catalogo" className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Nossa Frota
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Equipamentos de alta performance revisados e prontos para operação.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {allProducts.length > 0 ? (
              allProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  category={product.category}
                  description={product.shortDescription || ''}
                  imageUrl={product.imageUrl || undefined}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="rounded-lg border-2 border-dashed border-gray-300 p-12 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  <span className="mt-2 block text-sm font-semibold text-gray-900">Nenhum equipamento cadastrado ainda.</span>
                  <p className="mt-2 text-sm text-gray-500">Acesse o painel administrativo para adicionar produtos.</p>
                </div>
              </div>
            )}
          </div>
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
