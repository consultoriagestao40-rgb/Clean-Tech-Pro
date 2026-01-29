import { db } from "@/lib/db";
import { products, servicePlans } from "@/lib/db/schema";
import { sql } from "drizzle-orm";
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    // Fetch counts safely
    let productCount = 0;
    let servicePlanCount = 0;

    try {
        const pCount = await db.execute(sql`SELECT count(*) from "products"`);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        productCount = Number((pCount as any).rows?.[0]?.count || (pCount as any)[0]?.count || 0);

        const sCount = await db.execute(sql`SELECT count(*) from "service_plans"`);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        servicePlanCount = Number((sCount as any).rows?.[0]?.count || (sCount as any)[0]?.count || 0);
    } catch (e) {
        console.warn("Could not fetch dashboard stats", e);
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Visão Geral</h1>

            {servicePlanCount === 0 && (
                <div className="mb-8 bg-yellow-50 border-l-4 border-yellow-400 p-4">
                    <div className="flex">
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-yellow-800">Atenção: Planos de Serviço não detectados</h3>
                            <div className="mt-2 text-sm text-yellow-700">
                                <p>Parece que o banco de dados ainda não foi atualizado. Para que os planos (Ouro, Prata) apareçam no site, você precisa rodar a migração.</p>
                            </div>
                            <div className="mt-4">
                                <div className="-mx-2 -my-1.5 flex">
                                    <a href="/api/setup-db" target="_blank" className="bg-yellow-100 px-3 py-2 rounded-md text-sm font-medium text-yellow-800 hover:bg-yellow-200">
                                        Rodar Migração Agora &rarr;
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-sm font-medium text-gray-500">Total de Máquinas</h3>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{productCount}</p>
                    <Link href="/admin/products" className="text-sm text-blue-600 hover:text-blue-800 mt-2 inline-block">Ver todos</Link>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-sm font-medium text-gray-500">Planos de Serviço</h3>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{servicePlanCount}</p>
                    <Link href="/admin/service-plans" className="text-sm text-blue-600 hover:text-blue-800 mt-2 inline-block">Gerenciar</Link>
                </div>
            </div>
        </div>
    );
}
