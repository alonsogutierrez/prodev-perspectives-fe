import React from "react";

import HeadTitle from "../common/elements/head/HeadTitle";
import SubHeader from "../common/elements/header/SubHeader";

import Footer from "../common/elements/footer/Footer";

import PathFinder from "../common/components/path-finder-visualizer/PathFinder";

const PathFinderVisualizer = () => {
  return (
    <>
      <HeadTitle pageTitle="Path Finder Visualizer" />
      <SubHeader pClass="header-light header-sticky header-with-shadow" />
      <div className="axil-post-list-area axil-section-gap bg-color-white">
        <div className="container">
          <h3>Path Finder Visualizer - Search Algorithms</h3>
          <PathFinder />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PathFinderVisualizer;
