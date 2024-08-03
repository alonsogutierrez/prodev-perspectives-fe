import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "../../../lib/api";
import Footer from "../../common/elements/footer/Footer";
import SubHeader from "../../common/elements/header/SubHeader";
import PostLayoutTwo from "../../common/components/post/layout/PostLayoutTwo";
import SidebarOne from "../../common/components/sidebar/SidebarOne";
import { slugify } from "../../common/utils";
import HeadTitle from "../../common/elements/head/HeadTitle";

const AuthorArchive = ({ authorData, allPosts }) => {
  return (
    <>
      <HeadTitle pageTitle="Author" />
      <SubHeader />
      <div className="axil-author-area axil-author-banner bg-color-grey">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="about-author">
                <div className="media">
                  <div className="thumbnail">
                    <Link href="#">
                      <a>
                        <Image
                          src={authorData[0].authorImg}
                          alt={authorData[0].authorName}
                          height={105}
                          width={105}
                          priority={true}
                        />
                      </a>
                    </Link>
                  </div>
                  <div className="media-body">
                    <div className="author-info">
                      <h1 className="title">{authorData[0].authorName}</h1>
                      <span className="b3 subtitle">
                        {authorData[0].authorDesignation}
                      </span>
                    </div>
                    <div className="content">
                      <p className="b1 description">
                        {authorData[0].authorBio}
                      </p>
                      <ul className="social-share-transparent size-md">
                        {authorData[0].authorSocial.map((social) => (
                          <li key={social.url}>
                            <a href={social.url}>
                              <i className={social.icon} />
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="axil-post-list-area axil-section-gap bg-color-white">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="page-title">
                <h2 className="title mb--40">Articles By This Author</h2>
              </div>
            </div>
            <div className="col-lg-8 col-xl-8">
              <PostLayoutTwo dataPost={authorData} show="5" />
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

export default AuthorArchive;

export async function getStaticProps({ params }) {
  const postParams = params.slug;

  const allPosts = await getAllPosts();

  const getCategoryData = allPosts.filter(
    (post) => slugify(post.authorName) === postParams
  );
  const authorData = getCategoryData;

  return {
    props: {
      authorData,
      allPosts,
    },
  };
}

export async function getStaticPaths() {
  const posts = await getAllPosts();

  const paths = posts.map((post) => ({
    params: {
      slug: slugify(post.authorName),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}
