
import { updateServicePlan } from "@/app/actions/service-plan-actions";
import { db } from "@/lib/db";
import { servicePlans, categories } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function EditServicePlanPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    // Fetch Plan
    const plan = await db.query.servicePlans.findFirst({
        where: eq(servicePlans.id, id)
    });

    if (!plan) {
        notFound();
    }

    // Fetch all categories
    const allCategories = await db.select().from(categories);

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Editar Plano de Serviço</h1>
                <p className="text-gray-500">Atualize as informações deste nível de serviço.</p>
            </div>

            <form action={updateServicePlan} className="space-y-6 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <input type="hidden" name="id" value={plan.id} />

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nome do Plano</label>
                        <input type="text" name="name" defaultValue={plan.name} required className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Ex: Ouro" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Categoria</label>
                        <select name="categoryId" defaultValue={plan.categoryId} required className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                            <option value="">Selecione uma categoria...</option>
                            {allCategories.map((cat) => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Descrição / Itens Inclusos</label>
                        <textarea name="description" defaultValue={plan.description} required rows={3} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Ordem de Exibição</label>
                            <input type="number" name="order" defaultValue={plan.order} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                        </div>
                        <div className="flex items-center pt-6">
                            <input id="isPopular" type="checkbox" name="isPopular" defaultChecked={plan.isPopular} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                            <label htmlFor="isPopular" className="ml-2 block text-sm text-gray-900">
                                Destacar como "Mais Popular"
                            </label>
                        </div>
                    </div>
                </div>

                <div className="pt-4 flex justify-end">
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-medium">
                        Salvar Alterações
                    </button>
                </div>
            </form>
        </div>
    );
}
