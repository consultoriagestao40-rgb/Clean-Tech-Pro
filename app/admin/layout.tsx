import Link from 'next/link';
import { Package, LayoutDashboard, Settings, LogOut } from 'lucide-react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-blue-900">CTP Admin</h2>
                </div>
                <nav className="flex-1 p-4 space-y-1">
                    <Link href="/admin" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-700 group">
                        <LayoutDashboard size={20} />
                        <span className="font-medium">Dashboard</span>
                    </Link>
                    <Link href="/admin/products" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-700 group">
                        <Package size={20} />
                        <span className="font-medium">Produtos</span>
                    </Link>
                    <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-700 group">
                        <Settings size={20} />
                        <span className="font-medium">Configurações</span>
                    </Link>
                </nav>
                <div className="p-4 border-t border-gray-100">
                    <button className="flex items-center gap-3 px-3 py-2 w-full text-gray-700 rounded-md hover:bg-red-50 hover:text-red-700">
                        <LogOut size={20} />
                        <span className="font-medium">Sair</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                {children}
            </main>
        </div>
    );
}
