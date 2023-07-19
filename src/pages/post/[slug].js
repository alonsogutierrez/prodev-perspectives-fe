import markdownToHtml from '../../../lib/markdownToHtml';
import { getPostBySlug, getAllPosts } from '../../../lib/api';
import HeadTitle from '../../common/elements/head/HeadTitle';
import SubHeader from '../../common/elements/header/SubHeader';
import Footer from '../../common/elements/footer/Footer';
import PostFormatStandard from '../../common/components/post/format/PostFormatStandard';
import PostFormatVideo from '../../common/components/post/format/PostFormatVideo';
import PostFormatGallery from '../../common/components/post/format/PostFormatGallery';
import PostFormatAudio from '../../common/components/post/format/PostFormatAudio';
import PostFormatQuote from '../../common/components/post/format/PostFormatQuote';

const PostDetails = ({ post, allPosts }) => {
  const PostFormatHandler = () => {
    if (post.postFormat === 'video') {
      return <PostFormatVideo postData={post} allData={allPosts} />;
    } else if (post.postFormat === 'gallery') {
      return <PostFormatGallery postData={post} allData={allPosts} />;
    } else if (post.postFormat === 'audio') {
      return <PostFormatAudio postData={post} allData={allPosts} />;
    } else if (post.postFormat === 'quote') {
      return <PostFormatQuote postData={post} allData={allPosts} />;
    } else {
      return <PostFormatStandard postData={post} allData={allPosts} />;
    }
  };

  return (
    <>
      <SubHeader pClass='header-light header-sticky header-with-shadow' />
      <HeadTitle pageTitle={post.title} />
      <PostFormatHandler />
      <Footer />
    </>
  );
};

export default PostDetails;

export async function getStaticProps({ params }) {
  const post = await getPostBySlug(params.slug);
  const content = await markdownToHtml(
    post.content.replace(/\\n/g, '\n').replace(/\\n/g, '\n') || ''
  );

  const allPosts = await getAllPosts();

  return {
    props: {
      post: {
        ...post,
        content,
      },
      allPosts,
    },
  };
}

export async function getStaticPaths() {
  const posts = await getAllPosts();

  const paths = posts.map((post) => ({
    params: {
      slug: post.slug,
    },
  }));
  return {
    paths,
    fallback: false,
  };
}
