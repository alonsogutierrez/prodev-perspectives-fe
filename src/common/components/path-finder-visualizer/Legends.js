import React from "react";
import Node from "./node/node";

const Legends = () => {
  return (
    <div id="mainText">
      <ul id="displayLegendsList" className="lengendListDesktop">
        <li>
          <Node id="legend-start" status="node-start" isWall={false}></Node>
          <div className="start"></div>
          Start
        </li>
        <li>
          <Node id="legend-end" status="node-end" isWall={false}></Node>
          <div className="end"></div>
          End
        </li>
        <li id="weightLegend">
          <Node
            id="legend-weighted"
            status="node-weighted"
            isWall={false}
          ></Node>
          <div className="borderlessWeight"></div>
          Weighted
        </li>
        <li>
          <Node
            id="legend-unvisited"
            status="node-unvisited"
            isWall={false}
          ></Node>
          <div className="unvisited"></div>
          Unvisited
        </li>
        <li>
          <Node id="legend-visited" status="node-visited" isWall={false}></Node>
          <div className="visited"></div>
          {/* <div className='visitedobject'></div> */}
          Visited
        </li>
        <li>
          <Node
            id="legend-shortest-path"
            status="node-shortest-path"
            isWall={false}
          ></Node>
          <div className="shortest-path"></div>
          Shortest-path
        </li>
        <li>
          <Node id="legend-wall" status="node-wall" isWall={false}></Node>
          <div className="wall"></div>
          Wall
        </li>
      </ul>
      <ul className="lengendListMobile">
        <li>
          <Node id="legend-start" status="node-start" isWall={false}></Node>
          <div className="start"></div>
          Start
        </li>
        <li>
          <Node id="legend-end" status="node-end" isWall={false}></Node>
          <div className="end"></div>
          End
        </li>
        <li id="weightLegend">
          <Node
            id="legend-weighted"
            status="node-weighted"
            isWall={false}
          ></Node>
          <div className="borderlessWeight"></div>
          Weighted
        </li>
        <li>
          <Node
            id="legend-unvisited"
            status="node-unvisited"
            isWall={false}
          ></Node>
          <div className="unvisited"></div>
          Unvisited
        </li>
      </ul>
      <ul className="lengendListMobile">
        <li>
          <Node id="legend-visited" status="node-visited" isWall={false}></Node>
          <div className="visited"></div>
          {/* <div className='visitedobject'></div> */}
          Visited
        </li>
        <li>
          <Node
            id="legend-shortest-path"
            status="node-shortest-path"
            isWall={false}
          ></Node>
          <div className="shortest-path"></div>
          Shortest-path
        </li>
        <li>
          <Node id="legend-wall" status="node-wall" isWall={false}></Node>
          <div className="wall"></div>
          Wall
        </li>
      </ul>
    </div>
  );
};

export default Legends;
