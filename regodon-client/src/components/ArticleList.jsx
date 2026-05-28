import { Link } from 'react-router-dom';
import Button from './Button';

const ArticleList = ({ articles }) => {
    if (!Array.isArray(articles) || articles.length === 0) {
        return (
            <p className="text-sm text-[var(--ink-600)]">No articles yet.</p>
        );
    }

    return (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {articles.map((article, index) => (
                <article key={article.name || index} className="rounded-3xl border-2 border-[var(--border-strong)] bg-[var(--bg-card)] p-4">
                    <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[1.25rem] border-2 border-[var(--border-soft)] bg-[var(--bg-soft)] p-2">
                        {article.coverImage ? (
                            <img
                                src={article.coverImage}
                                alt={article.coverAlt || article.title}
                                className="h-full w-full object-contain"
                                loading="lazy"
                            />
                        ) : (
                            <div className="h-12 w-12 border-2 border-[var(--border-soft)] bg-[var(--bg-card)]" />
                        )}
                    </div>
                    <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--ink-500)]">
                        Article {String(index + 1).padStart(2, '0')}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-[var(--ink-900)]">{article.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-[var(--ink-700)]">
                        {article.content?.length
                            ? `${String(article.content[0]).substring(0, 150)}...`
                            : 'No preview yet.'}
                    </p>
                    <Link to={`/articles/${article.name}`}>
                        <Button className="mt-4">Read More</Button>
                    </Link>
                </article>
            ))}
        </div>
    );
};

export default ArticleList;