import Footer from '../common/elements/footer/Footer';
import SubHeader from '../common/elements/header/SubHeader';
import HeadTitle from '../common/elements/head/HeadTitle';
import PostSectionPortafolio from '../common/components/post/PostSectionPortafolio';

const Portfolio = ({}) => {
  const projects = [
    {
      title: 'Todo o Nada Ecommerce',
      technologies: [
        'Javascript',
        'ReactJS',
        'NodeJS',
        'MongoDB',
        'ElasticSearch',
      ],
      description:
        'Ecommerce builded with an layered architecture with FE developed in ReactJS, BFF developed with NodeJS, database with MongoDB and searches with ElasticSearch using a CQRS pattern to improve our user experience and have low latencies in searching experience',
      maitainers: ['Alonso Gutiérrez'],
      url: 'https://todoonadatattooart.cl',
      cloud: ['Ecommerce', 'FullStack'],
    },
    {
      title: 'Path Finder Visualizer',
      technologies: ['Javascript', 'ReactJS', 'NextJS', 'SCSS'],
      description:
        'Project inspired in Clement Mihailescu Path Finder Visualizer, the main idea is show how different path finder algorithms works, his advantages and disanvantages',
      maitainers: ['Alonso Gutiérrez'],
      url: 'https://prodevperspectives.com/path-finder-visualizer',
      cloud: ['Algorithms', 'Data structures'],
    },
  ];
  return (
    <>
      <HeadTitle pageTitle='Portfolio' />
      <SubHeader />
      <PostSectionPortafolio portafolioData={projects} />
      <Footer />
    </>
  );
};

export default Portfolio;
