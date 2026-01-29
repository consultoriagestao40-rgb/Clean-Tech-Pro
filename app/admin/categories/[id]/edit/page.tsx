
import { updateCategory } from "@/app/actions/category-actions";
import { db } from "@/lib/db";
import { categories } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const category = await db.query.categories.findFirst({
        where: eq(categories.id, id),
    });

    if (!category) {
        notFound();
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Editar Categoria</h1>
                <p className="text-gray-500">Atualize as informações da categoria.</p>
            </div>

            <form action={updateCategory} className="space-y-6 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <input type="hidden" name="id" value={category.id} />

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nome da Categoria</label>
                        <input
                            type="text"
                            name="name"
                            defaultValue={category.name}
                            required
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">URL da Imagem de Capa</label>
                        <input
                            type="url"
                            name="imageUrl"
                            defaultValue={category.imageUrl || ''}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div className="pt-4 flex justify-end gap-3">
                    <a href="/admin/categories" className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium">
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
