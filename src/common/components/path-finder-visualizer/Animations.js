import weightedSearchAlgorithm from './../../../lib/algorithms/path-finders/weighted/weightedAlgorithms';

export const drawShortestPath = (
  nodes,
  setObjectShortestPathNodesToAnimate,
  endNodeId,
  startNodeId,
  object
) => {
  let currentNode;
  currentNode = nodes[nodes[endNodeId].previousNode];
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
  while (currentNode.id !== startNodeId) {
    setObjectShortestPathNodesToAnimate((objectShortestPathNodesToAnimate) => [
      currentNode,
      ...objectShortestPathNodesToAnimate,
    ]);
    document.getElementById(
      currentNode.id
    ).className = `node node-shortest-path`;
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
  type
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
          'isActualTarget'
        );
      }
      if (index > currentNodesToAnimate.length) {
        // toggleButtons();
        return;
      }
      timeout(index + 1);
    }, 40);
  };

  const shortestPathChange = (currentNode, previousNode, isActualTarget) => {
    if (currentNode === 'object') {
      let element = document.getElementById(object);
      element.className = 'node objectTransparent';
    } else if (currentNode.id !== startNodeId) {
      if (
        currentNode.id !== endNodeId ||
        (currentNode.id === endNodeId && isActualTarget)
      ) {
        let currentHTMLNode = document.getElementById(currentNode.id);
        if (type === 'unweighted') {
          currentHTMLNode.className = 'node shortest-path-unweighted';
        } else {
          let direction;
          if (
            currentNode.relatesToObject &&
            !currentNode.overwriteObjectRelation &&
            currentNode.id !== endNodeId
          ) {
            direction = 'storedDirection';
            currentNode.overwriteObjectRelation = true;
          } else {
            direction = 'direction';
          }
          if (currentNode[direction] === 'up') {
            currentHTMLNode.className = 'node shortest-path-up';
          } else if (currentNode[direction] === 'down') {
            currentHTMLNode.className = 'node shortest-path-down';
          } else if (currentNode[direction] === 'right') {
            currentHTMLNode.className = 'node shortest-path-right';
          } else if (currentNode[direction] === 'left') {
            currentHTMLNode.className = 'node shortest-path-left';
          } else {
            currentHTMLNode.className = 'node shortest-path';
          }
        }
      }
    }
    if (previousNode) {
      if (
        previousNode !== 'object' &&
        previousNode.id !== endNodeId &&
        previousNode.id !== startNodeId
      ) {
        let previousHTMLNode = document.getElementById(previousNode.id);
        previousHTMLNode.className =
          previousNode.weight === 15
            ? 'node shortest-path weight'
            : 'node shortest-path';
      }
    } else {
      let element = document.getElementById(startNodeId);
      element.className = 'node startTransparent';
    }
  };

  timeout(0);
};

export const reset = (nodes, start, end, object, objectNotTransparent) => {
  nodes[start].status = 'node-start';
  document.getElementById(start).className = 'node startTransparent';
  nodes[end].status = 'node-end';
  if (object) {
    nodes[object].status = 'object';
    if (objectNotTransparent) {
      document.getElementById(object).className = 'node visitedObjectNode';
    } else {
      document.getElementById(object).className = 'node objectTransparent';
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
  } = pathFinderData;
  let nodesToAnimateCopy = objectParam
    ? objectNodesToAnimate.slice(0)
    : nodesToAnimate.slice(0);
  let speed =
    velocitySelected === 'fast'
      ? 0
      : velocitySelected === 'average'
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
              'object'
            );
            clearNodeStatuses();
            let newSuccess;
            if (type === 'weighted') {
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
              'node visitedObjectNode';
            launchAnimations(newSuccess, type, false);
            return;
          } else {
            console.log('Failure.');
            reset(nodes, start, end, object);
            // toggleButtons();
            return;
          }
        } else {
          setNodesToAnimate([]);
          if (success) {
            if (
              !document
                .getElementById(end)
                .className.includes('visitedendNodeBlue')
            ) {
              document.getElementById(end).className =
                'node visitedendNodeBlue';
            }
            if (isObject) {
              addShortestPath(
                nodes,
                setObjectShortestPathNodesToAnimate,
                end,
                object
              );
              drawShortestPathTimeout(nodes, end, object, type);
              setObjectShortestPathNodesToAnimate([]);
              setShortesPathNodesToAnimate([]);
              reset(nodes, start, end, object, 'objectNotTransparent');
            } else {
              drawShortestPathTimeout(nodes, end, start, type);
              setObjectShortestPathNodesToAnimate([]);
              setShortesPathNodesToAnimate([]);
              reset(nodes, start, end, object);
            }
            shortestNodes = objectShortestPathNodesToAnimate.concat(
              shortestPathNodesToAnimate
            );
            return;
          } else {
            console.log('Failure.');
            reset(nodes, start, end, object);
            // toggleButtons();
            return;
          }
        }
      } else if (index === 0) {
        if (objectParam) {
          document.getElementById(start).className =
            'node visitedStartNodePurple';
        } else {
          if (
            !document
              .getElementById(start)
              .className.includes('visitedStartNodePurple')
          ) {
            document.getElementById(start).className =
              'node visitedStartNodeBlue';
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
      'node-start',
      'node-end',
      'object',
      'visitedStartNodeBlue',
      'visitedStartNodePurple',
      'visitedObjectNode',
      'visitedendNodePurple',
      'visitedendNodeBlue',
      'node node-start',
      'node node-end',
      'node object',
      'node visitedStartNodeBlue',
      'node visitedStartNodePurple',
      'node visitedObjectNode',
      'node visitedendNodePurple',
      'node visitedendNodeBlue',
    ];
    if (!relevantClassNames.includes(currentHTMLNode.className)) {
      currentHTMLNode.className = 'node current';
    }
    if (
      currentHTMLNode.className.includes('visitedStartNodePurple') &&
      !objectParam
    ) {
      currentHTMLNode.className = 'node visitedStartNodeBlue';
    }
    if (currentHTMLNode.className.includes('node-end') && objectParam) {
      currentHTMLNode.className = 'node visitedendNodePurple';
    }
    if (previousNode) {
      let previousHTMLNode = document.getElementById(previousNode.id);
      if (!relevantClassNames.includes(previousHTMLNode.className)) {
        if (objectParam) {
          previousHTMLNode.className =
            previousNode.weight === 15
              ? 'node visitedobject weight'
              : 'node visitedobject';
        } else {
          previousHTMLNode.className =
            previousNode.weight === 15
              ? 'node node-visited weight'
              : 'node node-visited';
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
          if (type === 'weighted') {
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
    if (type === 'unweighted') {
      currentHTMLNode.className = 'node shortest-path-unweighted';
    } else {
      if (currentNode.direction === 'up') {
        currentHTMLNode.className = 'node shortest-path-up';
      } else if (currentNode.direction === 'down') {
        currentHTMLNode.className = 'node shortest-path-down';
      } else if (currentNode.direction === 'right') {
        currentHTMLNode.className = 'node shortest-path-right';
      } else if (currentNode.direction === 'left') {
        currentHTMLNode.className = 'node shortest-path-left';
      } else if ((currentNode.direction = 'down-right')) {
        currentHTMLNode.className = 'node node-wall';
      }
    }
    if (previousNode) {
      let previousHTMLNode = document.getElementById(previousNode.id);
      previousHTMLNode.className = 'node shortest-path';
    } else {
      let element = document.getElementById(start);
      element.className = 'node shortest-path';
      element.removeAttribute('style');
    }
  };

  timeout(0);
};

export const launchInstantAnimations = (
  pathFinderData,
  success,
  type,
  object,
  algorithm,
  heuristic
) => {
  const {
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
  } = pathFinderData;
  let nodes = object ? objectNodesToAnimate.slice(0) : nodesToAnimate.slice(0);
  let shortestNodes;
  for (let i = 0; i < nodes.length; i++) {
    if (i === 0) {
      change(nodes[i]);
    } else {
      change(nodes[i], nodes[i - 1]);
    }
  }
  if (object) {
    objectNodesToAnimate = [];
    if (success) {
      drawShortestPath(
        nodes,
        setObjectShortestPathNodesToAnimate,
        object,
        start,
        'object'
      );
      clearNodeStatuses();
      let newSuccess;
      if (type === 'weighted') {
        newSuccess = weightedSearchAlgorithm(
          nodes,
          object,
          end,
          nodesToAnimate,
          grid,
          algorithm,
          heuristic
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
      console.log('Failure.');
      reset(nodes, start, end, object);
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
          object
        );
      } else {
        drawShortestPath(
          nodes,
          setObjectShortestPathNodesToAnimate,
          end,
          start
        );
      }
      shortestNodes = objectShortestPathNodesToAnimate.concat(
        shortestPathNodesToAnimate
      );
    } else {
      console.log('Failure');
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
  reset(nodes, start, end, object);
  if (object) {
    shortestPathChange(nodes[end], shortestNodes[j - 1]);
    objectShortestPathNodesToAnimate = [];
    shortestPathNodesToAnimate = [];
    clearNodeStatuses();
    let newSuccess;
    if (type === 'weighted') {
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
    launchInstantAnimations(newSuccess, type);
  } else {
    shortestPathChange(nodes[end], shortestNodes[j - 1]);
    objectShortestPathNodesToAnimate = [];
    shortestPathNodesToAnimate = [];
  }

  const change = (currentNode, previousNode) => {
    let currentHTMLNode = document.getElementById(currentNode.id);
    let relevantClassNames = [
      'node-start',
      'shortest-path',
      'instantshortest-path',
      'instantshortest-path weight',
      'node node-start',
      'node shortest-path',
      'node instantshortest-path',
      'node instantshortest-path weight',
    ];
    if (previousNode) {
      let previousHTMLNode = document.getElementById(previousNode.id);
      if (!relevantClassNames.includes(previousHTMLNode.className)) {
        if (object) {
          previousHTMLNode.className =
            previousNode.weight === 15
              ? 'node instantvisitedobject weight'
              : 'node instantvisitedobject';
        } else {
          previousHTMLNode.className =
            previousNode.weight === 15
              ? 'node instantvisited weight'
              : 'node instantvisited';
        }
      }
    }
  };

  const shortestPathChange = (currentNode, previousNode) => {
    let currentHTMLNode = document.getElementById(currentNode.id);
    if (type === 'unweighted') {
      currentHTMLNode.className = 'node shortest-path-unweighted';
    } else {
      if (currentNode.direction === 'up') {
        currentHTMLNode.className = 'node shortest-path-up';
      } else if (currentNode.direction === 'down') {
        currentHTMLNode.className = 'node shortest-path-down';
      } else if (currentNode.direction === 'right') {
        currentHTMLNode.className = 'node shortest-path-right';
      } else if (currentNode.direction === 'left') {
        currentHTMLNode.className = 'node shortest-path-left';
      }
    }
    if (previousNode) {
      let previousHTMLNode = document.getElementById(previousNode.id);
      previousHTMLNode.className =
        previousNode.weight === 15
          ? 'node instantshortest-path weight'
          : 'node instantshortest-path';
    } else {
      let element = document.getElementById(start);
      element.className = 'node startTransparent';
    }
  };
};

export const clearPath = (pathFinderData, clickedButton) => {
  const { nodes, start, end, numberOfObjects, object, setAlgoDone } =
    pathFinderData;
  if (clickedButton) {
    let startNode = nodes[start];
    let endNode = nodes[end];
    let objectNode = numberOfObjects ? nodes[object] : null;
    startNode.status = 'node-start';
    document.getElementById(startNode.id).className = 'node node-start';
    endNode.status = 'node-end';
    document.getElementById(endNode.id).className = 'node node-end';
    if (objectNode) {
      objectNode.status = 'node-unvisited';
      document.getElementById(objectNode.id).className = 'node node-unvisited';
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
    let relevantStatuses = ['node-wall', 'node-start', 'node-end', 'object'];
    if (
      (!relevantStatuses.includes(currentNode.status) ||
        currentHTMLNode.className.includes('visitedobject')) &&
      currentNode.weight !== 15
    ) {
      currentNode.status = 'node-unvisited';
      currentHTMLNode.className = 'node node-unvisited';
    } else if (currentNode.weight === 15) {
      currentNode.status = 'node-unvisited';
      currentHTMLNode.className = 'node node-unvisited weight';
    }
  });
};

export const changeNormalNode = (pathFinderData, currentNode) => {
  const { keyDown, algorithmSelected } = pathFinderData;
  let currentElement = document.getElementById(currentNode.id);
  const relevantStatuses = ['node-start', 'node-end', 'object'];
  const unweightAlgorithms = ['dfs', 'bfs'];
  if (keyDown) {
    if (!relevantStatuses.includes(currentNode.status)) {
      currentElement.className =
        currentNode.status !== 'node-wall'
          ? 'node node-wall'
          : 'node node-unvisited';
      currentNode.status =
        currentElement.className !== 'node node-wall'
          ? 'node-unvisited'
          : 'node-wall';
      currentNode.weight = 0;
    }
  } else if (
    keyDown === 87 &&
    !unweightAlgorithms.includes(algorithmSelected)
  ) {
    if (!relevantStatuses.includes(currentNode.status)) {
      currentElement.className =
        currentNode.weight !== 15 ? 'node node-weight' : 'node node-unvisited';
      currentNode.weight = !currentElement.className.includes('node-weight')
        ? 0
        : 15;
      currentNode.status = 'node-unvisited';
    }
  }
};

export const changeSpecialNode = (pathFinderData, currentNode) => {
  const {
    previouslySwitchedNode,
    setPreviouslySwitchedNode,
    setPreviouslySwitchedNodeWeight,
    previouslySwitchedNodeWeight,
  } = pathFinderData;
  let currentElement = document.getElementById(currentNode.id);
  let previousElement = null;
  if (previouslySwitchedNode)
    previousElement = document.getElementById(previouslySwitchedNode.id);
  if (
    currentNode.status !== 'node-end' &&
    currentNode.status !== 'node-start' &&
    currentNode.status !== 'object'
  ) {
    if (previouslySwitchedNode) {
      previouslySwitchedNode.status = previouslyPressedNodeStatus;
      previouslySwitchedNode.className =
        previouslySwitchedNodeWeight === 15
          ? 'node node-weight'
          : previouslyPressedNodeStatus;
      previouslySwitchedNode.weight =
        previouslySwitchedNodeWeight === 15 ? 15 : 0;
      setPreviouslySwitchedNode(null);
      setPreviouslySwitchedNodeWeight(currentNode.weight);
      currentElement.className = `node ${pressedNodeStatus}`;
      currentNode.status = pressedNodeStatus;
      currentNode.weight = 0;
    }
  } else if (currentNode.status !== pressedNodeStatus && !algoDone) {
    previouslySwitchedNode.status = pressedNodeStatus;
    previousElement.className = `node ${pressedNodeStatus}`;
  } else if (currentNode.status === pressedNodeStatus) {
    previouslySwitchedNode = currentNode;
    currentElement.className = `node ${previouslyPressedNodeStatus}`;
    currentNode.status = previouslyPressedNodeStatus;
  }
};

export const resetBoard = (pathFinderData) => {
  const { START_ROW, START_COL, END_ROW, END_COL, setGrid, height, width } =
    pathFinderData;
  const elements = document.querySelectorAll('.node');
  elements.forEach((element) => {
    const id = element.id;
    const rowId = parseInt(id.split('-')[1]);
    const colId = parseInt(id.split('-')[2]);
    const isStart = rowId === START_ROW && colId === START_COL;
    const isEnd = rowId === END_ROW && colId === END_COL;
    element.classList.remove('node-visited');
    element.classList.remove('node-shortest-path');
    element.classList.add('node-unvisited', 'node-unvisited');
    if (isStart) {
      element.classList.add('node-unvisited', 'node-start');
    }
    if (isEnd) {
      element.classList.add('node-unvisited', 'node-end');
    }
  });
  setGrid(getInitialGrid(height, width));
  return;
};
