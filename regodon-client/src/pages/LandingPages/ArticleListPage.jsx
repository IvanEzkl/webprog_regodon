import { useEffect, useState } from 'react';
import Button from '../../components/Button.jsx';
import ArticleList from '../../components/ArticleList.jsx';
import { fetchArticles } from '../../../ArticleService.js';

const ArticleListPage = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setError('');

    fetchArticles()
      .then(({ data }) => {
        if (!isMounted) {
          return;
        }
        const nextArticles = Array.isArray(data?.articles) ? data.articles : [];
        setArticles(nextArticles);
      })
      .catch((err) => {
        if (!isMounted) {
          return;
        }
        setError(err?.response?.data?.message || 'Unable to load articles.');
      })
      .finally(() => {
        if (!isMounted) {
          return;
        }
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-[var(--border-strong)] bg-[var(--bg-surface)] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--ink-500)]">
            Articles
          </p>
          <h1 className="max-w-2xl text-3xl font-bold leading-tight text-[var(--ink-900)] sm:text-4xl">
            Featured articles in a simple card grid
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--ink-700)] sm:text-base">
            Notes, lessons, and real workflow takeaways from my design and
            development journey.
          </p>
          <p className="mt-2 max-w-lg text-sm leading-7 text-[var(--ink-700)] sm:text-base">
            Browse quick reads on structure, UI clarity, and practical frontend
            decisions you can apply right away.
          </p>
          <div className="mt-6">
            <Button to="/">Back Home</Button>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-[var(--border-strong)] bg-[var(--bg-surface)] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--ink-500)]">
            Featured Articles
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-[var(--ink-900)]">Article card grid</h2>
        </div>

        {isLoading ? (
          <p className="text-sm text-[var(--ink-600)]">Loading articles...</p>
        ) : error ? (
          <p className="text-sm text-[var(--accent-strong)]">{error}</p>
        ) : (
          <ArticleList articles={articles} />
        )}
      </section>
    </div>
  );
};

export default ArticleListPage;