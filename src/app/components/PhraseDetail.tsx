// components/PhraseDetail.tsx
import React, { useEffect, useState } from 'react';
import { getPhraseById } from '../services/phraseService';

interface PhraseDetailProps {
  phraseId: string;
  onBack: () => void;
}

const PhraseDetail: React.FC<PhraseDetailProps> = ({ phraseId, onBack }) => {
  const [phrase, setPhrase] = useState<any>(null);

  useEffect(() => {
    const fetchPhrase = async () => {
      const data = await getPhraseById(phraseId);
      setPhrase(data);
    };
    fetchPhrase();
  }, [phraseId]);

  if (!phrase) {
    return <div>Loading phrase details...</div>;
  }

  return (
    <div>
      <h2>Phrase Detail</h2>
      <p><strong>Phrase:</strong> {phrase.phrase}</p>
      <p><strong>Status:</strong> {phrase.status}</p>
      <p><strong>Created At:</strong> {phrase.createdAt}</p>
      <p><strong>Updated At:</strong> {phrase.updatedAt}</p>
      <button onClick={onBack}>Back</button>
    </div>
  );
};

export default PhraseDetail;
