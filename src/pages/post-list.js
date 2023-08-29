import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import Footer from '../common/elements/footer/Footer';
import SubHeader from '../common/elements/header/SubHeader';
import { getAllPosts } from '../../lib/api';
import SidebarOne from '../common/components/sidebar/SidebarOne';
import PostLayoutTwo from '../common/components/post/layout/PostLayoutTwo';
import HeadTitle from '../common/elements/head/HeadTitle';

const PostListPage = ({ allPosts }) => {
  const [blogs] = useState(allPosts);
  const [pageNumber, setPageNumber] = useState(0);

  const blogsPerPage = 5;
  const pageVisited = pageNumber * blogsPerPage;

  const pageCount = Math.ceil(blogs.length / blogsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <>
      <HeadTitle pageTitle='Post Archive' />
      <SubHeader pClass='header-light header-sticky header-with-shadow' />
      <div className='axil-post-list-area axil-section-gap bg-color-white'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-8 col-xl-8'>
              <PostLayoutTwo
                dataPost={allPosts}
                show={pageVisited + blogsPerPage}
                postStart={pageVisited}
              />

              <ReactPaginate
                previousLabel={<i className='fas fa-arrow-left'></i>}
                nextLabel={<i className='fas fa-arrow-right'></i>}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={'pagination'}
                previousLinkClassName={'prev'}
                nextLinkClassName={'next'}
                disabledClassName={'disabled'}
                activeClassName={'current'}
              />
            </div>
            <div className='col-lg-4 col-xl-4 mt_md--40 mt_sm--40'>
              <SidebarOne dataPost={allPosts} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PostListPage;

export async function getStaticProps() {
  const allPosts = await getAllPosts();
  return {
    props: { allPosts },
  };
}
