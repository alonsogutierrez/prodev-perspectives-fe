import React from "react";
import Node from "./node/node";

const legendItems = [
  {
    id: "legend-start",
    status: "node-start",
    isWall: false,
    className: "start",
    label: "Start",
  },
  {
    id: "legend-end",
    status: "node-end",
    isWall: false,
    className: "end",
    label: "End",
  },
  {
    id: "legend-weighted",
    status: "node-weighted",
    isWall: false,
    className: "borderlessWeight",
    label: "Weighted",
  },
  {
    id: "legend-unvisited",
    status: "node-unvisited",
    isWall: false,
    className: "unvisited",
    label: "Unvisited",
  },
  {
    id: "legend-visited",
    status: "node-visited",
    isWall: false,
    className: "visited",
    label: "Visited",
  },
  {
    id: "legend-shortest-path",
    status: "node-shortest-path",
    isWall: false,
    className: "shortest-path",
    label: "Shortest-path",
  },
  {
    id: "legend-wall",
    status: "node-wall",
    isWall: false,
    className: "wall",
    label: "Wall",
  },
];

const Legends = () => {
  return (
    <div id="mainText">
      {/* Desktop Legends */}
      <ul id="displayLegendsList" className="lengendListDesktop">
        {legendItems.map((item) => (
          <li key={item.id}>
            <Node id={item.id} status={item.status} isWall={item.isWall}></Node>
            <div className={item.className}></div>
            {item.label}
          </li>
        ))}
      </ul>

      {/* Mobile Legends */}
      <ul className="lengendListMobile">
        {legendItems.map((item) => (
          <li key={item.id}>
            <Node id={item.id} status={item.status} isWall={item.isWall}></Node>
            <div className={item.className}></div>
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Legends;
