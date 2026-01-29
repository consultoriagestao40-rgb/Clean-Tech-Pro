import Link from 'next/link';
import { Plus, Trash2 } from 'lucide-react';
import { db } from "@/lib/db";
import { products } from "@/lib/db/schema";
import { deleteProduct, toggleProductStatus } from "@/app/actions/product-actions";
import { desc } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

export default async function AdminProductsPage() {
    const allProducts = await db.select().from(products).orderBy(desc(products.name));

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Produtos</h1>
                <Link href="/admin/products/create" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2">
                    <Plus size={18} /> Novo Produto
                </Link>
            </div>

            <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {allProducts.map((product) => (
                            <tr key={product.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                        {product.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <form action={toggleProductStatus}>
                                        <input type="hidden" name="id" value={product.id} />
                                        <input type="hidden" name="currentStatus" value={String(product.active)} />
                                        <button type="submit" className={`flex items-center gap-1 font-medium ${product.active ? 'text-green-600 hover:text-green-800' : 'text-gray-400 hover:text-gray-600'}`}>
                                            {product.active ? 'Ativo' : 'Inativo'}
                                        </button>
                                    </form>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex justify-end gap-3 items-center">
                                    <Link href={`/admin/products/${product.id}/edit`} className="text-indigo-600 hover:text-indigo-900" title="Editar">
                                        <Trash2 size={1} className="hidden" /> {/* Hack to keep layout valid if icons fail */}
                                        Editar
                                    </Link>
                                    <form action={deleteProduct}>
                                        <input type="hidden" name="id" value={product.id} />
                                        <button type="submit" className="text-red-600 hover:text-red-900" title="Excluir">
                                            Excluir
                                        </button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {allProducts.length === 0 && (
                    <div className="p-6 text-center text-gray-500">Nenhum produto cadastrado.</div>
                )}
            </div>
        </div>
    );
}
