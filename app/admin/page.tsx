export default function AdminDashboard() {
    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Visão Geral</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-sm font-medium text-gray-500">Total de Máquinas</h3>
                    <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-sm font-medium text-gray-500">Produtos Ativos</h3>
                    <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
                </div>
            </div>
        </div>
    );
}
