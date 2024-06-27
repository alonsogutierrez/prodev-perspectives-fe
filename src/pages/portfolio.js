import Footer from "../common/elements/footer/Footer";
import SubHeader from "../common/elements/header/SubHeader";
import HeadTitle from "../common/elements/head/HeadTitle";
import PostSectionPortafolio from "../common/components/post/PostSectionPortafolio";
import { projects, certifications } from "../lib/constants/portfolio";

const Portfolio = ({}) => {
  return (
    <>
      <HeadTitle pageTitle="Portfolio" />
      <SubHeader />
      <PostSectionPortafolio
        portafolioData={projects}
        certifications={certifications}
      />
      <Footer />
    </>
  );
};

export default Portfolio;
