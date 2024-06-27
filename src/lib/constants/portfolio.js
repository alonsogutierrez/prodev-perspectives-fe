const projects = [
  {
    title: "Todo o Nada Ecommerce",
    technologies: [
      "Javascript",
      "ReactJS",
      "NodeJS",
      "MongoDB",
      "ElasticSearch",
    ],
    description:
      "Ecommerce builded with an layered architecture with FE developed in ReactJS, BFF developed with NodeJS, database with MongoDB and searches with ElasticSearch using a CQRS pattern to improve our user experience and have low latencies in searching experience",
    maitainers: ["Alonso Gutiérrez"],
    url: "https://todoonadatattooart.com",
    cloud: ["Ecommerce", "FullStack"],
    images: ["/images/portfolio/plp.png"],
  },
  {
    title: "Path Finder Visualizer",
    technologies: ["Javascript", "ReactJS", "NextJS", "SCSS"],
    description:
      "Project inspired in Clement Mihailescu Path Finder Visualizer, the main idea is show how different path finder algorithms works, his advantages and disanvantages",
    maitainers: ["Alonso Gutiérrez"],
    url: "https://prodevperspectives.com/path-finder-visualizer",
    cloud: ["Algorithms", "Data structures"],
    images: ["/images/portfolio/path-finder-visualizer.png"],
  },
];
const certifications = [
  {
    title: "AlgoExpert Certified - 100 Questions Completed",
    skills: ["Javascript", "Python"],
    description:
      "The ultimate resource to prepare for coding interviews. Everything you need, in one streamlined platform.",
    url: "https://www.algoexpert.io/product",
    cloud: ["SoftwareEngineer", "Interviews"],
    images: ["/images/portfolio/algo-experts-cert.png"],
  },
  {
    title: "SystemsExpert Certified - Systems Design",
    skills: ["SystemDesign", "Architect"],
    description:
      "An unparalleled course on large-scale distributed systems. Everything you need to ace the systems design interviews.",
    url: "https://www.algoexpert.io/systems/product",
    cloud: ["SoftwareEngineer", "Interviews"],
    images: ["/images/portfolio/system-experts-cert.png"],
  },
];

export { projects, certifications };
