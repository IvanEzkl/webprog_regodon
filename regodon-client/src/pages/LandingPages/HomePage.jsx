import Button from "../../components/Button";
import reactMark from "../../assets/react.svg";
import viteMark from "../../assets/vite.svg";

const highlights = [
  {
    title: "Strategy to Launch",
    description:
      "From requirement mapping to deployment, each milestone follows a focused and measurable workflow.",
    image: reactMark,
  },
  {
    title: "Design-First Mindset",
    description:
      "Every screen is composed for clarity, contrast, and interaction so users can move confidently.",
    image: viteMark,
  },
  {
    title: "Performance Driven",
    description:
      "Fast bundles, responsive layouts, and maintainable components keep your product reliable at scale.",
    image: reactMark,
  },
];

const HomePage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="relative overflow-hidden border-y-2 border-[var(--border-strong)] bg-[var(--bg-surface)] px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div aria-hidden="true" className="pointer-events-none absolute -left-12 top-6 h-28 w-28 rounded-full bg-[var(--p-mist)] blur-2xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-14 bottom-8 h-36 w-36 rounded-full bg-[var(--p-lavender)]/40 blur-2xl" />

        <div className="relative z-10 mx-auto max-w-3xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--ink-500)]">
              Creative Portfolio
            </p>
            <h1 className="mx-auto max-w-2xl text-5xl font-black leading-tight text-[var(--ink-900)] sm:text-6xl lg:text-7xl">
              Welcome to Regodon Studio
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[var(--ink-700)] sm:text-lg">
              Discover the art of wireframing with a simple and structured
              system for hero content, key numbers, and featured cards. This
              page is designed to communicate clearly and guide users quickly.
            </p>
            <div className="mt-7 flex justify-center">
              <Button to="/about" variant="primary" className="shadow-[0_10px_24px_-12px_rgba(39,50,74,0.45)]">
                Learn More
              </Button>
            </div>
        </div>
      </section>

      <section className="border-y-2 border-[var(--border-strong)] bg-[var(--bg-surface)] px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--ink-500)]">
            Key Section
          </p>
          <h2 className="mt-2 text-3xl font-bold text-[var(--ink-900)] sm:text-4xl">
            Quick overview blocks
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["12", "Projects"],
            ["08", "Sections"],
            ["24", "Screens"],
            ["04", "Layouts"],
          ].map(([number, label]) => (
            <div
              key={label}
              className="group relative overflow-hidden rounded-2xl border-2 border-[var(--border-strong)] bg-[var(--bg-card)] p-5 transition-transform duration-200 hover:-translate-y-0.5"
            >
              <span className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,var(--p-mist)_0%,var(--p-sky)_50%,var(--p-lavender)_100%)]" />
              <p className="text-2xl font-black text-[var(--ink-900)] transition-colors group-hover:text-[var(--ink-700)]">{number}</p>
              <p className="mt-1 text-sm font-semibold uppercase tracking-[0.14em] text-[var(--ink-500)]">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y-2 border-[var(--border-strong)] bg-[var(--bg-surface)] px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--ink-500)]">
            Feature Cards
          </p>
          <h2 className="mt-2 text-3xl font-bold text-[var(--ink-900)] sm:text-4xl">
            Simple wireframe cards
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {highlights.map((item) => (
            <article
              key={item.title}
              className="group relative overflow-hidden rounded-3xl border-2 border-[var(--border-strong)] bg-[var(--bg-card)] p-5 shadow-[0_14px_28px_-24px_rgba(39,50,74,0.62)] transition-transform duration-200 hover:-translate-y-0.5"
            >
              <span className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-[var(--p-mist)]/80" />
              <img
                src={item.image}
                alt={item.title}
                className="h-14 w-14 rounded-xl border-2 border-[var(--border-soft)] bg-[var(--bg-soft)] p-2"
              />
              <h3 className="mt-4 text-xl font-bold text-[var(--ink-900)]">{item.title}</h3>
              <p className="mt-3 text-base leading-7 text-[var(--ink-700)]">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
