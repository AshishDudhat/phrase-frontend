"use client";

import React, { useState } from 'react';

interface PhraseListProps {
    phrases: any[];
    onEdit: (phrase: any) => void;
    onDelete: (id: string) => void;
    onView: (id: string) => void; 
    onTranslationClick: (id: string) => void;
}

const PhraseList: React.FC<PhraseListProps> = ({ phrases, onEdit, onDelete, onView, onTranslationClick }) => {

    const handleDelete = (id: string) => {
        const confirmed = window.confirm('Are you sure you want to delete this phrase?');
        if (confirmed) {
          onDelete(id);
        }
    };

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Phrase</th>
                        <th>Status</th>
                        <th>Translations</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {phrases.map((phrase) => (
                        <tr key={phrase._id}>
                            <td>{phrase.phrase}</td>
                            <td>{phrase.status}</td>
                            <td>
                                FR: {phrase.translations.fr}, ES: {phrase.translations.es}
                            </td>
                            <td>
                                <button onClick={() => onView(phrase._id)}>View Details</button>
                                <button onClick={() => onTranslationClick(phrase._id)}>Get Translation</button>
                                <button onClick={() => onEdit(phrase)}>Edit</button>
                                <button onClick={() => handleDelete(phrase._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PhraseList;
