
import { updateSetting, getSetting } from "@/app/actions/settings-actions";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
    const aboutImageUrl = await getSetting('about_image_url') || '';

    async function saveSettings(formData: FormData) {
        'use server';
        const url = formData.get('about_image_url') as string;
        await updateSetting('about_image_url', url);
    }

    return (
        <div className="max-w-2xl mx-auto">
            <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors">
                <ArrowLeft size={16} />
                Voltar para Dashboard
            </Link>

            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Configurações do Site</h1>
                <p className="text-gray-500">Gerencie informações globais do site.</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <form action={saveSettings} className="space-y-6">
                    <div>
                        <h2 className="text-lg font-medium text-gray-900 mb-4">Página Sobre</h2>
                        <label htmlFor="about_image_url" className="block text-sm font-medium text-gray-700">
                            URL da Imagem do Fundador
                        </label>
                        <div className="mt-1">
                            <input
                                type="url"
                                name="about_image_url"
                                id="about_image_url"
                                defaultValue={aboutImageUrl}
                                placeholder="https://exemplo.com/imagem.jpg"
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                            />
                        </div>
                        <p className="mt-2 text-sm text-gray-500">
                            Cole o link direto da imagem que deve aparecer na página "Sobre".
                        </p>
                    </div>

                    <div className="pt-4 border-t border-gray-200 flex justify-end">
                        <button
                            type="submit"
                            className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        >
                            <Save size={16} />
                            Salvar Alterações
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
