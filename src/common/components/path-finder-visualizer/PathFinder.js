import React, { useState, useEffect } from 'react';

import Grid from './Grid';
import {
  launchAnimations,
  launchInstantAnimations,
  clearPath,
  changeNormalNode,
  changeSpecialNode,
} from './Animations';
import { algorithmsData } from './helpers/algorithms';
import { allMazeAndPatterns } from './helpers/mazeAndPatterns';
import { getInitialGrid } from './helpers/grid';
import weightedSearchAlgorithm from './../../../lib/algorithms/path-finders/weighted/weightedAlgorithms';
import Nav from './Nav';
import Legends from './Legends';

const allVelocities = [
  {
    id: 1,
    value: 'fast',
    name: 'Fast',
  },
  {
    id: 2,
    value: 'average',
    name: 'Average',
  },
  {
    id: 3,
    value: 'slow',
    name: 'Slow',
  },
];

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
  const [algorithmSelected, setAlgorithmSelected] = useState('dijkstra');
  const [mazeAndPatternsSelected, setMazeAndPatternsSelected] = useState('');
  const [velocitySelected, setVelocitySelected] = useState('fast');
  const [previouslySwitchedNode, setPreviouslySwitchedNode] = useState(null);
  const [previouslySwitchedNodeWeight, setPreviouslySwitchedNodeWeight] =
    useState(0);
  const [previouslyPressedNodeStatus, setPreviouslyPressedNodeStatus] =
    useState(null);
  const [algoDone, setAlgoDone] = useState(false);
  const [isVisibleBoard, setIsVisibleBoard] = useState(true);

  const getNode = (nodeId) => {
    const [row, column] = nodeId.split('-');
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
      let relevantStatuses = ['node-wall', 'node-start', 'node-end', 'object'];
      if (!relevantStatuses.includes(currentNode.status)) {
        currentNode.status = 'node-unvisited';
      }
    });
  };

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
        launchInstantAnimations(pathFinderData, success, 'weighted');
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
        launchInstantAnimations(pathFinderData, success, 'weighted');
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
        launchInstantAnimations(pathFinderData, success, 'unweighted');
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
          'unweighted',
          'object',
          algorithmSelected
        );
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
    // Algorithm selected, call to renderAlgorithm function
    // 1st clear the actual board
    const pathFinderData = {
      nodes,
      start,
      end,
      numberOfObjects,
      object,
      setAlgoDone,
    };
    clearPath(pathFinderData, 'clickedBtn');

    // 2st call to toggleButtons feature flag on
    toggleButtons();
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
            };
            launchAnimations(pathFinderData, success, 'weighted', false);
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
        };
        launchAnimations(pathFinderData, success, 'weighted', 'object');
      }
      // visualize nodes
    } else if (unweightedAlgorithmsNames.includes(algorithmSelected)) {
      // Call to unweighted algorithm
      // visualize nodes
      //unweightedSearchAlgorithm(nodes, start, end, nodesToAnimate, grid, algorithmSelected)
    }
    setAlgoDone(true);
  };

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
        const pathFinderData = {
          keyDown,
          algorithmSelected,
        };
        changeNormalNode(pathFinderData, currentNode);
      }
    }
    setKeyDown(!keyDown);
  };

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

  const handleMouseEnter = (nodeId) => {
    if (buttonsOn) {
      const currentNode = getNode(nodeId);
      if (keyDown && pressedNodeStatus !== 'normal') {
        const pathFinderData = {
          previouslySwitchedNode,
          setPreviouslySwitchedNode,
          setPreviouslySwitchedNodeWeight,
          previouslySwitchedNodeWeight,
        };
        changeSpecialNode(pathFinderData, currentNode);
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
        const pathFinderData = {
          keyDown,
          algorithmSelected,
        };
        changeNormalNode(pathFinderData, currentNode);
      }
    }
  };

  const handleMouseLeave = (nodeId) => {
    if (buttonsOn) {
      if (mouseDown && pressedNodeStatus !== 'normal') {
        const currentNode = getNode(nodeId);
        const pathFinderData = {
          previouslySwitchedNode,
          setPreviouslySwitchedNode,
          setPreviouslySwitchedNodeWeight,
          previouslySwitchedNodeWeight,
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

  const toggleButtons = () => {
    console.log('calling to toggle buttons method');
    return;
  };

  useEffect(() => {}, [
    algorithmSelected,
    mazeAndPatternsSelected,
    isVisibleBoard,
  ]);

  return (
    <>
      <div
        style={{ textAlign: 'center', padding: '50px' }}
        className='post-single-wrapper axil-section-gap bg-color-white'
      >
        <Nav
          onChangeAlgorithm={onChangeAlgorithm}
          algorithmsData={algorithmsData}
          handleVisualizeAlgorithmBtn={handleVisualizeAlgorithmBtn}
          onChangeMazeAndPatterns={onChangeMazeAndPatterns}
          allMazeAndPatterns={allMazeAndPatterns}
          onChangeVelocity={onChangeVelocity}
          velocitySelected={velocitySelected}
          allVelocities={allVelocities}
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
