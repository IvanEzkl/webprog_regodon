import { useParams } from 'react-router-dom';
import Button from '../components/Button';
import articles from '../assets/article-content.js'
import NotFoundPage from './NotFoundPage';

function ArticlePage() {
  const { name } = useParams();
  const article = articles.find(article => article.name === name);

  if (!article || !Array.isArray(article.content) || article.content.length === 0) {
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
            {article.name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </p>
        </div>
      </section>

      <section className="border-y-2 border-[var(--border-strong)] bg-[var(--bg-surface)] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 flex aspect-4/3 items-center justify-center rounded-[1.25rem] border-2 border-[var(--border-strong)] bg-[var(--bg-card)]">
            <div className="h-24 w-24 border-2 border-[var(--border-soft)] bg-[var(--bg-card)]" />
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