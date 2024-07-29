import { getAllPosts } from "../../../lib/api";
import PostLayoutTwo from "../../common/components/post/layout/PostLayoutTwo";
import BreadcrumbOne from "../../common/elements/breadcrumb/breadcrumbOne";
import Footer from "../../common/elements/footer/Footer";
import HeadTitle from "../../common/elements/head/HeadTitle";
import SubHeader from "../../common/elements/header/SubHeader";
import SidebarOne from "../../common/components/sidebar/SidebarOne";
import { slugify } from "../../common/utils";

const PostCategory = ({ postData, allPosts }) => {
  return (
    <>
      <HeadTitle pageTitle="Category Archive" />
      <SubHeader />
      <BreadcrumbOne title={postData[0].category} />
      <div className="axil-post-list-area axil-section-gap bg-color-white">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-xl-8">
              <PostLayoutTwo dataPost={postData} show="4" />
            </div>
            <div className="col-lg-4 col-xl-4 mt_md--40 mt_sm--40">
              <SidebarOne dataPost={allPosts} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PostCategory;

export async function getStaticProps({ params }) {
  const postParams = params.slug;

  const allPosts = await getAllPosts();

  const getCategoryData = allPosts.filter(
    (post) => slugify(post.category) === postParams
  );
  const postData = getCategoryData;

  return {
    props: {
      postData,
      allPosts,
    },
    revalidate: 1800, // Revalidate the page every 30 minutes
  };
}

export async function getStaticPaths() {
  const posts = await getAllPosts();

  const paths = posts.map((post) => ({
    params: {
      slug: slugify(post.category),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}
