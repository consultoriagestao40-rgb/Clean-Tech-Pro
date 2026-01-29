'use client';

import { useState } from 'react';

export function FounderImage({ initialUrl }: { initialUrl?: string | null }) {
    const [error, setError] = useState(false);

    // Use initialUrl or default fallback
    const src = initialUrl || "https://cleantechpro.com.br/wp-content/uploads/2025/03/Design-sem-nome-47-819x1024.png";

    if (error) {
        return (
            <div className="w-full h-full flex items-center justify-center text-gray-400 font-medium bg-gray-100">
                Foto do Fundador (Adicione no Admin)
            </div>
        );
    }

    return (
        <img
            src={src}
            alt="Jose Vanderlei Santos"
            className="w-full h-full object-cover"
            onError={() => setError(true)}
        />
    );
}
