import Link from "next/link";
import Image from "next/image";

const PortfolioHome = () => {
  return (
    <>
      <div className={`axil-tech-post-banner bg-color-grey`}>
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-md-12 col-12 mt--30">
              <h1
                style={{
                  color: "#00aae6",
                  textShadow: "2px 2px 1px #000",
                  fontWeight: "bold",
                }}
              >
                ProDev Portfolio projects
              </h1>
            </div>
            <div className="col-xl-6 col-md-12 col-12 mt--30">
              <div className="content-block post-grid post-grid-transparent">
                <div className="post-thumbnail">
                  <Link href={`/path-finder-visualizer`}>
                    <a>
                      <Image
                        src={"/images/portfolio/path-finder-visualizer.png"}
                        alt={"Path finder visualizer"}
                        height={600}
                        width={600}
                        priority={true}
                      />
                    </a>
                  </Link>
                </div>
                <div className="post-grid-content">
                  <div className="post-content">
                    <div className="post-cat">
                      <div className="post-cat-list">
                        <Link href={`/path-finder-visualizer`}>
                          <a className="hover-flip-item-wrapper">
                            <span className="hover-flip-item">
                              <span data-text="dsa-and-alg">
                                DSA Path Finder Visualizer
                              </span>
                            </span>
                          </a>
                        </Link>
                      </div>
                    </div>
                    <h3 className="title">
                      <Link href={`/path-finder-visualizer`}>
                        <a
                          style={{
                            color: "#00aae6",
                            textShadow: "2px 2px 1px #000",
                            fontWeight: "bold",
                            backgroundColor: "#fff",
                          }}
                        >
                          DSA Path Finder Visualizer - Dijkstra - A* - DFS - BFS
                          & More
                        </a>
                      </Link>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-12 col-md-6 col-12">
              <div className="row">
                {/**
                 * TODO: Add Path Finder Visualizer here
                 */}
                <div className="col-lg-6 col-md-6 col-sm-6 col-12 mt--30">
                  <div className="content-block post-default image-rounded">
                    <div className="post-thumbnail">
                      <Link href="https://todoonadatattooart.com">
                        <a>
                          <Image
                            src="/images/portfolio/plp.png"
                            alt={"Todo o Nada Tattoo Art Ecommerce CL"}
                            height={300}
                            width={60}
                            priority={true}
                          />
                        </a>
                      </Link>
                    </div>
                    <div className="post-content">
                      <div className="post-cat">
                        <div className="post-cat-list">
                          <Link href="https://todoonadatattooart.com">
                            <a className="hover-flip-item-wrapper">
                              <span className="hover-flip-item">
                                <span data-text="path-finder-visualizer-search-alg">
                                  Todo o Nada Tatto Art Ecommerce CL
                                </span>
                              </span>
                            </a>
                          </Link>
                        </div>
                      </div>
                      <h5 className="title">
                        <Link href="https://todoonadatattooart.com">
                          <a>Ecommerce Web CL - Microservices</a>
                        </Link>
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PortfolioHome;
