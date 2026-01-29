import { createProduct } from "@/app/actions/product-actions";
import { db } from "@/lib/db";
import { categories } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export default async function NewProductPage() {
    const activeCategories = await db.query.categories.findMany({
        where: eq(categories.active, true)
    });

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Novo Produto</h1>
                <p className="text-gray-500">Cadastre uma nova máquina no catálogo.</p>
            </div>

            <form action={createProduct} className="space-y-6 bg-white p-6 rounded-lg shadow-sm border border-gray-100">

                {/* Basic Info */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nome do Equipamento</label>
                        <input type="text" name="name" required className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Ex: Lavadora T7" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Categoria</label>
                        <select name="categoryId" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                            <option value="">Selecione uma categoria...</option>
                            {activeCategories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">URL da Imagem</label>
                        <input type="url" name="imageUrl" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="https://..." />
                        <p className="text-xs text-gray-500 mt-1">Por enquanto, cole o link de uma imagem hospedada.</p>
                    </div>
                </div>

                {/* Descriptions */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Descrição Curta (Card)</label>
                        <input type="text" name="shortDescription" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" maxLength={100} />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Descrição Completa</label>
                        <textarea name="fullDescription" rows={4} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                    </div>
                </div>

                {/* Pricing Plans */}
                <div className="border-t pt-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Planos de Locação (Mensal)</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {[12, 24, 36, 48, 60].map((months) => (
                            <div key={months}>
                                <label className="block text-sm font-medium text-gray-700">{months} Meses (R$)</label>
                                <input
                                    type="number"
                                    name={`plan_${months}`}
                                    step="0.01"
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    placeholder="0,00"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="pt-4 flex justify-end">
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-medium">
                        Salvar Produto
                    </button>
                </div>

            </form>
        </div>
    );
}
