import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../components/Button.jsx';
import NotFoundPage from '../NotFoundPage.jsx';
import { fetchArticleBySlug } from '../../../ArticleService.js';
import herodesign from '../../assets/herodesign.jpg';
import gridCover from '../../assets/grid.png';
import navCover from '../../assets/webnav.jpeg';
import defaultCover from '../../assets/hero.jpg';
import technicalWriting from '../../assets/technicalwriting.png';
import shippingCover from '../../assets/shipping.jpg';
import opCover from '../../assets/op.jpg';

const ASSET_MAP = {
  'src/assets/herodesign.jpg': herodesign,
  'src/assets/grid.png': gridCover,
  'src/assets/webnav.jpeg': navCover,
  'src/assets/hero.jpg': defaultCover,
  'src/assets/technicalwriting.png': technicalWriting,
  'src/assets/shipping.jpg': shippingCover,
  'src/assets/op.jpg': opCover,
};

const resolveArticleCover = (value) => {
  if (!value) {
    return '';
  }

  return ASSET_MAP[value] || value;
};

function ArticlePage() {
  const { name } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setError('');

    fetchArticleBySlug(name)
      .then(({ data }) => {
        if (!isMounted) {
          return;
        }
        setArticle(data?.article || null);
      })
      .catch(() => {
        if (!isMounted) {
          return;
        }
        setError('not-found');
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
  }, [name]);

  if (isLoading) {
    return (
      <div className="flex w-full flex-col gap-6">
        <section className="border-y-2 border-[var(--border-strong)] bg-[var(--bg-surface)] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <p className="text-sm text-[var(--ink-600)]">Loading article...</p>
          </div>
        </section>
      </div>
    );
  }

  if (error || !article || !Array.isArray(article.content) || article.content.length === 0) {
    return <NotFoundPage />;
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-[var(--border-strong)] bg-[var(--bg-surface)] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-4">
            <Button to="/articles"> Back to Articles</Button>
          </div>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--ink-500)]">
            Article
          </p>
          <h1 className="text-3xl font-bold leading-tight text-[var(--ink-900)] sm:text-4xl">
            {article.title}
          </h1>
          <p className="mt-2 text-sm text-[var(--ink-500)]">
            {article.name
              .split('-')
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ')}
          </p>
        </div>
      </section>

      <section className="border-y-2 border-[var(--border-strong)] bg-[var(--bg-surface)] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[1.25rem] border-2 border-[var(--border-strong)] bg-[var(--bg-soft)] p-2">
            {article.coverImage ? (
              <img
                src={resolveArticleCover(article.coverImage)}
                alt={article.coverAlt || article.title}
                className="h-full w-full object-contain"
                loading="lazy"
              />
            ) : (
              <div className="h-24 w-24 border-2 border-[var(--border-soft)] bg-[var(--bg-card)]" />
            )}
          </div>

          <div className="prose prose-sm max-w-none space-y-4 text-[var(--ink-700)]">
            {article.content.map((paragraph, index) => (
              <p key={index} className="whitespace-pre-wrap text-base leading-7 text-[var(--ink-700)]">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-8 border-t-2 border-[var(--border-strong)] pt-6">
            <Button to="/articles">Back to Articles</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArticlePage;