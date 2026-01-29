
import Link from 'next/link';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-slate-900 py-12 text-white">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex gap-6">
                        <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
                            Home
                        </Link>
                        <Link href="/sobre" className="text-sm text-gray-400 hover:text-white transition-colors">
                            Sobre
                        </Link>
                        <Link href="/#catalogo" className="text-sm text-gray-400 hover:text-white transition-colors">
                            Catálogo
                        </Link>
                    </div>

                    <div className="flex gap-4">
                        <a href="https://www.instagram.com/cleantechpro_locacoes" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                            <Instagram size={20} />
                        </a>
                        <a href="https://web.facebook.com/profile.php?id=61563762812688" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                            <Facebook size={20} />
                        </a>
                        <a href="https://www.linkedin.com/company/clean-tech-pro/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                            <Linkedin size={20} />
                        </a>
                    </div>
                </div>

                <div className="mt-8 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-400">© 2026 Clean Tech Pro. Todos os direitos reservados.</p>
                    <div className="flex gap-4">
                        <a href="/admin" className="text-xs text-slate-700 hover:text-slate-500">Admin</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
