
import Link from 'next/link';
import { Plus, Trash2 } from 'lucide-react';
import { db } from "@/lib/db";
import { categories } from "@/lib/db/schema";
import { deleteCategory, toggleCategoryStatus } from "@/app/actions/category-actions";
import { desc } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

export default async function AdminCategoriesPage() {
    let allCategories = [];
    try {
        allCategories = await db.select().from(categories).orderBy(desc(categories.name));
    } catch (e) {
        console.warn("Could not fetch categories", e);
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Categorias</h1>
                <Link href="/admin/categories/create" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2">
                    <Plus size={18} /> Nova Categoria
                </Link>
            </div>

            <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Imagem</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {allCategories.map((category) => (
                            <tr key={category.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {category.imageUrl ? (
                                        <img src={category.imageUrl} alt={category.name} className="h-10 w-10 rounded-md object-cover" />
                                    ) : (
                                        <div className="h-10 w-10 rounded-md bg-gray-100 flex items-center justify-center text-xs text-gray-400">Sem foto</div>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{category.name}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {category.slug}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <form action={toggleCategoryStatus}>
                                        <input type="hidden" name="id" value={category.id} />
                                        <input type="hidden" name="currentStatus" value={String(category.active)} />
                                        <button type="submit" className={`flex items-center gap-1 font-medium ${category.active ? 'text-green-600 hover:text-green-800' : 'text-gray-400 hover:text-gray-600'}`}>
                                            {category.active ? 'Ativo' : 'Inativo'}
                                        </button>
                                    </form>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex justify-end gap-3 items-center">
                                    <Link href={`/admin/categories/${category.id}/edit`} className="text-indigo-600 hover:text-indigo-900">
                                        Editar
                                    </Link>
                                    <form action={deleteCategory}>
                                        <input type="hidden" name="id" value={category.id} />
                                        <button type="submit" className="text-red-600 hover:text-red-900" title="Excluir">
                                            <Trash2 size={18} />
                                        </button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {allCategories.length === 0 && (
                    <div className="p-6 text-center text-gray-500">Nenhuma categoria cadastrada.</div>
                )}
            </div>
        </div>
    );
}
