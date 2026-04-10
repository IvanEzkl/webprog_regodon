import { useEffect, useMemo, useState } from 'react';
import Layout from './components/Layout';
import AboutPage from './pages/AboutPage';
import ArticleListPage from './pages/ArticleListPage';
import ArticlePage from './pages/ArticlePage';
import HomePage from './pages/HomePage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFoundPage from './pages/NotFoundPage';

const detectInitialTheme = () => {
  const stored = localStorage.getItem('theme');
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

function App() {
  const [theme, setTheme] = useState(detectInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const router = useMemo(() => {
    const routes = [
      {
        path: '/',
        element: <Layout theme={theme} onToggleTheme={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))} />,
        errorElement: <NotFoundPage />,
        children: [
          {
            path: '/',
            element: <HomePage />,
          },
          {
            path: 'about',
            element: <AboutPage />,
          },
          {
            path: 'articles',
            element: <ArticleListPage />,
          },
          {
            path: '/articles/:name',
            element: <ArticlePage />,
          },
          {
            path: '*',
            element: <NotFoundPage />,
          },
        ],
      },
    ];

    return createBrowserRouter(routes);
  }, [theme]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App