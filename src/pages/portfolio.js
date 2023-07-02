import Footer from '../common/elements/footer/Footer';
import SubHeader from '../common/elements/header/SubHeader';
import HeadTitle from '../common/elements/head/HeadTitle';
import PostSectionPortafolio from '../common/components/post/PostSectionPortafolio';

const Portfolio = ({ allPosts }) => {
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
        'Ecommerce builded with an layered architecture with FE developed in ReactJS, BFF developed with NodeJS, database with MongoDB and searches with ElasticSearch',
      maitainers: ['Alonso Gutiérrez'],
      url: 'https://todoonadatattooart.cl',
      cloud: ['AWS', 'Heroku'],
    },
  ];
  return (
    <>
      <HeadTitle pageTitle='Portfolio' />
      <SubHeader postData={allPosts} />
      <PostSectionPortafolio portafolioData={projects} />
      <Footer />
    </>
  );
};

export default Portfolio;
