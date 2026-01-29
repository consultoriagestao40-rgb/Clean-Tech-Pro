import { updateProduct } from "@/app/actions/product-actions";
import { db } from "@/lib/db";
import { products, rentalPlans } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const product = await db.query.products.findFirst({
        where: eq(products.id, id),
        with: { rentalPlans: true }
    });

    if (!product) {
        notFound();
    }

    // Transform plans into a map for easier access
    const planMap: Record<number, string> = {};
    product.rentalPlans.forEach(plan => {
        planMap[plan.months] = plan.monthlyPrice;
    });

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Editar Produto</h1>
                <p className="text-gray-500">Atualize as informações do equipamento.</p>
            </div>

            <form action={updateProduct} className="space-y-6 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <input type="hidden" name="id" value={product.id} />

                {/* Basic Info */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nome do Equipamento</label>
                        <input
                            type="text"
                            name="name"
                            defaultValue={product.name}
                            required
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Categoria</label>
                        <select
                            name="category"
                            defaultValue={product.category}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                            <option value="Lavadoras de Piso">Lavadoras de Piso</option>
                            <option value="Varredeiras">Varredeiras</option>
                            <option value="Polidoras">Polidoras</option>
                            <option value="Outros">Outros</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">URL da Imagem</label>
                        <input
                            type="url"
                            name="imageUrl"
                            defaultValue={product.imageUrl || ''}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* Descriptions */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Descrição Curta (Card)</label>
                        <input
                            type="text"
                            name="shortDescription"
                            defaultValue={product.shortDescription || ''}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            maxLength={100}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Descrição Completa</label>
                        <textarea
                            name="fullDescription"
                            defaultValue={product.fullDescription || ''}
                            rows={4}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
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
                                    defaultValue={planMap[months] || ''}
                                    step="0.01"
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    placeholder="0,00"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="pt-4 flex justify-end gap-3">
                    <a href="/admin/products" className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium">
                        Cancelar
                    </a>
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-medium">
                        Salvar Alterações
                    </button>
                </div>

            </form>
        </div>
    );
}
