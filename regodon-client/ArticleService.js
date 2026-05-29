import axios from 'axios';
import constants from './constant';

const API = axios.create({
  baseURL: `${constants.HOST}/articles`,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchArticles = (params = {}) => API.get('/', { params });

export const fetchArticleBySlug = (slug, params = {}) =>
  API.get(`/slug/${slug}`, { params });

export const createArticle = (article) => API.post('/', article);

export const updateArticle = (id, article) => API.put(`/${id}`, article);

export const toggleArticleStatus = (id) => API.patch(`/${id}/status`);
