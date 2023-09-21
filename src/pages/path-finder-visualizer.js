import React, { useState, useEffect } from 'react';

import HeadTitle from '../common/elements/head/HeadTitle';
import SubHeader from '../common/elements/header/SubHeader';

import Footer from '../common/elements/footer/Footer';

import PathFinder from '../common/components/path-finder-visualizer/PathFinder';

const PathFinderVisualizer = () => {
  const [totalRows, setTotalRows] = useState(() =>
    typeof window !== 'undefined' ? (window.innerWidth <= 768 ? 10 : 25) : 25
  );
  const [totalColumns, setTotalColumns] = useState(() =>
    typeof window !== 'undefined' ? (window.innerWidth <= 768 ? 10 : 45) : 45
  );

  useEffect(() => {
    const handleResize = () => {
      // Check if window is defined before accessing it
      if (typeof window !== 'undefined') {
        setTotalRows(window.innerWidth <= 768 ? 10 : 25);
        setTotalColumns(window.innerWidth <= 768 ? 10 : 45);
      }
    };
    window.addEventListener('resize', handleResize, false);
  }, []);

  return (
    <>
      <HeadTitle pageTitle='Post Archive' />
      <SubHeader pClass='header-light header-sticky header-with-shadow' />
      <div className='axil-post-list-area axil-section-gap bg-color-white'>
        <div className='container'>
          <h3>Path Finder Visualizer</h3>
          <PathFinder
            heightByProp={totalRows}
            widthByProp={totalColumns}
          ></PathFinder>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PathFinderVisualizer;
