import Link from "next/link";
import Image from "next/image";

const portfolioItems = [
  {
    href: "/path-finder-visualizer",
    imgSrc: "/images/portfolio/path-finder-visualizer.png",
    imgAlt: "Path finder visualizer",
    imgHeight: 600,
    imgWidth: 600,
    category: "DSA Path Finder Visualizer",
    title: "Path Finder Visualizer with Dijkstra - A* - DFS - BFS",
    titleStyle: {
      color: "#00aae6",
      textShadow: "2px 2px 1px #000",
      fontWeight: "bold",
    },
    containerClass: "post-grid post-grid-transparent", // Clase específica para el contenedor
    rowClass: "col-xl-6 col-md-12 col-12 mt--30", // Clase específica para el primer div
  },
  {
    href: "https://todoonadatattooart.com",
    imgSrc:
      "https://prodevperspectives-images.s3.us-east-2.amazonaws.com/images/medium/ecommerce.png",
    imgAlt: "Todo o Nada Tattoo Art Ecommerce CL",
    imgHeight: 300, // Tamaño más pequeño
    imgWidth: 550, // Tamaño más pequeño
    category: "Todo o Nada Tatto Art Ecommerce CL",
    title: "Ecommerce Web CL - Microservices",
    titleStyle: {
      //color: "#333", // Letras no rojas
      //textShadow: "1px 1px 2px #000",
      //fontWeight: "normal", // Peso de fuente diferente
    },
    containerClass: "post-default image-rounded", // Clase específica para el contenedor
    rowClass: "col-xl-3 col-md-6 col-12 mt--20", // Clase específica para el primer div
  },
  {
    href: "https://karuncafe.com",
    imgSrc:
      "https://prodevperspectives-images.s3.us-east-2.amazonaws.com/images/medium/karuncafe.png",
    imgAlt: "Karün Cafe website",
    imgHeight: 220, // Tamaño más pequeño
    imgWidth: 400, // Tamaño más pequeño
    category: "Static website",
    title: "Static website - SSR",
    titleStyle: {
      //color: "#333", // Letras no rojas
      //textShadow: "1px 1px 2px #000",
      //fontWeight: "normal", // Peso de fuente diferente
    },
    containerClass: "post-default image-rounded", // Clase específica para el contenedor
    rowClass: "col-xl-3 col-md-6 col-12 mt--20", // Clase específica para el primer div
  },
];

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
                Visit our ProDev Perspectives&apos;s portfolio
              </h1>
            </div>
            {portfolioItems.map((item, index) => (
              <div key={index} className={item.rowClass}>
                <div className={`content-block ${item.containerClass}`}>
                  <div className="post-thumbnail">
                    <Link href={item.href}>
                      <a>
                        <Image
                          src={item.imgSrc}
                          alt={item.imgAlt}
                          height={item.imgHeight}
                          width={item.imgWidth}
                          priority={true}
                        />
                      </a>
                    </Link>
                  </div>
                  <div className="post-content">
                    <div className="post-cat">
                      <div className="post-cat-list">
                        <Link href={item.href}>
                          <a className="hover-flip-item-wrapper">
                            <span className="hover-flip-item">
                              <span data-text={item.category}>
                                {item.category}
                              </span>
                            </span>
                          </a>
                        </Link>
                      </div>
                    </div>
                    <h3 className="title">
                      <Link href={item.href}>
                        <a style={item.titleStyle || {}}>{item.title}</a>
                      </Link>
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PortfolioHome;
