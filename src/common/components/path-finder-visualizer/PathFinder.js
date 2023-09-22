import React, { useState, useEffect } from 'react';

import Grid from './Grid';
import {
  drawShortestPath,
  addShortestPath,
  drawShortestPathTimeout,
  reset,
} from './Animations';
import { algorithmsData } from './helpers/algorithms';
import { allMazeAndPatterns } from './helpers/mazeAndPatterns';
import { getInitialGrid } from './helpers/grid';
import weightedSearchAlgorithm from './../../../lib/algorithms/path-finders/weighted/weightedAlgorithms';

const PathFinder = () => {
  const [height] = useState(20);
  const [width] = useState(30);
  const [getBoardInitValues] = useState(getInitialGrid(height, width));
  const [start, setStart] = useState(getBoardInitValues.start);
  const [end, setEnd] = useState(getBoardInitValues.end);
  const [object, setObject] = useState(null);
  const [nodes] = useState(getBoardInitValues.nodes);
  const [grid, setGrid] = useState(getBoardInitValues.grid);
  const [buttonsOn, setButtonsOn] = useState(true);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [pressedNodeStatus, setPressedNodeStatus] = useState('normal');
  const [keyDown, setKeyDown] = useState(false);
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
  const [numberOfObjects, setNumberOfObjects] = useState(0);
  const [isObject, setIsObject] = useState(false);
  const [algorithmSelected, setAlgorithmSelected] = useState(null);
  const [mazeAndPatternsSelected, setMazeAndPatternsSelected] = useState('');
  const [previouslySwitchedNode, setPreviouslySwitchedNode] = useState(null);
  const [previouslySwitchedNodeWeight, setPreviouslySwitchedNodeWeight] =
    useState(0);
  const [previouslyPressedNodeStatus, setPreviouslyPressedNodeStatus] =
    useState(null);
  const [algoDone, setAlgoDone] = useState(false);
  const [isVisibleBoard, setIsVisibleBoard] = useState(true);

  // Modify his own states, stay here
  const clearNodeStatuses = () => {
    Object.keys(nodes).forEach((id) => {
      let currentNode = nodes[id];
      currentNode.previousNode = null;
      currentNode.distance = Infinity;
      currentNode.totalDistance = Infinity;
      currentNode.heuristicDistance = null;
      currentNode.storedDirection = currentNode.direction;
      currentNode.direction = null;
      let relevantStatuses = ['node-wall', 'node-start', 'node-end', 'object'];
      if (!relevantStatuses.includes(currentNode.status)) {
        currentNode.status = 'node-unvisited';
      }
    });
  };

  // Modify dom, candidate to move to animations, depend on nodes to animate
  const launchAnimations = (success, type, objectParam) => {
    let nodesToAnimateCopy = objectParam
      ? objectNodesToAnimate.slice(0)
      : nodesToAnimate.slice(0);
    const speedToChangeAnimation = 'fast';
    let speed =
      speedToChangeAnimation === 'fast'
        ? 0
        : speedToChangeAnimation === 'average'
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

  // Orchestator, this logic is like use case, must stay here
  const handleVisualizeAlgorithmBtn = () => {
    if (!algorithmSelected) {
      // TODO: Show popup with message requesting the algorithm selection
      return;
    }
    // Algorithm selected, call to renderAlgorithm function
    // 1st clear the actual board
    clearPath('clickedBtn');

    // 2st call to toggleButtons feature flag on
    // toggleButtons();
    const weightedAlgorithmsNames = algorithmsData['weighted'].map(
      (algo) => algo.value
    );
    const unweightedAlgorithmsNames = algorithmsData['unweighted'].map(
      (algo) => algo.name
    );
    if (weightedAlgorithmsNames.includes(algorithmSelected)) {
      // Call to weighted algorithm
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
            launchAnimations(success, 'weighted', false);
          }, 250);
        }, 500);
      } else {
        setIsObject(true);
        const success = weightedSearchAlgorithm(
          nodes,
          start,
          end,
          nodesToAnimate,
          grid,
          algorithmSelected
        );
        launchAnimations(success, 'weighted', 'object');
      }
      // visualize nodes
    } else if (unweightedAlgorithmsNames.includes(algorithmSelected)) {
      // Call to unweighted algorithm
      // visualize nodes
      //unweightedSearchAlgorithm(nodes, start, end, nodesToAnimate, grid, algorithmSelected)
    }
    setAlgoDone(true);
  };

  // View when is called to analyze if need to move or erase
  const launchInstantAnimations = (
    success,
    type,
    object,
    algorithm,
    heuristic
  ) => {
    let nodes = object
      ? objectNodesToAnimate.slice(0)
      : nodesToAnimate.slice(0);
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

  // Modify dom, should be moved to animations
  const clearPath = (clickedButton) => {
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
        document.getElementById(objectNode.id).className =
          'node node-unvisited';
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

  // Orchestator must stay here
  const instantAlgorithm = () => {
    let weightedAlgorithms = Object.keys(algorithmsData.weighted).map(
      (algoType) => algorithmsData[algoType].map((alg) => alg.name)
    );
    let unweightedAlgorithms = Object.keys(algorithmsData.unweighted).map(
      (algoType) => algorithmsData[algoType].map((alg) => alg.name)
    );
    let success;
    if (algorithmSelected === 'astar') {
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
        launchInstantAnimations(success, 'weighted');
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
        launchInstantAnimations(
          success,
          'weighted',
          'object',
          algorithmSelected
        );
      }
      algoDone = true;
    }
    if (weightedAlgorithms.includes(algorithmSelected)) {
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
        launchInstantAnimations(success, 'weighted');
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
        launchInstantAnimations(
          success,
          'weighted',
          'object',
          algorithmSelected,
          currentHeuristic
        );
      }
      setAlgoDone(true);
    } else if (unweightedAlgorithms.includes(algorithmSelected)) {
      if (!numberOfObjects) {
        success = unweightedSearchAlgorithm(
          nodes,
          start,
          end,
          nodesToAnimate,
          grid,
          algorithmSelected
        );
        launchInstantAnimations(success, 'unweighted');
      } else {
        setIsObject(true);
        success = unweightedSearchAlgorithm(
          nodes,
          start,
          object,
          objectNodesToAnimate,
          grid,
          algorithmSelected
        );
        launchInstantAnimations(
          success,
          'unweighted',
          'object',
          algorithmSelected
        );
      }
      setAlgoDone(true);
    }
  };

  // orchestator must stay here
  const redoAlgorithm = () => {
    clearPath();
    instantAlgorithm();
  };

  // Modify DOM move to animations, has keydown like dependency
  const changeNormalNode = (currentNode) => {
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
          currentNode.weight !== 15
            ? 'node node-weight'
            : 'node node-unvisited';
        currentNode.weight = !currentElement.className.includes('node-weight')
          ? 0
          : 15;
        currentNode.status = 'node-unvisited';
      }
    }
  };

  // Modify DOM move to animations, has keydown like dependency
  const changeSpecialNode = (currentNode) => {
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

  // orchestator must be here
  const handleMouseDown = (nodeId) => {
    if (buttonsOn) {
      setMouseDown(true);
      const currentNode = getNode(nodeId);
      if (
        currentNode.status === 'node-start' ||
        currentNode.status === 'node-end' ||
        currentNode.status === 'object'
      ) {
        setPressedNodeStatus(currentNode.status);
      } else {
        setPressedNodeStatus('normal');
        changeNormalNode(currentNode);
      }
    }
    setKeyDown(!keyDown);
  };

  // orchestator must be here
  const handleMouseUp = (nodeId) => {
    if (buttonsOn) {
      setMouseDown(false);
      if (pressedNodeStatus === 'node-end') {
        setEnd(nodeId);
      } else if (pressedNodeStatus === 'node-start') {
        setStart(nodeId);
      } else if (pressedNodeStatus === 'object') {
        setObject(nodeId);
      }
      setPressedNodeStatus('normal');
    }
  };

  // orchestator must be here
  const handleMouseEnter = (nodeId) => {
    if (buttonsOn) {
      const currentNode = getNode(nodeId);
      if (keyDown && pressedNodeStatus !== 'normal') {
        changeSpecialNode(currentNode);
        if (pressedNodeStatus === 'node-end') {
          setEnd(nodeId);
          if (algoDone) {
            redoAlgorithm();
          }
        } else if (pressedNodeStatus === 'node-start') {
          setStart(nodeId);
          if (algoDone) {
            redoAlgorithm();
          }
        } else if (pressedNodeStatus === 'object') {
          setObject(nodeId);
          if (algoDone) {
            redoAlgorithm();
          }
        }
      } else if (keyDown) {
        changeNormalNode(currentNode);
      }
    }
  };

  // orchestator must be here
  const handleMouseLeave = (nodeId) => {
    if (buttonsOn) {
      if (mouseDown && pressedNodeStatus !== 'normal') {
        const currentNode = getNode(nodeId);
        changeSpecialNode(currentNode);
      }
    }
  };

  // move to animations, moddify dom
  const resetBoard = () => {
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

  // stay here
  const onChangeAlgorithm = (algSelected) => {
    setAlgorithmSelected(algSelected);
  };

  // stay here
  const onChangeMazeAndPatterns = (mazeSelected) => {
    setMazeAndPatternsSelected(mazeSelected);
  };

  // stay here
  const getNode = (nodeId) => {
    const [row, column] = nodeId.split('-');
    return grid[row][column];
  };

  // stay here
  const renderBoard = () => {
    if (isVisibleBoard) {
      return (
        <Grid
          grid={grid}
          mouseIsPressed={mouseIsPressed}
          handleMouseEnter={handleMouseEnter}
          handleMouseDown={handleMouseDown}
          handleMouseUp={handleMouseUp}
          handleMouseLeave={handleMouseLeave}
        ></Grid>
      );
    }
    // TODO: Change by a loader animation
    return <div>Loading...</div>;
  };

  useEffect(() => {}, [
    algorithmSelected,
    mazeAndPatternsSelected,
    isVisibleBoard,
  ]);

  const allAlgorithmsComboBoxData = [];
  Object.keys(algorithmsData).forEach((algorithmType) => {
    const algorithmSelecteds = algorithmsData[algorithmType];
    algorithmSelecteds.map((algorithmData) => {
      allAlgorithmsComboBoxData.push(algorithmData);
    });
  });

  return (
    <>
      <div
        style={{ textAlign: 'center', padding: '50px' }}
        className='post-single-wrapper axil-section-gap bg-color-white'
      >
        <div className='container'>
          <div className='row'>
            <div className='mainmenu-wrapper d-xl-block'>
              <nav className='mainmenu-nav'>
                <ul className='mainmenu'>
                  <li className='menu-item-has-children'>
                    <select
                      name='select_algorithm'
                      className='select_algorithm'
                      onChange={(e) => onChangeAlgorithm(e.target.value)}
                      tabIndex={-1}
                      aria-hidden='true'
                      style={{ color: 'white' }}
                      defaultValue='Algorithm'
                    >
                      <option value='Algorithm'>Algorithm</option>
                      {allAlgorithmsComboBoxData.map((algoData) => {
                        const { id, value, name } = algoData;
                        return (
                          <option
                            key={id}
                            value={value}
                            style={{ color: 'black' }}
                          >
                            {name}
                          </option>
                        );
                      })}
                    </select>
                  </li>
                  <li>
                    <button
                      type='submit'
                      className='btn btn-primary'
                      onClick={() => handleVisualizeAlgorithmBtn()}
                    >
                      Visualize algorithm{' '}
                      <i
                        className='fal fa-search'
                        style={{ marginLeft: '3px', fontWeight: 'bold' }}
                      />
                    </button>
                  </li>
                </ul>
                <br />
                <ul className='mainmenu'>
                  <li className='menu-item-has-children'>
                    <select
                      name='select_algorithm'
                      className='select_algorithm'
                      onChange={(e) => onChangeMazeAndPatterns(e.end.value)}
                      tabIndex={-1}
                      aria-hidden='true'
                      style={{ color: 'white' }}
                      defaultValue='Maze & patterns'
                    >
                      <option value='Maze & patterns'>Maze & patterns</option>
                      {allMazeAndPatterns.map((maze) => {
                        const { id, name, value } = maze;
                        return (
                          <option
                            key={id}
                            value={value}
                            style={{ color: 'black' }}
                          >
                            {name}
                          </option>
                        );
                      })}
                    </select>
                  </li>
                  <li>
                    <button
                      type='submit'
                      className='btn btn-info'
                      onClick={() => resetBoard()}
                      style={{ color: 'white' }}
                    >
                      Reset board{' '}
                      <i
                        className='fal fa-trash-restore'
                        style={{ marginLeft: '3px', fontWeight: 'bold' }}
                      />
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        {renderBoard()}
      </div>
    </>
  );
};

export default PathFinder;
