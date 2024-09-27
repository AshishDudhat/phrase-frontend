import axios from 'axios';

const API_URL = 'http://localhost:3000/api/phrases'; // Adjust the URL based on your NestJS server

export const getPhrases = async (search: string, sortBy: string, order: 'asc' | 'desc') => {
    const response = await axios.get(API_URL, {
        params: { search, sortBy, order },
    });
    return response.data;
};

export const createPhrase = async (phraseData: any) => {
    const response = await axios.post(API_URL, phraseData);
    return response.data;
};

export const getPhraseById = async (id: string) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const updatePhrase = async (id: string, phraseData: any) => {
    const response = await axios.put(`${API_URL}/${id}`, phraseData);
    return response.data;
};

export const deletePhrase = async (id: string) => {
    await axios.delete(`${API_URL}/${id}`);
};

export const getTranslation = async (id: string, language: string) => {
    const response = await axios.get(`${API_URL}/${id}/${language}`);
    return response.data;
};

