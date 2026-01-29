'use client';

import { useState } from 'react';

export function FounderImage() {
    const [error, setError] = useState(false);

    if (error) {
        return (
            <div className="w-full h-full flex items-center justify-center text-gray-400 font-medium">
                Foto do Fundador (Adicione aqui)
            </div>
        );
    }

    return (
        <img
            src="https://cleantechpro.com.br/wp-content/uploads/2024/08/jose-vanderlei.jpg"
            alt="Jose Vanderlei Santos"
            className="w-full h-full object-cover"
            onError={() => setError(true)}
        />
    );
}
