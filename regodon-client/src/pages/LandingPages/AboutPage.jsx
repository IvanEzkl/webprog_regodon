import Button from "../../components/Button";
import heroImage from "../../assets/hero.jpg";
import reactMark from "../../assets/react.svg";
import viteMark from "../../assets/vite.svg";
const workflow = [
  {
    step: "01",
    title: "Research & Discovery",
    description:
      "I begin with clear problem framing, audience mapping, and goals alignment so each solution is built on purpose.",
  },
  {
    step: "02",
    title: "Interface Architecture",
    description:
      "I shape the structure with focused wireframes and content flow, then validate readability and interaction patterns.",
  },
  {
    step: "03",
    title: "Development & Iteration",
    description:
      "I implement scalable components, test edge cases, and refine the experience based on feedback and performance metrics.",
  },
];

const tools = [
  { name: "React", icon: reactMark },
  { name: "Vite", icon: viteMark },
  { name: "Design Systems", icon: reactMark },
  { name: "Rapid Prototyping", icon: viteMark },
];

const AboutPage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="relative overflow-hidden border-y-2 border-[var(--border-strong)] bg-[var(--bg-surface)] px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div aria-hidden="true" className="pointer-events-none absolute -right-16 top-10 h-40 w-40 rounded-full bg-[var(--p-mist)] blur-3xl" />
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="rounded-3xl border-2 border-dashed border-[var(--border-soft)] bg-[var(--bg-card)] p-4 shadow-[0_18px_34px_-24px_rgba(39,50,74,0.48)] sm:p-6">
            <img
              src={heroImage}
              alt="Designer workspace"
              className="h-full min-h-72 w-full rounded-[1.25rem] object-cover"
            />
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--ink-500)]">
              About The Creator
            </p>
            <h1 className="max-w-xl text-5xl font-black leading-tight text-[var(--ink-900)] sm:text-6xl">
              Ivan Ezekiel Regodon
            </h1>
            <p className="mt-5 max-w-lg text-base leading-8 text-[var(--ink-700)] sm:text-lg">
              I build practical digital products that combine strong visual
              structure and maintainable code. My focus is creating experiences
              that are easy to use, fast to load, and clear to navigate.
            </p>
            <p className="mt-4 max-w-lg text-base leading-8 text-[var(--ink-700)] sm:text-lg">
              My recent projects include web interfaces for student workflows,
              portfolio systems, and feature-driven dashboards where each screen
              has a clear user goal.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button to="/articles" variant="primary">
                Read Articles
              </Button>
              <Button to="/">Back Home</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-[var(--border-strong)] bg-[var(--bg-surface)] px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--ink-500)]">
            My Process
          </p>
          <h2 className="mt-2 text-3xl font-bold text-[var(--ink-900)] sm:text-4xl">
            How projects move from idea to release
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {workflow.map((item) => (
            <article
              key={item.step}
              className="group relative overflow-hidden rounded-3xl border-2 border-[var(--border-strong)] bg-[var(--bg-card)] p-5 transition-transform duration-200 hover:-translate-y-0.5"
            >
              <span className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,var(--p-mist)_0%,var(--p-sky)_50%,var(--p-lavender)_100%)]" />
              <p className="text-sm font-black uppercase tracking-[0.14em] text-[var(--ink-500)]">
                Step {item.step}
              </p>
              <h3 className="mt-3 text-xl font-bold text-[var(--ink-900)]">{item.title}</h3>
              <p className="mt-3 text-base leading-7 text-[var(--ink-700)]">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y-2 border-[var(--border-strong)] bg-[var(--bg-surface)] px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--ink-500)]">
            Toolkit
          </p>
          <h2 className="mt-2 text-3xl font-bold text-[var(--ink-900)] sm:text-4xl">
            Technologies and strengths
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool) => (
            <article
              key={tool.name}
              className="rounded-2xl border-2 border-[var(--border-strong)] bg-[var(--bg-card)] p-5 shadow-[0_14px_28px_-24px_rgba(39,50,74,0.62)]"
            >
              <img
                src={tool.icon}
                alt={tool.name}
                className="h-12 w-12 rounded-lg border-2 border-[var(--border-soft)] bg-[var(--p-mist)] p-2"
              />
              <h3 className="mt-3 text-lg font-bold text-[var(--ink-900)]">{tool.name}</h3>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
