// src/components/TranslationForm.tsx
import React, { useEffect, useState } from 'react';
import { getTranslation } from '../services/phraseService'; // Ensure you have this function in your service

interface TranslationDetailProps {
    phraseId: string;
    onClose: () => void;
    resetForm: boolean;
}

const TranslationDetail: React.FC<TranslationDetailProps> = ({ phraseId, onClose, resetForm }) => {
    const [language, setLanguage] = useState('');
    const [translation, setTranslation] = useState<string | null>(null);
    const [error, setError] = useState('');

    useEffect(() => {
        console.log("resetForm", resetForm);
        if (resetForm) {
            setLanguage('');
            setTranslation(null);
        }
    }, [resetForm]);

    const handleGetTranslation = async () => {
        setError(''); // Clear previous errors
        try {
            const result = await getTranslation(phraseId, language);
            console.log("result", result);
            setTranslation(result);
        } catch (err) {
            setError(err.message || 'Error fetching translation');
        }
    };

    return (
        <div>
            <h2>Get Translation for Phrase ID: {phraseId}</h2>
            <input
                type="text"
                placeholder="Language (e.g., fr, es)"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
            />
            <button onClick={handleGetTranslation}>Get Translation</button>
            <button onClick={onClose}>Close</button>
            {translation && (
                <div>
                    <h3>Translation:</h3>
                    <p>{translation}</p>
                </div>
            )}
            {error && (
                <div style={{ color: 'red' }}>
                    <p>No Data Found</p>
                </div>
            )}
        </div>
    );
};

export default TranslationDetail;
