import Footer from "../common/elements/footer/Footer";
import { getAllPosts } from "../../lib/api";
import SubHeader from "../common/elements/header/SubHeader";
import HeadTitle from "../common/elements/head/HeadTitle";
import { slugify } from "../common/utils";
import PostSectionNine from "../common/components/post/PostSectionNine";
import CategoryListSlide from "../common/components/category/CategoryListSlide";

const ProgrammingFoundations = ({ allPosts }) => {
  const techPost = allPosts.filter(
    (post) => slugify(post.category) === "programming-foundations"
  );

  return (
    <>
      <HeadTitle pageTitle="Programming Foundations" />
      <SubHeader />
      <PostSectionNine allPosts={techPost} />
      <CategoryListSlide categoryPostsData={allPosts} />
      <Footer />
    </>
  );
};

export default ProgrammingFoundations;

export async function getStaticProps() {
  const allPosts = await getAllPosts();
  return {
    props: { allPosts },
  };
}
