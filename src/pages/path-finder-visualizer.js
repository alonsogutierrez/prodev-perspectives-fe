import React, { useState } from 'react';

import HeadTitle from '../common/elements/head/HeadTitle';
import SubHeader from '../common/elements/header/SubHeader';

import Footer from '../common/elements/footer/Footer';

import PathFinder from '../common/components/path-finder-visualizer/PathFinder';

const PathFinderVisualizer = () => {
  const [heigth, setHeight] = useState(30);
  const [width, setWIdth] = useState(20);
  return (
    <>
      <HeadTitle pageTitle='Post Archive' />
      <SubHeader pClass='header-light header-sticky header-with-shadow' />
      <div className='axil-post-list-area axil-section-gap bg-color-white'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-8 col-xl-8'>
              <h3>Path Finder Visualizer</h3>
              <PathFinder
                heightByProp={heigth}
                widthByProp={width}
              ></PathFinder>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PathFinderVisualizer;
