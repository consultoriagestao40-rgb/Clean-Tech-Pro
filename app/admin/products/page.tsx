import Link from 'next/link';
import { db } from "@/lib/db";
import { products } from "@/lib/db/schema";
import { Plus } from 'lucide-react';
import { desc } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

export default async function AdminProductsPage() {
    const allProducts = await db.select().from(products).orderBy(desc(products.name));

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Produtos</h1>
                <Link href="/admin/products/new" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2">
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
                                    {product.active ? 'Ativo' : 'Inativo'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <Link href={`/admin/products/${product.id}/edit`} className="text-indigo-600 hover:text-indigo-900">Editar</Link>
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
