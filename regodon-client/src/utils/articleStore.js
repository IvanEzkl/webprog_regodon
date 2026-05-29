import defaultArticles from '../data/article-content.js';

const STORAGE_KEY = 'regodon_articles_v1';

const normalizeArticle = (article) => {
  if (!article || typeof article !== 'object') {
    return null;
  }

  const name = String(article.name || '').trim();
  const title = String(article.title || '').trim();

  if (!name || !title) {
    return null;
  }

  const content = Array.isArray(article.content)
    ? article.content.map((line) => String(line)).filter(Boolean)
    : [];

  return {
    name,
    title,
    coverImage: article.coverImage ?? '',
    coverAlt: article.coverAlt ?? '',
    content,
    isActive: article.isActive === undefined ? true : Boolean(article.isActive),
  };
};

const loadStoredArticles = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
};

const mergeArticles = (defaults, stored) => {
  const merged = new Map();

  defaults.forEach((article) => {
    const normalized = normalizeArticle(article);
    if (normalized) {
      merged.set(normalized.name, normalized);
    }
  });

  stored.forEach((article) => {
    const normalized = normalizeArticle(article);
    if (!normalized) {
      return;
    }
    const base = merged.get(normalized.name);
    merged.set(normalized.name, {
      ...base,
      ...normalized,
      coverImage:
        normalized.coverImage === undefined && base ? base.coverImage : normalized.coverImage,
      coverAlt:
        normalized.coverAlt === undefined && base ? base.coverAlt : normalized.coverAlt,
    });
  });

  return Array.from(merged.values());
};

export const getStoredArticles = ({ includeInactive = false } = {}) => {
  const defaults = Array.isArray(defaultArticles) ? defaultArticles : [];
  const stored = loadStoredArticles();
  const merged = mergeArticles(defaults, stored);

  return includeInactive ? merged : merged.filter((article) => article.isActive !== false);
};

export const saveStoredArticles = (articles) => {
  const normalized = Array.isArray(articles)
    ? articles.map(normalizeArticle).filter(Boolean)
    : [];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
};
