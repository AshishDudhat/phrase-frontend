"use client";

import React, { useEffect, useState } from 'react';
import { getPhrases, createPhrase, updatePhrase, deletePhrase } from './services/phraseService';
import PhraseForm from './components/PhraseForm';
import PhraseList from './components/PhraseList';
import PhraseDetail from './components/PhraseDetail';
import TranslationForm from './components/TranslationDetail';
import TranslationDetail from './components/TranslationDetail';

const Home: React.FC = () => {
    const [phrases, setPhrases] = useState<any[]>([]);
    const [selectedPhrase, setSelectedPhrase] = useState<any>(null);
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('createdAt');
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [viewPhraseId, setViewPhraseId] = useState<string | null>(null);
    const [showTranslationDetail, setShowTranslationDetail] = useState(false);
    const [selectedPhraseId, setSelectedPhraseId] = useState<string | null>(null);
    const [resetLanguageForm, setResetLanguageForm] = useState(false);

    const fetchPhrases = async () => {
        const data = await getPhrases(search, sortBy, order);
        setPhrases(data);
    };

    useEffect(() => {
        fetchPhrases();
    }, [search, sortBy, order]);

    const handleCreateOrUpdate = async (data: any) => {
        if (selectedPhrase) {
            await updatePhrase(selectedPhrase._id, data);
        } else {
            await createPhrase(data);
        }
        setSelectedPhrase(null);
        fetchPhrases();
    };

    const handleEdit = (phrase: any) => {
        setSelectedPhrase(phrase);
    };

    const handleDelete = async (id: string) => {
        await deletePhrase(id);
        fetchPhrases();
    };
    
    const handleViewDetail = (phraseId: string) => {
      setViewPhraseId(phraseId);
    };

    const handleBack = () => {
        setViewPhraseId(null);
    };

    const handleTranslationClick = (id: string) => {
      if (selectedPhraseId && selectedPhraseId != id) {
        setResetLanguageForm(true);
      } else {
        setResetLanguageForm(false); // Show the TranslationForm
      }
      setSelectedPhraseId(id);
      setShowTranslationDetail(true);
    };

    const handleCloseTranslationForm = () => {
        setShowTranslationDetail(false);
        setSelectedPhraseId(null);
        setResetLanguageForm(true);
    };

    const renderView = () => {
      if (viewPhraseId) {
          return (
              <PhraseDetail phraseId={viewPhraseId} onBack={handleBack} />
          );
      } else {
          return (
              <div>
                  <h1>Phrases</h1>
                  <input
                      type="text"
                      placeholder="Search..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                  />
                  <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
                      <option value="createdAt">Created At</option>
                      <option value="phrase">Phrase</option>
                  </select>
                  <select onChange={(e) => setOrder(e.target.value as 'asc' | 'desc')} value={order}>
                      <option value="asc">Ascending</option>
                      <option value="desc">Descending</option>
                  </select>
                  <PhraseForm onSubmit={handleCreateOrUpdate} initialData={selectedPhrase} />
                  <PhraseList
                      phrases={phrases}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      onView={handleViewDetail}
                      onTranslationClick={handleTranslationClick}
                  />
                  {showTranslationDetail && selectedPhraseId && (
                      <div style={{ marginTop: '20px' }}>
                          <TranslationDetail phraseId={selectedPhraseId} onClose={handleCloseTranslationForm} resetForm={resetLanguageForm} />
                      </div>
                  )}
              </div>
          );
      }
  };

  return renderView();
};

export default Home;
