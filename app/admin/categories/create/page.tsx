
import { createCategory } from "@/app/actions/category-actions";

export default function NewCategoryPage() {
    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Nova Categoria</h1>
                <p className="text-gray-500">Cadastre uma nova categoria de equipamentos.</p>
            </div>

            <form action={createCategory} className="space-y-6 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nome da Categoria</label>
                        <input type="text" name="name" required className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Ex: Lavadoras de Piso" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">URL da Imagem de Capa</label>
                        <input type="url" name="imageUrl" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="https://..." />
                    </div>
                </div>

                <div className="pt-4 flex justify-end">
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-medium">
                        Salvar Categoria
                    </button>
                </div>
            </form>
        </div>
    );
}
