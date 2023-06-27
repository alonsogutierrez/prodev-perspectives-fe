import Footer from '../common/elements/footer/Footer';
import { getAllPosts } from '../../lib/api';
import SubHeader from '../common/elements/header/SubHeader';
import HeadTitle from '../common/elements/head/HeadTitle';
import { slugify, SortingByDate } from '../common/utils';
import PostSectionNine from '../common/components/post/PostSectionNine';
import CategoryListSlide from '../common/components/category/CategoryListSlide';

const ProfessionalGrowth = ({ allPosts }) => {
  const techPost = allPosts.filter(
    (post) => slugify(post.cate) === 'professional-growth'
  );

  return (
    <>
      <HeadTitle pageTitle='Tech Blog' />
      <SubHeader postData={allPosts} />
      <PostSectionNine postData={techPost} />
      <CategoryListSlide cateData={allPosts} />
      <Footer />
    </>
  );
};

export default ProfessionalGrowth;

export async function getStaticProps() {
  const allPosts = getAllPosts([
    'postFormat',
    'title',
    'featureImg',
    'featured',
    'date',
    'slug',
    'pCate',
    'cate',
    'cate_img',
    'author_img',
    'author_name',
    'post_views',
    'read_time',
    'author_social',
  ]);

  SortingByDate(allPosts);
  return {
    props: { allPosts },
  };
}
