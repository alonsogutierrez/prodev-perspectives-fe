import React, { useState, useEffect } from "react";

import Grid from "./Grid";
import {
  launchAnimations,
  launchInstantAnimations,
  clearPath,
  changeNormalNode,
  changeSpecialNode,
  toggleButtonsAnimation,
  mazeGenerationAnimations,
  clearWalls,
} from "./Animations";
import { algorithmsData } from "./helpers/algorithms";
import {
  allMazeAndPatterns,
  recursiveDivisionMaze,
} from "./helpers/mazeAndPatterns";
import { getInitialGrid } from "./helpers/grid";
import weightedSearchAlgorithm from "@algorithms/path-finders/weighted/weightedAlgorithms";
import unweightedSearchAlgorithm from "@algorithms/path-finders/unweighted/unweightedAlgorithms";
import Nav from "./Nav";
import Legends from "./Legends";

const allVelocities = [
  {
    id: 1,
    value: "fast",
    name: "Fast",
  },
  {
    id: 2,
    value: "average",
    name: "Average",
  },
  {
    id: 3,
    value: "slow",
    name: "Slow",
  },
];

const PathFinder = () => {
  const [height] = useState(20);
  const [width] = useState(30);
  const [start, setStart] = useState("6-5");
  const [end, setEnd] = useState("12-22");
  const [getBoardInitValues] = useState(
    getInitialGrid(height, width, start, end)
  );
  const [object, setObject] = useState(null);
  const [nodes, setNodes] = useState(getBoardInitValues.nodes);
  const [grid, setGrid] = useState(getBoardInitValues.grid);
  const [mouseIsPressed] = useState(false);
  const [pressedNodeStatus, setPressedNodeStatus] = useState("normal");
  const [mouseDown, setMouseDown] = useState(false);
  const [nodesToAnimate, setNodesToAnimate] = useState([]);
  const [objectNodesToAnimate, setObjectNodesToAnimate] = useState([]);
  const [shortestPathNodesToAnimate, setShortesPathNodesToAnimate] = useState(
    []
  );
  const [
    objectShortestPathNodesToAnimate,
    setObjectShortestPathNodesToAnimate,
  ] = useState([]);
  const [wallsToAnimate, setWallsToAnimate] = useState([]);
  const [numberOfObjects] = useState(0);
  const [isObject, setIsObject] = useState(false);
  const [algorithmSelected, setAlgorithmSelected] = useState("dijkstra");
  const [mazeAndPatternsSelected, setMazeAndPatternsSelected] = useState(
    "recursiveDivisionHorizontal"
  );
  const [velocitySelected, setVelocitySelected] = useState("fast");
  const [previouslySwitchedNodeWeight, setPreviouslySwitchedNodeWeight] =
    useState(0);
  const [algoDone, setAlgoDone] = useState(false);
  const [isVisibleBoard] = useState(true);
  const [isToggleButtonOn, setIsToggleButtonOn] = useState(true);

  const getNode = (nodeId) => {
    const [row, column] = nodeId.split("-");
    return grid[row][column];
  };

  const clearNodeStatuses = () => {
    Object.keys(nodes).forEach((id) => {
      let currentNode = nodes[id];
      currentNode.previousNode = null;
      currentNode.distance = Infinity;
      currentNode.totalDistance = Infinity;
      currentNode.heuristicDistance = null;
      currentNode.storedDirection = currentNode.direction;
      currentNode.direction = null;
      let relevantStatuses = ["node-wall", "node-start", "node-end", "object"];
      if (!relevantStatuses.includes(currentNode.status)) {
        currentNode.status = "node-unvisited";
      }
    });
  };

  const instantAlgorithm = () => {
    let weightedAlgorithms = algorithmsData.weighted.map((alg) => alg.value);
    let unweightedAlgorithms = algorithmsData.unweighted.map(
      (alg) => alg.value
    );
    let success;
    if (algorithmSelected === "astart") {
      if (!numberOfObjects) {
        success = weightedSearchAlgorithm(
          nodes,
          start,
          end,
          nodesToAnimate,
          grid,
          algorithmSelected,
          currentHeuristic
        );
        const pathFinderData = {
          nodesToAnimate,
          objectNodesToAnimate,
          clearNodeStatuses,
          setNodesToAnimate,
          setObjectShortestPathNodesToAnimate,
          objectShortestPathNodesToAnimate,
          shortestPathNodesToAnimate,
          nodes,
          isObject,
          start,
          end,
          object,
        };
        launchInstantAnimations(
          pathFinderData,
          success,
          "weighted",
          false,
          algorithmSelected
        );
      } else {
        setIsObject(true);
        success = weightedSearchAlgorithm(
          nodes,
          start,
          object,
          objectNodesToAnimate,
          grid,
          algorithmSelected,
          currentHeuristic
        );
        const pathFinderData = {
          nodesToAnimate,
          objectNodesToAnimate,
          clearNodeStatuses,
          setNodesToAnimate,
          setObjectShortestPathNodesToAnimate,
          setShortesPathNodesToAnimate,
          objectShortestPathNodesToAnimate,
          shortestPathNodesToAnimate,
          nodes,
          isObject,
          start,
          end,
          object,
        };
        launchInstantAnimations(
          pathFinderData,
          success,
          "weighted",
          "object",
          algorithmSelected
        );
      }
      algoDone = true;
    }
    if (weightedAlgorithms.includes(algorithmSelected)) {
      if (!numberOfObjects) {
        setTimeout(() => {
          success = weightedSearchAlgorithm(
            nodes,
            start,
            end,
            nodesToAnimate,
            grid,
            algorithmSelected
          );
          setTimeout(() => {
            const pathFinderData = {
              nodesToAnimate,
              objectNodesToAnimate,
              setObjectNodesToAnimate,
              clearNodeStatuses,
              setNodesToAnimate,
              setObjectShortestPathNodesToAnimate,
              setShortesPathNodesToAnimate,
              objectShortestPathNodesToAnimate,
              shortestPathNodesToAnimate,
              nodes,
              isObject,
              start,
              end,
              object,
              velocitySelected,
              setIsToggleButtonOn,
            };
            launchInstantAnimations(
              pathFinderData,
              success,
              "weighted",
              false,
              algorithmSelected
            );
          }, 250);
        }, 500);
      } else {
        setIsObject(true);
        setTimeout(() => {
          success = weightedSearchAlgorithm(
            nodes,
            start,
            object,
            objectNodesToAnimate,
            grid,
            algorithmSelected,
            currentHeuristic
          );
          setTimeout(() => {
            const pathFinderData = {
              nodesToAnimate,
              objectNodesToAnimate,
              clearNodeStatuses,
              setNodesToAnimate,
              setObjectShortestPathNodesToAnimate,
              objectShortestPathNodesToAnimate,
              shortestPathNodesToAnimate,
              nodes,
              isObject,
              start,
              end,
              object,
            };
            launchInstantAnimations(
              pathFinderData,
              success,
              "weighted",
              "object",
              algorithmSelected
            );
          }, 250);
        }, 500);
      }
      setAlgoDone(true);
    } else if (unweightedAlgorithms.includes(algorithmSelected)) {
      if (!numberOfObjects) {
        setTimeout(() => {
          success = unweightedSearchAlgorithm(
            nodes,
            start,
            end,
            nodesToAnimate,
            grid,
            algorithmSelected
          );
          setTimeout(() => {
            const pathFinderData = {
              nodesToAnimate,
              objectNodesToAnimate,
              clearNodeStatuses,
              setNodesToAnimate,
              setObjectShortestPathNodesToAnimate,
              objectShortestPathNodesToAnimate,
              shortestPathNodesToAnimate,
              isObject,
              start,
              end,
              object,
            };
            launchInstantAnimations(
              pathFinderData,
              success,
              "unweighted",
              false,
              algorithmSelected
            );
          }, 250);
        }, 500);
      } else {
        setIsObject(true);
        setTimeout(() => {
          success = unweightedSearchAlgorithm(
            nodes,
            start,
            object,
            objectNodesToAnimate,
            grid,
            algorithmSelected
          );
          setTimeout(() => {
            const pathFinderData = {
              nodesToAnimate,
              objectNodesToAnimate,
              clearNodeStatuses,
              setNodesToAnimate,
              setObjectShortestPathNodesToAnimate,
              objectShortestPathNodesToAnimate,
              shortestPathNodesToAnimate,
              nodes,
              isObject,
              start,
              end,
              object,
            };
            launchInstantAnimations(
              pathFinderData,
              success,
              "unweighted",
              "object",
              algorithmSelected
            );
          }, 250);
        }, 500);
      }
      setAlgoDone(true);
    }
  };

  const redoAlgorithm = () => {
    const pathFinderData = {
      nodes,
      start,
      end,
      numberOfObjects,
      object,
      setAlgoDone,
    };
    clearPath(pathFinderData);
    instantAlgorithm();
  };

  const handleVisualizeAlgorithmBtn = () => {
    if (!algorithmSelected) {
      // TODO: Show popup with message requesting the algorithm selection
      return;
    }
    const pathFinderData = {
      nodes,
      start,
      end,
      numberOfObjects,
      object,
      setAlgoDone,
    };

    clearPath(pathFinderData, "clickedBtn");
    toggleButtonsAnimation(false, setIsToggleButtonOn);

    const weightedAlgorithmsNames = algorithmsData["weighted"].map(
      (algo) => algo.value
    );
    const unweightedAlgorithmsNames = algorithmsData["unweighted"].map(
      (algo) => algo.value
    );
    if (weightedAlgorithmsNames.includes(algorithmSelected)) {
      if (!numberOfObjects) {
        setTimeout(() => {
          const success = weightedSearchAlgorithm(
            nodes,
            start,
            end,
            nodesToAnimate,
            grid,
            algorithmSelected
          );
          setTimeout(() => {
            const pathFinderData = {
              nodesToAnimate,
              objectNodesToAnimate,
              setObjectNodesToAnimate,
              clearNodeStatuses,
              setNodesToAnimate,
              setObjectShortestPathNodesToAnimate,
              setShortesPathNodesToAnimate,
              objectShortestPathNodesToAnimate,
              shortestPathNodesToAnimate,
              nodes,
              isObject,
              start,
              end,
              object,
              velocitySelected,
              setIsToggleButtonOn,
            };
            launchAnimations(pathFinderData, success, "weighted", false);
          }, 250);
        }, 500);
      } else {
        setIsObject(true);
        setTimeout(() => {
          const success = weightedSearchAlgorithm(
            nodes,
            start,
            end,
            nodesToAnimate,
            grid,
            algorithmSelected
          );
          setTimeout(() => {
            const pathFinderData = {
              nodesToAnimate,
              objectNodesToAnimate,
              setObjectNodesToAnimate,
              clearNodeStatuses,
              setNodesToAnimate,
              setObjectShortestPathNodesToAnimate,
              setShortesPathNodesToAnimate,
              objectShortestPathNodesToAnimate,
              shortestPathNodesToAnimate,
              nodes,
              isObject,
              start,
              end,
              object,
              velocitySelected,
              setIsToggleButtonOn,
            };
            launchAnimations(pathFinderData, success, "weighted", "object");
          }, 250);
        }, 500);
      }
    } else if (unweightedAlgorithmsNames.includes(algorithmSelected)) {
      if (!numberOfObjects) {
        setTimeout(() => {
          const success = unweightedSearchAlgorithm(
            nodes,
            start,
            end,
            nodesToAnimate,
            grid,
            algorithmSelected
          );
          setTimeout(() => {
            const pathFinderData = {
              nodesToAnimate,
              objectNodesToAnimate,
              setObjectNodesToAnimate,
              clearNodeStatuses,
              setNodesToAnimate,
              setObjectShortestPathNodesToAnimate,
              setShortesPathNodesToAnimate,
              objectShortestPathNodesToAnimate,
              shortestPathNodesToAnimate,
              nodes,
              isObject,
              start,
              end,
              object,
              velocitySelected,
              setIsToggleButtonOn,
            };
            launchAnimations(pathFinderData, success, "unweighted", false);
          }, 250);
        }, 500);
      } else {
        setIsObject(true);
        setTimeout(() => {
          const success = unweightedSearchAlgorithm(
            nodes,
            start,
            object,
            objectNodesToAnimate,
            grid,
            algorithmSelected
          );
          setTimeout(() => {
            const pathFinderData = {
              nodesToAnimate,
              objectNodesToAnimate,
              setObjectNodesToAnimate,
              clearNodeStatuses,
              setNodesToAnimate,
              setObjectShortestPathNodesToAnimate,
              setShortesPathNodesToAnimate,
              objectShortestPathNodesToAnimate,
              shortestPathNodesToAnimate,
              nodes,
              isObject,
              start,
              end,
              object,
              velocitySelected,
              setIsToggleButtonOn,
            };
            launchAnimations(pathFinderData, success, "unweighted", "object");
          }, 250);
        }, 500);
      }
    }
    setAlgoDone(true);
  };

  const handleVisualizeMazeAndPatterns = () => {
    if (mazeAndPatternsSelected === "recursiveDivisionHorizontal") {
      const pathFinderData = {
        start,
        end,
        rowStart: 2,
        rowEnd: height - 3,
        colStart: 2,
        colEnd: width - 3,
        orientation: "horizontal",
        surroundingWalls: false,
        type: "wall",
        mazeType: "normal",
        object,
        nodes,
        height,
        width,
        wallsToAnimate,
        setAlgoDone,
      };
      setWallsToAnimate([]);
      clearWalls(nodes);
      clearPath(pathFinderData, "clickedButton");
      toggleButtonsAnimation(false, setIsToggleButtonOn);
      setTimeout(() => {
        recursiveDivisionMaze(pathFinderData);
        setTimeout(() => {
          mazeGenerationAnimations(
            wallsToAnimate,
            velocitySelected,
            toggleButtonsAnimation,
            setIsToggleButtonOn,
            nodes
          );
        }, 250);
      }, 500);
    } else if (mazeAndPatternsSelected === "recursiveDivisionVertical") {
      const pathFinderData = {
        start,
        end,
        rowStart: 2,
        rowEnd: height - 3,
        colStart: 2,
        colEnd: width - 3,
        orientation: "vertical",
        surroundingWalls: false,
        type: "wall",
        mazeType: "special",
        object,
        nodes,
        height,
        width,
        wallsToAnimate,
        setAlgoDone,
      };
      setWallsToAnimate([]);
      clearWalls(nodes);
      clearPath(pathFinderData, "clickedButton");
      toggleButtonsAnimation(false, setIsToggleButtonOn);
      setTimeout(() => {
        recursiveDivisionMaze(pathFinderData);
        setTimeout(() => {
          mazeGenerationAnimations(
            wallsToAnimate,
            velocitySelected,
            toggleButtonsAnimation,
            setIsToggleButtonOn,
            nodes
          );
        }, 250);
      }, 500);
    }
    return;
  };

  const handleMouseDown = (nodeId) => {
    if (isToggleButtonOn) {
      setMouseDown(true);
      const currentNode = getNode(nodeId);
      if (
        currentNode.status === "node-start" ||
        currentNode.status === "node-end" ||
        currentNode.status === "object"
      ) {
        setPressedNodeStatus(currentNode.status);
        let element = document.getElementById(nodeId);
        element.className = `node ${currentNode.status}`;
      } else {
        setPressedNodeStatus("normal");
        const pathFinderData = {
          mouseDown,
          algorithmSelected,
        };
        changeNormalNode(pathFinderData, currentNode);
      }
    }
  };

  const handleMouseUp = (nodeId) => {
    if (isToggleButtonOn) {
      setMouseDown(false);
      if (pressedNodeStatus === "node-end") {
        let element = document.getElementById(nodeId);
        element.className = `node node-end`;
        setEnd(nodeId);
      } else if (pressedNodeStatus === "node-start") {
        setStart(nodeId);
        let element = document.getElementById(nodeId);
        element.className = `node node-start`;
      } else if (pressedNodeStatus === "object") {
        setObject(nodeId);
        let element = document.getElementById(nodeId);
        element.className = `node object`;
      }
      setPressedNodeStatus("normal");
    }
  };

  const handleMouseEnter = (nodeId) => {
    if (isToggleButtonOn) {
      const currentNode = getNode(nodeId);
      if (mouseDown && pressedNodeStatus !== "normal") {
        const pathFinderData = {
          setPreviouslySwitchedNodeWeight,
          previouslySwitchedNodeWeight,
          pressedNodeStatus,
          algoDone,
        };
        changeSpecialNode(pathFinderData, currentNode);
        if (pressedNodeStatus === "node-end") {
          setEnd(nodeId);
          if (algoDone) {
            redoAlgorithm();
          }
        } else if (pressedNodeStatus === "node-start") {
          setStart(nodeId);
          if (algoDone) {
            redoAlgorithm();
          }
        } else if (pressedNodeStatus === "object") {
          setObject(nodeId);
          if (algoDone) {
            redoAlgorithm();
          }
        }
      } else if (mouseDown) {
        const pathFinderData = {
          mouseDown,
          algorithmSelected,
        };
        changeNormalNode(pathFinderData, currentNode);
      }
    }
  };

  const handleMouseLeave = (nodeId) => {
    if (isToggleButtonOn) {
      if (mouseDown && pressedNodeStatus !== "normal") {
        const currentNode = getNode(nodeId);
        const pathFinderData = {
          setPreviouslySwitchedNodeWeight,
          previouslySwitchedNodeWeight,
          pressedNodeStatus,
          algoDone,
        };
        changeSpecialNode(pathFinderData, currentNode);
      }
    }
  };

  const onChangeAlgorithm = (algSelected) => {
    setAlgorithmSelected(algSelected);
  };

  const onChangeMazeAndPatterns = (mazeSelected) => {
    setMazeAndPatternsSelected(mazeSelected);
  };

  const onChangeVelocity = (velocity) => {
    setVelocitySelected(velocity);
  };

  useEffect(() => {}, [
    algorithmSelected,
    mazeAndPatternsSelected,
    isVisibleBoard,
  ]);

  return (
    <>
      <div
        style={{ textAlign: "center", padding: "50px" }}
        className="post-single-wrapper axil-section-gap bg-color-white"
      >
        <Nav
          start={start}
          end={end}
          onChangeAlgorithm={onChangeAlgorithm}
          algorithmsData={algorithmsData}
          handleVisualizeAlgorithmBtn={handleVisualizeAlgorithmBtn}
          onChangeMazeAndPatterns={onChangeMazeAndPatterns}
          allMazeAndPatterns={allMazeAndPatterns}
          onChangeVelocity={onChangeVelocity}
          velocitySelected={velocitySelected}
          allVelocities={allVelocities}
          isToggleButtonOn={isToggleButtonOn}
          setGrid={setGrid}
          setNodes={setNodes}
          setAlgoDone={setAlgoDone}
          height={height}
          width={width}
          handleVisualizeMazeAndPatterns={handleVisualizeMazeAndPatterns}
        ></Nav>
        <Legends></Legends>
        {isVisibleBoard ? (
          <Grid
            grid={grid}
            mouseIsPressed={mouseIsPressed}
            handleMouseEnter={handleMouseEnter}
            handleMouseDown={handleMouseDown}
            handleMouseUp={handleMouseUp}
            handleMouseLeave={handleMouseLeave}
          ></Grid>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  );
};

export default PathFinder;
