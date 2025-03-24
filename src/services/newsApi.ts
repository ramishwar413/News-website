import axios from 'axios';
import { NewsResponse } from '../types/news';

const API_KEY = "b49c0930d029440d9e9e155d6015709d"; // Replace with your actual API key
const BASE_URL = 'http://newsapi.org/v2'; // Changed from https to http for development

export const getTopHeadlines = async (category: string = 'general'): Promise<NewsResponse> => {
  const response = await axios.get(`${BASE_URL}/top-headlines`, {
    params: {
      country: 'us',
      category,
      apiKey: API_KEY,
    },
  });
  return response.data;
};

export const searchNews = async (query: string): Promise<NewsResponse> => {
  const response = await axios.get(`${BASE_URL}/everything`, {
    params: {
      q: query,
      apiKey: API_KEY,
      sortBy: 'publishedAt',
    },
  });
  return response.data;
};