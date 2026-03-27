import Button from "../components/Button";
import heroImage from "../assets/hero.png";
import reactMark from "../assets/react.svg";
import viteMark from "../assets/vite.svg";

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
      <section className="border-y-2 border-[#140D19] bg-white px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="rounded-3xl border-2 border-dashed border-[#9D6E90]/45 bg-white p-4 sm:p-6">
            <img
              src={heroImage}
              alt="Designer workspace"
              className="h-full min-h-72 w-full rounded-[1.25rem] object-cover"
            />
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#9D6E90]">
              About The Creator
            </p>
            <h1 className="max-w-xl text-5xl font-black leading-tight text-[#140D19] sm:text-6xl">
              Ivan Ezekiel Regodon
            </h1>
            <p className="mt-5 max-w-lg text-base leading-8 text-[#36284C] sm:text-lg">
              I build practical digital products that combine strong visual
              structure and maintainable code. My focus is creating experiences
              that are easy to use, fast to load, and clear to navigate.
            </p>
            <p className="mt-4 max-w-lg text-base leading-8 text-[#36284C] sm:text-lg">
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

      <section className="border-y-2 border-[#140D19] bg-white px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9D6E90]">
            My Process
          </p>
          <h2 className="mt-2 text-3xl font-bold text-[#140D19] sm:text-4xl">
            How projects move from idea to release
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {workflow.map((item) => (
            <article
              key={item.step}
              className="rounded-3xl border-2 border-[#36284C] bg-white p-5"
            >
              <p className="text-sm font-black uppercase tracking-[0.14em] text-[#9D6E90]">
                Step {item.step}
              </p>
              <h3 className="mt-3 text-xl font-bold text-[#140D19]">{item.title}</h3>
              <p className="mt-3 text-base leading-7 text-[#36284C]">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y-2 border-[#140D19] bg-white px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9D6E90]">
            Toolkit
          </p>
          <h2 className="mt-2 text-3xl font-bold text-[#140D19] sm:text-4xl">
            Technologies and strengths
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool) => (
            <article
              key={tool.name}
              className="rounded-2xl border-2 border-[#36284C] bg-white p-5"
            >
              <img
                src={tool.icon}
                alt={tool.name}
                className="h-12 w-12 rounded-lg border-2 border-[#9D6E90]/45 bg-white p-2"
              />
              <h3 className="mt-3 text-lg font-bold text-[#140D19]">{tool.name}</h3>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
