import Button from "../components/Button";
import heroImage from "../assets/hero.png";
import reactMark from "../assets/react.svg";
import viteMark from "../assets/vite.svg";

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
      <section className="border-y-2 border-[#140D19] bg-white px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#9D6E90]">
              Hero Section
            </p>
            <h1 className="max-w-xl text-5xl font-black leading-tight text-[#140D19] sm:text-6xl lg:text-7xl">
              Welcome to Wireframe Studio
            </h1>
            <p className="mt-6 max-w-lg text-base leading-8 text-[#36284C] sm:text-lg">
              Discover the art of wireframing with a simple and structured
              system for hero content, key numbers, and featured cards. This
              page is designed to communicate clearly and guide users quickly.
            </p>
            <div className="mt-7">
              <Button to="/about" variant="primary">
                Learn More
              </Button>
            </div>
          </div>

          <div className="rounded-3xl border-2 border-dashed border-[#9D6E90]/45 bg-white p-4 sm:p-6">
            <img
              src={heroImage}
              alt="Studio dashboard preview"
              className="h-full min-h-72 w-full rounded-[1.25rem] object-cover"
            />
          </div>
        </div>
      </section>

      <section className="border-y-2 border-[#140D19] bg-white px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9D6E90]">
            Key Section
          </p>
          <h2 className="mt-2 text-3xl font-bold text-[#140D19] sm:text-4xl">
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
              className="rounded-2xl border-2 border-[#36284C] bg-white p-5"
            >
              <p className="text-2xl font-black text-[#140D19]">{number}</p>
              <p className="mt-1 text-sm font-semibold uppercase tracking-[0.14em] text-[#9D6E90]">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y-2 border-[#140D19] bg-white px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9D6E90]">
            Feature Cards
          </p>
          <h2 className="mt-2 text-3xl font-bold text-[#140D19] sm:text-4xl">
            Simple wireframe cards
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {highlights.map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border-2 border-[#36284C] bg-white p-5"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-14 w-14 rounded-xl border-2 border-[#9D6E90]/45 bg-white p-2"
              />
              <h3 className="mt-4 text-xl font-bold text-[#140D19]">{item.title}</h3>
              <p className="mt-3 text-base leading-7 text-[#36284C]">
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
