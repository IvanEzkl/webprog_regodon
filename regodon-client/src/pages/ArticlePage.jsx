import Button from "../components/Button";
import heroImage from "../assets/hero.png";
import reactMark from "../assets/react.svg";
import viteMark from "../assets/vite.svg";

const articles = [
  {
    title: "Planning Layouts With Wireframe Thinking",
    category: "Design",
    image: heroImage,
    summary:
      "A practical guide to structuring hero sections, feature blocks, and supporting content so each page tells one clear story.",
  },
  {
    title: "Component-Driven UI in React",
    category: "Development",
    image: reactMark,
    summary:
      "How reusable components reduce bugs and speed up iteration when building multi-page sites with shared UI patterns.",
  },
  {
    title: "Fast Prototypes Using Vite",
    category: "Tooling",
    image: viteMark,
    summary:
      "Why Vite improves local development flow, and how to keep your project structure clean as features grow.",
  },
  {
    title: "Designing Readable Interfaces",
    category: "UX",
    image: heroImage,
    summary:
      "Typography scale, spacing rhythm, and visual hierarchy techniques that make pages easier to scan and understand.",
  },
  {
    title: "From Brief to Build",
    category: "Process",
    image: reactMark,
    summary:
      "A repeatable workflow for converting assignment briefs into implementation-ready sections and polished deliverables.",
  },
  {
    title: "Balancing Style and Performance",
    category: "Engineering",
    image: viteMark,
    summary:
      "Methods for maintaining visual quality while keeping bundle size and rendering performance under control.",
  },
];

const ArticlePage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-[#140D19] bg-white px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9D6E90]">
            Articles
          </p>
          <h1 className="mt-3 text-5xl font-black leading-tight text-[#140D19] sm:text-6xl">
            Insights on design, code, and product delivery
          </h1>
          <p className="mt-5 text-base leading-8 text-[#36284C] sm:text-lg">
            This section compiles short writeups on methods used in this
            project: from wireframe planning and design consistency to modular
            development and implementation speed.
          </p>
          <div className="mt-7">
            <Button to="/about" variant="primary">
              Meet The Creator
            </Button>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-[#140D19] bg-white px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {articles.map((article) => (
            <article
              key={article.title}
              className="rounded-3xl border-2 border-[#36284C] bg-white p-5"
            >
              <img
                src={article.image}
                alt={article.title}
                className="h-44 w-full rounded-[1.25rem] border-2 border-[#9D6E90]/45 bg-white object-cover p-2"
              />
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#9D6E90] sm:text-sm">
                {article.category}
              </p>
              <h2 className="mt-2 text-2xl font-bold text-[#140D19]">
                {article.title}
              </h2>
              <p className="mt-3 text-base leading-7 text-[#36284C]">
                {article.summary}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ArticlePage;
