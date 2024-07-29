import weightedSearchAlgorithm from "@algorithms/path-finders/weighted/weightedAlgorithms";
import { getInitialGrid } from "./helpers/grid";

export const drawShortestPath = (
  nodes,
  setObjectShortestPathNodesToAnimate,
  endNodeId,
  startNodeId,
  object,
  shortestPathNodesToAnimate
) => {
  let currentNode;
  const endNode = nodes[endNodeId];
  currentNode = nodes[endNode.previousNode];
  if (object) {
    while (currentNode.id !== startNodeId) {
      setObjectShortestPathNodesToAnimate(
        (objectShortestPathNodesToAnimate) => [
          currentNode,
          ...objectShortestPathNodesToAnimate,
        ]
      );
      currentNode = nodes[currentNode.previousNode];
    }
    return;
  }
  while (
    currentNode &&
    Object.keys(currentNode).length > 0 &&
    currentNode.id &&
    currentNode.id !== startNodeId
  ) {
    shortestPathNodesToAnimate.unshift(currentNode);
    document.getElementById(currentNode.id).className = `node shortest-path`;
    currentNode = nodes[currentNode.previousNode];
  }

  return;
};

export const addShortestPath = (
  nodes,
  setObjectShortestPathNodesToAnimate,
  endNodeId,
  startNodeId,
  object
) => {
  let currentNode = nodes[nodes[endNodeId].previousNode];
  if (object) {
    while (currentNode.id !== startNodeId) {
      setObjectShortestPathNodesToAnimate(
        (objectShortestPathNodesToAnimate) => [
          currentNode,
          ...objectShortestPathNodesToAnimate,
        ]
      );
      currentNode.relatesToObject = true;
      currentNode = nodes[currentNode.previousNode];
    }
    return;
  }
  while (currentNode.id !== startNodeId) {
    setObjectShortestPathNodesToAnimate((objectShortestPathNodesToAnimate) => [
      currentNode,
      ...objectShortestPathNodesToAnimate,
    ]);
    currentNode = nodes[currentNode.previousNode];
  }
  return;
};

export const drawShortestPathTimeout = (
  nodes,
  endNodeId,
  startNodeId,
  type,
  setIsToggleButtonOn
) => {
  let currentNode;
  let currentNodesToAnimate;

  // We are going to iterate from end node until start node
  // iterating with the pointer to the previousNode that has every Node
  currentNode = nodes[nodes[endNodeId].previousNode];
  currentNodesToAnimate = [];
  while (currentNode.id !== startNodeId) {
    // Insert at the beginning of the array
    currentNodesToAnimate.unshift(currentNode);
    // update currentNode var poiting to the previousPrevious node
    currentNode = nodes[currentNode.previousNode];
  }

  const timeout = (index) => {
    if (!currentNodesToAnimate.length)
      currentNodesToAnimate.push(nodes[startNodeId]);
    setTimeout(() => {
      if (index === 0) {
        shortestPathChange(currentNodesToAnimate[index]);
      } else if (index < currentNodesToAnimate.length) {
        shortestPathChange(
          currentNodesToAnimate[index],
          currentNodesToAnimate[index - 1]
        );
      } else if (index === currentNodesToAnimate.length) {
        shortestPathChange(
          nodes[endNodeId],
          currentNodesToAnimate[index - 1],
          "isActualTarget"
        );
      }
      if (index > currentNodesToAnimate.length) {
        toggleButtonsAnimation(true, setIsToggleButtonOn);
        return;
      }
      timeout(index + 1);
    }, 40);
  };

  const shortestPathChange = (currentNode, previousNode, isActualTarget) => {
    if (currentNode === "object") {
      let element = document.getElementById(object);
      element.className = "node objectTransparent";
    } else if (currentNode.id !== startNodeId) {
      if (
        currentNode.id !== endNodeId ||
        (currentNode.id === endNodeId && isActualTarget)
      ) {
        let currentHTMLNode = document.getElementById(currentNode.id);
        if (type === "unweighted") {
          currentHTMLNode.className = "node shortest-path-unweighted";
        } else {
          let direction;
          if (
            currentNode.relatesToObject &&
            !currentNode.overwriteObjectRelation &&
            currentNode.id !== endNodeId
          ) {
            direction = "storedDirection";
            currentNode.overwriteObjectRelation = true;
          } else {
            direction = "direction";
          }
          if (currentNode[direction] === "up") {
            currentHTMLNode.className = "node shortest-path-up";
          } else if (currentNode[direction] === "down") {
            currentHTMLNode.className = "node shortest-path-down";
          } else if (currentNode[direction] === "right") {
            currentHTMLNode.className = "node shortest-path-right";
          } else if (currentNode[direction] === "left") {
            currentHTMLNode.className = "node shortest-path-left";
          } else {
            currentHTMLNode.className = "node shortest-path";
          }
        }
      }
    }
    if (previousNode) {
      if (
        previousNode !== "object" &&
        previousNode.id !== endNodeId &&
        previousNode.id !== startNodeId
      ) {
        let previousHTMLNode = document.getElementById(previousNode.id);
        previousHTMLNode.className =
          previousNode.weight === 15
            ? "node shortest-path weight"
            : "node shortest-path";
      }
    } else {
      let element = document.getElementById(startNodeId);
      element.className = "node startTransparent";
    }
  };

  timeout(0);
};

export const reset = (nodes, start, end, object, objectNotTransparent) => {
  nodes[start].status = "node-start";
  document.getElementById(start).className = "node startTransparent";
  nodes[end].status = "node-end";
  if (object) {
    nodes[object].status = "object";
    if (objectNotTransparent) {
      document.getElementById(object).className = "node visitedObjectNode";
    } else {
      document.getElementById(object).className = "node objectTransparent";
    }
  }
};

export const launchAnimations = (
  pathFinderData,
  success,
  type,
  objectParam
) => {
  const {
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
  } = pathFinderData;
  let nodesToAnimateCopy = objectParam
    ? objectNodesToAnimate.slice(0)
    : nodesToAnimate.slice(0);
  let speed =
    velocitySelected === "fast"
      ? 0
      : velocitySelected === "average"
      ? 100
      : 500;
  let shortestNodes;

  const timeout = (index) => {
    setTimeout(function () {
      if (index === nodesToAnimateCopy.length) {
        if (objectParam) {
          setObjectNodesToAnimate([]);
          if (success) {
            addShortestPath(
              nodes,
              setObjectShortestPathNodesToAnimate,
              object,
              start,
              "object"
            );
            clearNodeStatuses();
            let newSuccess;
            if (type === "weighted") {
              newSuccess = weightedSearchAlgorithm(
                nodes,
                object,
                end,
                nodesToAnimate,
                grid,
                algorithm
              );
            } else {
              // newSuccess = unweightedSearchAlgorithm(
              //   nodes,
              //   object,
              //   end,
              //   nodesToAnimate,
              //   grid,
              //   algorithm
              // );
            }
            document.getElementById(object).className =
              "node visitedObjectNode";
            launchAnimations(newSuccess, type, false);
            return;
          } else {
            console.log("Failure.");
            reset(nodes, start, end, object);
            toggleButtonsAnimation(true, setIsToggleButtonOn);
            return;
          }
        } else {
          setNodesToAnimate([]);
          if (success) {
            if (
              !document
                .getElementById(end)
                .className.includes("visitedendNodeBlue")
            ) {
              document.getElementById(end).className =
                "node visitedendNodeBlue";
            }
            if (isObject) {
              addShortestPath(
                nodes,
                setObjectShortestPathNodesToAnimate,
                end,
                object
              );
              drawShortestPathTimeout(
                nodes,
                end,
                object,
                type,
                setIsToggleButtonOn
              );
              setObjectShortestPathNodesToAnimate([]);
              setShortesPathNodesToAnimate([]);
              reset(nodes, start, end, object, "objectNotTransparent");
            } else {
              drawShortestPathTimeout(
                nodes,
                end,
                start,
                type,
                setIsToggleButtonOn
              );
              setObjectShortestPathNodesToAnimate([]);
              setShortesPathNodesToAnimate([]);
              reset(nodes, start, end, object);
              toggleButtonsAnimation(true, setIsToggleButtonOn);
            }
            shortestNodes = objectShortestPathNodesToAnimate.concat(
              shortestPathNodesToAnimate
            );
            return;
          } else {
            console.log("Failure.");
            reset(nodes, start, end, object);
            toggleButtonsAnimation(true, setIsToggleButtonOn);
            return;
          }
        }
      } else if (index === 0) {
        if (objectParam) {
          document.getElementById(start).className =
            "node visitedStartNodePurple";
        } else {
          if (
            !document
              .getElementById(start)
              .className.includes("visitedStartNodePurple")
          ) {
            document.getElementById(start).className =
              "node visitedStartNodeBlue";
          }
        }
        change(nodesToAnimateCopy[index]);
      } else {
        change(nodesToAnimateCopy[index], nodesToAnimateCopy[index - 1]);
      }
      timeout(index + 1);
    }, speed);
  };

  const change = (currentNode, previousNode) => {
    let currentHTMLNode = document.getElementById(currentNode.id);
    let relevantClassNames = [
      "node-start",
      "node-end",
      "object",
      "visitedStartNodeBlue",
      "visitedStartNodePurple",
      "visitedObjectNode",
      "visitedendNodePurple",
      "visitedendNodeBlue",
      "node node-start",
      "node node-end",
      "node object",
      "node visitedStartNodeBlue",
      "node visitedStartNodePurple",
      "node visitedObjectNode",
      "node visitedendNodePurple",
      "node visitedendNodeBlue",
    ];
    if (!relevantClassNames.includes(currentHTMLNode.className)) {
      currentHTMLNode.className = "node current";
    }
    if (
      currentHTMLNode.className.includes("visitedStartNodePurple") &&
      !objectParam
    ) {
      currentHTMLNode.className = "node visitedStartNodeBlue";
    }
    if (currentHTMLNode.className.includes("node-end") && objectParam) {
      currentHTMLNode.className = "node visitedendNodePurple";
    }
    if (previousNode) {
      let previousHTMLNode = document.getElementById(previousNode.id);
      if (!relevantClassNames.includes(previousHTMLNode.className)) {
        if (objectParam) {
          previousHTMLNode.className =
            previousNode.weight === 15
              ? "node visitedobject weight"
              : "node visitedobject";
        } else {
          previousHTMLNode.className =
            previousNode.weight === 15
              ? "node node-visited weight"
              : "node node-visited";
        }
      }
    }
  };

  const shortestPathTimeout = (index) => {
    setTimeout(function () {
      if (index === shortestNodes.length) {
        reset(nodes, start, end, object);
        if (object) {
          shortestPathChange(nodes[end], shortestNodes[index - 1]);
          objectShortestPathNodesToAnimate = [];
          shortestPathNodesToAnimate = [];
          clearNodeStatuses();
          let newSuccess;
          if (type === "weighted") {
            newSuccess = weightedSearchAlgorithm(
              nodes,
              object,
              end,
              nodesToAnimate,
              grid,
              algorithm
            );
          } else {
            // newSuccess = unweightedSearchAlgorithm(
            //   nodes,
            //   object,
            //   end,
            //   nodesToAnimate,
            //   grid,
            //   algorithm
            // );
          }
          launchAnimations(newSuccess, type, false);
          return;
        } else {
          shortestPathChange(nodes[end], shortestNodes[index - 1]);
          objectShortestPathNodesToAnimate = [];
          shortestPathNodesToAnimate = [];
          return;
        }
      } else if (index === 0) {
        shortestPathChange(shortestNodes[index]);
      } else {
        shortestPathChange(shortestNodes[index], shortestNodes[index - 1]);
      }
      shortestPathTimeout(index + 1);
    }, 40);
  };

  const shortestPathChange = (currentNode, previousNode) => {
    let currentHTMLNode = document.getElementById(currentNode.id);
    if (type === "unweighted") {
      currentHTMLNode.className = "node shortest-path-unweighted";
    } else {
      if (currentNode.direction === "up") {
        currentHTMLNode.className = "node shortest-path-up";
      } else if (currentNode.direction === "down") {
        currentHTMLNode.className = "node shortest-path-down";
      } else if (currentNode.direction === "right") {
        currentHTMLNode.className = "node shortest-path-right";
      } else if (currentNode.direction === "left") {
        currentHTMLNode.className = "node shortest-path-left";
      } else if ((currentNode.direction = "down-right")) {
        currentHTMLNode.className = "node node-wall";
      }
    }
    if (previousNode) {
      let previousHTMLNode = document.getElementById(previousNode.id);
      previousHTMLNode.className = "node shortest-path";
    } else {
      let element = document.getElementById(start);
      element.className = "node shortest-path";
      element.removeAttribute("style");
    }
  };

  timeout(0);
};

export const launchInstantAnimations = (
  pathFinderData,
  success,
  type,
  object,
  algorithm
) => {
  const change = (currentNode, previousNode) => {
    let currentHTMLNode = document.getElementById(currentNode.id);
    let relevantClassNames = [
      "node-start",
      "shortest-path",
      "instantshortest-path",
      "instantshortest-path weight",
      "node node-start",
      "node shortest-path",
      "node instantshortest-path",
      "node instantshortest-path weight",
    ];
    if (previousNode) {
      let previousHTMLNode = document.getElementById(previousNode.id);
      if (!relevantClassNames.includes(previousHTMLNode.className)) {
        if (object) {
          previousHTMLNode.className =
            previousNode.weight === 15
              ? "node instantvisitedobject weight"
              : "node instantvisitedobject";
        } else {
          previousHTMLNode.className =
            previousNode.weight === 15
              ? "node instantvisited weight"
              : "node instantvisited";
        }
      }
    }
  };

  const shortestPathChange = (currentNode, previousNode) => {
    let currentHTMLNode = document.getElementById(currentNode.id);
    if (type === "unweighted") {
      currentHTMLNode.className = "node shortest-path-unweighted";
    } else {
      if (currentNode.direction === "up") {
        currentHTMLNode.className = "node shortest-path-up";
      } else if (currentNode.direction === "down") {
        currentHTMLNode.className = "node shortest-path-down";
      } else if (currentNode.direction === "right") {
        currentHTMLNode.className = "node shortest-path-right";
      } else if (currentNode.direction === "left") {
        currentHTMLNode.className = "node shortest-path-left";
      }
    }
    if (previousNode) {
      let previousHTMLNode = document.getElementById(previousNode.id);
      previousHTMLNode.className =
        previousNode.weight === 15
          ? "node instantshortest-path weight"
          : "node instantshortest-path";
    } else {
      let element = document.getElementById(start);
      element.className = "node startTransparent";
    }
  };

  const {
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
    objectParam,
  } = pathFinderData;
  let nodesNew = objectParam
    ? objectNodesToAnimate.slice(0)
    : nodesToAnimate.slice(0);
  let shortestNodes;
  for (let i = 0; i < nodesNew.length; i++) {
    if (i === 0) {
      change(nodesNew[i]);
    } else {
      change(nodesNew[i], nodesNew[i - 1]);
    }
  }
  if (objectParam) {
    objectNodesToAnimate = [];
    if (success) {
      drawShortestPath(
        nodesNew,
        setObjectShortestPathNodesToAnimate,
        object,
        start,
        "object",
        shortestPathNodesToAnimate
      );
      clearNodeStatuses();
      let newSuccess;
      if (type === "weighted") {
        newSuccess = weightedSearchAlgorithm(
          nodesNew,
          objectParam,
          end,
          nodesToAnimate,
          grid,
          algorithm
        );
      } else {
        // newSuccess = unweightedSearchAlgorithm(
        //   nodes,
        //   object,
        //   end,
        //   nodesToAnimate,
        //   grid,
        //   algorithm
        // );
      }
      launchInstantAnimations(newSuccess, type);
      shortestNodes = objectShortestPathNodesToAnimate.concat(
        shortestPathNodesToAnimate
      );
    } else {
      console.log("Failure.");
      reset(nodes, start, end, objectParam);
      return;
    }
  } else {
    setNodesToAnimate([]);
    if (success) {
      if (isObject) {
        drawShortestPath(
          nodes,
          setObjectShortestPathNodesToAnimate,
          end,
          object,
          shortestPathNodesToAnimate
        );
      } else {
        console.log("calling from here");
        drawShortestPath(
          nodes,
          setObjectShortestPathNodesToAnimate,
          end,
          start,
          isObject,
          shortestPathNodesToAnimate
        );
      }
      shortestNodes = objectShortestPathNodesToAnimate.concat(
        shortestPathNodesToAnimate
      );
    } else {
      console.log("Failure");
      reset(nodes, start, end, object);
      return;
    }
  }

  let j;
  for (j = 0; j < shortestNodes.length; j++) {
    if (j === 0) {
      shortestPathChange(shortestNodes[j]);
    } else {
      shortestPathChange(shortestNodes[j], shortestNodes[j - 1]);
    }
  }
  reset(nodes, start, end, objectParam);
  if (objectParam) {
    shortestPathChange(nodes[end], shortestNodes[j - 1]);
    objectShortestPathNodesToAnimate = [];
    shortestPathNodesToAnimate = [];
    clearNodeStatuses();
    let newSuccess;
    if (type === "weighted") {
      newSuccess = weightedSearchAlgorithm(
        nodes,
        objectParam,
        end,
        nodesToAnimate,
        grid,
        algorithm
      );
    } else {
      // newSuccess = unweightedSearchAlgorithm(
      //   nodes,
      //   object,
      //   end,
      //   nodesToAnimate,
      //   grid,
      //   algorithm
      // );
    }
    launchInstantAnimations(newSuccess, type);
  } else {
    shortestPathChange(nodes[end], shortestNodes[j - 1]);
    setObjectShortestPathNodesToAnimate([]);
    setShortesPathNodesToAnimate([]);
  }
};

export const clearPath = (pathFinderData, clickedButton) => {
  const { nodes, start, end, numberOfObjects, object, setAlgoDone } =
    pathFinderData;
  if (clickedButton) {
    let startNode = nodes[start];
    let endNode = nodes[end];
    let objectNode = numberOfObjects ? nodes[object] : null;
    startNode.status = "node-start";
    document.getElementById(startNode.id).className = "node node-start";
    endNode.status = "node-end";
    document.getElementById(endNode.id).className = "node node-end";
    if (objectNode) {
      objectNode.status = "node-unvisited";
      document.getElementById(objectNode.id).className = "node node-unvisited";
    }
  }

  // clear nodes into board states
  setAlgoDone(false);
  Object.keys(nodes).forEach((id) => {
    let currentNode = nodes[id];
    currentNode.previousNode = null;
    currentNode.distance = Infinity;
    currentNode.totalDistance = Infinity;
    currentNode.heuristicDistance = null;
    currentNode.direction = null;
    currentNode.storedDirection = null;
    currentNode.relatesToObject = false;
    currentNode.overwriteObjectRelation = false;
    currentNode.otherpreviousNode = null;
    currentNode.otherdistance = Infinity;
    currentNode.otherdirection = null;
    let currentHTMLNode = document.getElementById(id);
    let relevantStatuses = ["node-wall", "node-start", "node-end", "object"];
    if (
      (!relevantStatuses.includes(currentNode.status) ||
        currentHTMLNode.className.includes("visitedobject")) &&
      currentNode.weight !== 15
    ) {
      currentNode.status = "node-unvisited";
      currentHTMLNode.className = "node node-unvisited";
    } else if (currentNode.weight === 15) {
      currentNode.status = "node-unvisited";
      currentHTMLNode.className = "node node-unvisited weight";
    }
  });
};

export const changeNormalNode = (pathFinderData, currentNode) => {
  const { mouseDown, algorithmSelected } = pathFinderData;
  let currentElement = document.getElementById(currentNode.id);
  const relevantStatuses = ["node-start", "node-end", "object"];
  const unweightAlgorithms = ["dfs", "bfs"];
  if (mouseDown) {
    if (!relevantStatuses.includes(currentNode.status)) {
      currentElement.className =
        currentNode.status !== "node-wall"
          ? "node node-wall"
          : "node node-unvisited";
      currentNode.status =
        currentElement.className !== "node node-wall"
          ? "node-unvisited"
          : "node-wall";
      currentNode.weight = 0;
    }
  } else if (mouseDown && !unweightAlgorithms.includes(algorithmSelected)) {
    if (!relevantStatuses.includes(currentNode.status)) {
      currentElement.className =
        currentNode.weight !== 15
          ? "node node-unvisited weight"
          : "node node-unvisited";
      currentNode.weight = !currentElement.className.includes(
        "node-unvisited weight"
      )
        ? 0
        : 15;
      currentNode.status = "node-unvisited";
    }
  }
};

let previouslySwitchedNodeGlobalClone = null;
let previouslyPressedNodeStatusClone = null;

export const changeSpecialNode = (pathFinderData, currentNode) => {
  const {
    setPreviouslySwitchedNodeWeight,
    previouslySwitchedNodeWeight,
    pressedNodeStatus,
    algoDone,
  } = pathFinderData;
  let currentElement = document.getElementById(currentNode.id);
  let previousElement = null;
  if (previouslySwitchedNodeGlobalClone)
    previousElement = document.getElementById(
      previouslySwitchedNodeGlobalClone.id
    );
  if (
    currentNode.status !== "node-end" &&
    currentNode.status !== "node-start" &&
    currentNode.status !== "object"
  ) {
    if (previouslySwitchedNodeGlobalClone) {
      previouslySwitchedNodeGlobalClone.status =
        previouslyPressedNodeStatusClone;
      previouslySwitchedNodeGlobalClone.className =
        previouslySwitchedNodeWeight === 15
          ? "node node-unvisited weight"
          : previouslyPressedNodeStatusClone
          ? `node ${previouslyPressedNodeStatusClone}`
          : "node node-unvisited";
      previouslySwitchedNodeGlobalClone.weight =
        previouslySwitchedNodeWeight === 15 ? 15 : 0;
      previouslySwitchedNodeGlobalClone = currentNode;
      setPreviouslySwitchedNodeWeight(currentNode.weight);
      previouslyPressedNodeStatusClone = currentNode.status;
      currentElement.className = `node ${pressedNodeStatus}`;
      currentNode.status = pressedNodeStatus;
      currentNode.weight = 0;
    }
  } else if (currentNode.status !== pressedNodeStatus && !algoDone) {
    previouslySwitchedNodeGlobalClone.status = pressedNodeStatus;
    previousElement.className = `node ${pressedNodeStatus}`;
  } else if (currentNode.status === pressedNodeStatus) {
    previouslySwitchedNodeGlobalClone = currentNode;
    if (previouslyPressedNodeStatusClone) {
      currentElement.className = `node ${previouslyPressedNodeStatusClone}`;
      currentNode.status = previouslyPressedNodeStatusClone;
    } else {
      currentElement.className = "node node-unvisited";
      currentNode.status = "node-unvisited";
    }
  }
};

export const resetBoard = (pathFinderData, start, end) => {
  const [startRow, startCol] = start.split("-");
  const [endRow, endCol] = end.split("-");
  const { setGrid, setNodes, setAlgoDone, height, width } = pathFinderData;
  const elements = document.querySelectorAll(".node");
  elements.forEach((element) => {
    const id = element.id;
    let [rowId, colId] = id.split("-");
    if (!isNaN(rowId) && !isNaN(colId)) {
      rowId = parseInt(rowId);
      colId = parseInt(colId);
      const isStart =
        rowId === parseInt(startRow) && colId === parseInt(startCol);
      const isEnd = rowId === parseInt(endRow) && colId === parseInt(endCol);

      element.className = "node node-unvisited";
      if (isStart) {
        element.className = "node node-start";
      }
      if (isEnd) {
        element.className = "node node-end";
      }
    }
  });
  const newGrid = getInitialGrid(height, width, start, end);
  setNodes(newGrid.nodes);
  setGrid(newGrid.grid);
  setAlgoDone(false);
  return;
};

export const toggleButtonsAnimation = (
  isToggleButtonOn,
  setIsToggleButtonOn
) => {
  console.log("toggleButtonsAnimation", isToggleButtonOn);
  if (!isToggleButtonOn) {
    document.getElementById("btnClickVisualizeAlg").className =
      "btn btn-primary btn-disabled";
    document.getElementById("btnClickVisualizeAlgMobile").className =
      "btn btn-primary btn-disabled";
    document.getElementById("btnHandleMazeAndPatterns").className =
      "btn btn-primary btn-disabled";
    document.getElementById("btnHandleMazeAndPatternsMobile").className =
      "btn btn-primary btn-disabled";
    document.getElementById("btnResetBoard").className =
      "btn btn-info btn-disabled";
    document.getElementById("btnResetBoardMobile").className =
      "btn btn-info btn-disabled";
    console.log("button disabled");
    setIsToggleButtonOn(isToggleButtonOn);
    return;
  }
  document.getElementById("btnClickVisualizeAlg").className = "btn btn-primary";
  document.getElementById("btnClickVisualizeAlgMobile").className =
    "btn btn-primary";
  document.getElementById("btnHandleMazeAndPatterns").className =
    "btn btn-primary";
  document.getElementById("btnHandleMazeAndPatternsMobile").className =
    "btn btn-primary";
  document.getElementById("btnResetBoard").className = "btn btn-info";
  document.getElementById("btnResetBoardMobile").className = "btn btn-info";
  setIsToggleButtonOn(isToggleButtonOn);
  return;
};

export const mazeGenerationAnimations = (
  wallsToAnimate,
  speedParam,
  toggleButtonsAnimation,
  setIsToggleButtonOn,
  nodesParam
) => {
  let nodes = wallsToAnimate.slice(0);
  let speed = speedParam === "fast" ? 5 : speedParam === "average" ? 40 : 70;
  const timeout = (index) => {
    setTimeout(function () {
      if (index === nodes.length) {
        wallsToAnimate = [];
        toggleButtonsAnimation(true, setIsToggleButtonOn);
        return;
      }
      nodes[index].className =
        nodesParam[nodes[index].id].weight === 15
          ? "node node-unvisited weight"
          : "node node-wall";
      timeout(index + 1);
    }, speed);
  };

  timeout(0);
};

export const clearWalls = (nodes) => {
  Object.keys(nodes).forEach((node) => {
    let currentNode = nodes[node];
    let currentHTMLNode = document.getElementById(node);
    if (currentNode.status === "node-wall" || currentNode.weight === 15) {
      currentNode.status = "node-unvisited";
      currentNode.weight = 0;
      currentHTMLNode.className = "node node-unvisited";
    }
  });
};
