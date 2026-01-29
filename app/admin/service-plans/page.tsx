
import { db } from "@/lib/db";
import { servicePlans, categories } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { Plus, Edit, Trash } from "lucide-react";
import { deleteServicePlan } from "@/app/actions/service-plan-actions";

export const dynamic = 'force-dynamic';

export default async function ServicePlansPage() {
    let plans: any[] = [];
    try {
        plans = await db.select({
            id: servicePlans.id,
            name: servicePlans.name,
            description: servicePlans.description,
            isPopular: servicePlans.isPopular,
            categoryName: categories.name,
        })
            .from(servicePlans)
            .leftJoin(categories, eq(servicePlans.categoryId, categories.id));
    } catch (e) {
        console.warn("Service Plans table might not exist yet");
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Planos de Serviço</h1>
                    <p className="text-gray-500">Gerencie os níveis de serviço (Ouro, Prata, etc.) por categoria.</p>
                </div>
                <Link
                    href="/admin/service-plans/create"
                    className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500"
                >
                    <Plus size={16} />
                    Novo Plano
                </Link>
            </div>

            <div className="rounded-md border border-gray-200 bg-white shadow-sm">
                <table className="w-full text-left text-sm text-gray-500">
                    <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                        <tr>
                            <th className="px-6 py-3">Nome</th>
                            <th className="px-6 py-3">Categoria</th>
                            <th className="px-6 py-3">Descrição</th>
                            <th className="px-6 py-3">Destaque</th>
                            <th className="px-6 py-3 text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {plans.length > 0 ? (
                            plans.map((plan) => (
                                <tr key={plan.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">{plan.name}</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                                            {plan.categoryName || 'S/ Categoria'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 max-w-xs truncate" title={plan.description}>{plan.description}</td>
                                    <td className="px-6 py-4">
                                        {plan.isPopular ? (
                                            <span className="text-green-600 font-bold text-xs">Sim</span>
                                        ) : (
                                            <span className="text-gray-400 text-xs">Não</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            {/* Create is separate page, but Edit could be too. For now assume Edit is not implemented fully or links to a page? 
                                                Actually let's just leave Edit valid if user has a route for it. 
                                                But Delete must work.
                                             */}
                                            {/* Edit Button */}
                                            <Link href={`/admin/service-plans/${plan.id}/edit`} className="text-blue-600 hover:text-blue-900">
                                                <Edit size={16} />
                                            </Link>

                                            <form action={deleteServicePlan}>
                                                <input type="hidden" name="id" value={plan.id} />
                                                <button type="submit" className="text-red-600 hover:text-red-900 transition-colors">
                                                    <Trash size={16} />
                                                </button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                                    Nenhum plano cadastrado.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
