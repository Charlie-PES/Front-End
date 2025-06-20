import axios from 'axios';

const NEWS_API_KEY = '9f85c82695db413291dacd4ec27c3e70';
const NEWS_API_URL = 'https://newsapi.org/v2/everything';

export async function getPetNews() {
  try {
    const response = await axios.get(NEWS_API_URL, {
      params: {
        q: 'adoção de animais OR adoção de cachorro OR adoção de gato OR animal OR animais silvestres',
        language: 'pt',
        sortBy: 'publishedAt',
        apiKey: NEWS_API_KEY,
        pageSize: 6 // 6 noticias
      }
    });
    return response.data.articles;
  } catch (error) {
    console.error('Erro ao buscar notícias:', error);
    return [];
  }
} 