import Footer from '../common/elements/footer/Footer';
import { getAllPosts } from '../../lib/api';
import SubHeader from '../common/elements/header/SubHeader';
import HeadTitle from '../common/elements/head/HeadTitle';
import { slugify, SortingByDate } from '../common/utils';
import PostSectionNine from '../common/components/post/PostSectionNine';
import CategoryListSlide from '../common/components/category/CategoryListSlide';

const DevelopmentDomains = ({ categoryPostsData }) => {
  const techPost = allPosts.filter(
    (post) => slugify(post.cate) === 'development-domains'
  );

  return (
    <>
      <HeadTitle pageTitle='Development Domains' />
      <SubHeader />
      <PostSectionNine allPosts={techPost} />
      <CategoryListSlide categoryPostsData={categoryPostsData} />
      <Footer />
    </>
  );
};

export default DevelopmentDomains;

export async function getStaticProps() {
  const allPosts = await getAllPosts();
  return {
    props: { allPosts },
  };
}
