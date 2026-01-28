'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, MessageCircle } from 'lucide-react';
import type { products, rentalPlans } from '@/lib/db/schema';

// Types derived from schema
type Product = typeof products.$inferSelect;
type RentalPlan = typeof rentalPlans.$inferSelect;

interface ProductWithPlans extends Product {
    rentalPlans: RentalPlan[];
}

interface ProductModalProps {
    product: ProductWithPlans;
    isOpen: boolean;
    onClose: () => void;
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
    if (!isOpen) return null;

    // Sort plans by months (12 -> 60)
    const sortedPlans = [...product.rentalPlans].sort((a, b) => a.months - b.months);

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">

                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />

                {/* Modal Content */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col md:flex-row"
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-10 p-2 bg-white/80 rounded-full hover:bg-white text-gray-500 hover:text-gray-900 transition-colors"
                    >
                        <X size={20} />
                    </button>

                    {/* Left: Image (40%) */}
                    <div className="w-full md:w-2/5 bg-gray-100 flex items-center justify-center p-6 border-r border-gray-100">
                        {product.imageUrl ? (
                            <img src={product.imageUrl} alt={product.name} className="max-h-64 md:max-h-full object-contain" />
                        ) : (
                            <div className="text-gray-400">Sem imagem</div>
                        )}
                    </div>

                    {/* Right: Info (60%) */}
                    <div className="w-full md:w-3/5 p-8 flex flex-col overflow-y-auto">
                        <div className="mb-6">
                            <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full mb-2">
                                {product.category}
                            </span>
                            <h2 className="text-3xl font-bold text-gray-900">{product.name}</h2>
                            <p className="mt-4 text-gray-600 leading-relaxed">
                                {product.fullDescription || product.shortDescription}
                            </p>
                        </div>

                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Escolha seu Plano de Locação</h3>
                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                                {sortedPlans.map((plan) => (
                                    <div key={plan.id} className="relative border border-gray-200 rounded-lg p-3 hover:border-orange-500 hover:shadow-md transition-all group cursor-default">
                                        <div className="text-center">
                                            <span className="block text-sm font-medium text-gray-500 mb-1">{plan.months} Meses</span>
                                            <span className="block text-xl font-bold text-gray-900">
                                                R$ {parseFloat(plan.monthlyPrice).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                            </span>
                                            <span className="block text-xs text-gray-400 mt-1">/mês</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {sortedPlans.length === 0 && (
                                <p className="text-sm text-gray-500 italic">Preços sob consulta.</p>
                            )}
                        </div>

                        <div className="mt-8 border-t pt-6">
                            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                                <div className="text-sm text-gray-500 flex items-center gap-2">
                                    <div className="bg-green-100 p-1 rounded-full text-green-700"><Check size={12} /></div>
                                    Manutenção Inclusa
                                </div>
                                <a
                                    href={`https://wa.me/5541999999999?text=Olá, tenho interesse na máquina ${product.name}.`}
                                    target="_blank"
                                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-500 shadow-lg shadow-green-600/20 transition-all transform hover:-translate-y-0.5"
                                >
                                    <MessageCircle size={20} />
                                    Solicitar Proposta
                                </a>
                            </div>
                        </div>
                    </div>

                </motion.div>
            </div>
        </AnimatePresence>
    );
}
