import Footer from "../common/elements/footer/Footer";
import { getAllPosts } from "../../lib/api";
import SubHeader from "../common/elements/header/SubHeader";
import HeadTitle from "../common/elements/head/HeadTitle";
import PostSectionNine from "../common/components/post/PostSectionNine";
import CategoryListSlide from "../common/components/category/CategoryListSlide";
import PortfolioHome from "../common/components/path-finder-visualizer/home/PortfolioHome";

const HomeDefault = ({ allPosts }) => {
  return (
    <>
      <HeadTitle pageTitle="Home" />
      <SubHeader />
      <PostSectionNine allPosts={allPosts} />
      <PortfolioHome />
      <CategoryListSlide categoryPostsData={allPosts} />
      <Footer />
    </>
  );
};

export default HomeDefault;

export async function getStaticProps() {
  const allPosts = await getAllPosts();
  return {
    props: { allPosts },
    revalidate: 1800, // Revalidate the page every 30 minutes
  };
}
