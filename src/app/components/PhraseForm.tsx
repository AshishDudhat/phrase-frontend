"use client";

import React, { useState, useEffect } from 'react';

interface PhraseFormProps {
    onSubmit: (data: any) => void;
    initialData?: any;
}

const PhraseForm: React.FC<PhraseFormProps> = ({ onSubmit, initialData }) => {
    const [phrase, setPhrase] = useState(initialData ? initialData.phrase : '');
    const [status, setStatus] = useState(initialData ? initialData.status : 'active');
    const [translations, setTranslations] = useState(initialData ? initialData.translations : { fr: '', es: '' });

    useEffect(() => {
        if (initialData) {
            setPhrase(initialData.phrase || '');
            setStatus(initialData.status || 'active');
            setTranslations(initialData.translations || { fr: '', es: '' });
        }
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ phrase, status, translations });
        setPhrase('');
        setStatus('active');
        setTranslations({ fr: '', es: '' });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Phrase:</label>
                <input type="text" value={phrase} onChange={(e) => setPhrase(e.target.value)} required />
            </div>
            <div>
                <label>Status:</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="spam">Spam</option>
                    <option value="deleted">Deleted</option>
                </select>
            </div>
            <div>
                <label>Translation (FR):</label>
                <input
                    type="text"
                    value={translations.fr}
                    onChange={(e) => setTranslations({ ...translations, fr: e.target.value })}
                    required
                />
            </div>
            <div>
                <label>Translation (ES):</label>
                <input
                    type="text"
                    value={translations.es}
                    onChange={(e) => setTranslations({ ...translations, es: e.target.value })}
                    required
                />
            </div>
            <button type="submit">{initialData ? 'Update Phrase' : 'Create Phrase'}</button>
        </form>
    );
};

export default PhraseForm;
