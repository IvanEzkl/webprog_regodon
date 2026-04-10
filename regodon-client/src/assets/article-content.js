import herodesign from './herodesign.jpg';
import gridCover from './grid.png';
import navCover from './webnav.jpeg';
import defaultCover from './hero.jpg';

const articles = [
  {
    name: "designing-clear-hero-sections",
    title: "Designing Clear Hero Sections",
    coverImage: herodesign,
    coverAlt: "Cover image for Designing Clear Hero Sections",
    content: [
      "A strong hero section should answer three questions quickly: what this product is, who it is for, and what to do next.",
      "When writing hero copy, use one bold headline, one supporting paragraph, and one clear action. Avoid stacking too many competing buttons.",
      "Visual hierarchy matters more than decoration. If everything is loud, users cannot decide where to focus.",
      "In my projects, I start every home page by sketching the hero first because it sets direction for the whole interface."
    ]
  },
  {
    name: "building-reliable-component-grids",
    title: "Building Reliable Component Grids",
    coverImage: gridCover,
    coverAlt: "Cover image for Building Reliable Component Grids",
    content: [
      "Card grids can look clean in design files but break quickly if spacing and width rules are inconsistent across breakpoints.",
      "I keep each card at the same structural rhythm: media, label, title, summary, action. That consistency makes scanning easier.",
      "Grid systems should prioritize readability before density. Four cards per row is useful only when text stays legible.",
      "A reliable card grid is one that feels balanced on mobile, tablet, and desktop without requiring content rewrites."
    ]
  },
  {
    name: "navigation-that-guides-users",
    title: "Navigation That Guides Users",
    coverImage: navCover,
    coverAlt: "Cover image for Navigation That Guides Users",
    content: [
      "Navigation is not just a menu. It is a promise that users can always recover their orientation inside the app.",
      "I prefer labels that describe destinations directly, such as Home, About, and Articles, instead of abstract words.",
      "Active states are important because they reduce uncertainty. Users should always know where they are at a glance.",
      "Good navigation feels invisible because people stop thinking about controls and focus on content."
    ]
  },
  {
    name: "writing-content-for-technical-pages",
    title: "Writing Content for Technical Pages",
    coverImage: 'src/assets/technicalwriting.png',
    coverAlt: "Cover image for Writing Content for Technical Pages",
    content: [
      "Technical pages become easier to read when each paragraph carries one idea and one actionable insight.",
      "Dense walls of text force users to skim badly. Short sections with clear transitions perform better.",
      "I write drafts in plain language first, then layer technical details once the flow is understandable.",
      "Strong content design turns documentation and article pages into tools, not just information dumps."
    ]
  },
  {
    name: "shipping-ui-with-confidence",
    title: "Shipping UI With Confidence",
    coverImage: 'src/assets/shipping.jpg',
    coverAlt: "Cover image for Shipping UI With Confidence",
    content: [
      "A polished UI is only complete when behavior is stable across routes and edge cases.",
      "Before shipping, I run a visual sweep for spacing bugs, a route sweep for broken links, and a content sweep for wording clarity.",
      "Confidence comes from repeatable checks, not from guessing that everything works.",
      "When teams build this habit early, release days feel calm instead of chaotic."
    ]
  },
  {
    name: "one-piece",
    title: "Ending Of One Piece",
    coverImage: 'src/assets/op.jpg',
    coverAlt: "Cover image for Ending Of One Piece",
    content: []
  }
];

export default articles;