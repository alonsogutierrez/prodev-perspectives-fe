import React, { useState, useEffect } from 'react';

import Node from './node/node';
import {
  dijkstra,
  getNodesInShortestPathOrder,
} from '../../../lib/algorithms/dijkstra';

const START_ROW = 5;
const START_COL = 10;
const END_ROW = 8;
const END_COL = 17;

const createNode = (row, column) => {
  return {
    row,
    column,
    isStart: row === START_ROW && column === START_COL,
    isEnd: row === END_ROW && column === END_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

// TODO: Depending os screen size, we should define the height and weight of board
const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 30; row++) {
    const currentRow = [];
    for (let column = 0; column < 30; column++) {
      currentRow.push(createNode(row, column));
    }
    grid.push(currentRow);
  }
  return grid;
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
  for (let i = 0; i <= visitedNodesInOrder.length; i++) {
    if (i === visitedNodesInOrder.length) {
      setTimeout(() => {
        animateShortestPath(nodesInShortestPathOrder);
      }, 10 * i);
      return;
    }
    setTimeout(() => {
      const node = visitedNodesInOrder[i];
      // Mark node as visited
      document.getElementById(`node-${node.row}-${node.column}`).className =
        'node node-visited';
    }, 10 * i);
  }
};

const animateShortestPath = (nodesInShortestPathOrder) => {
  for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
    setTimeout(() => {
      const node = nodesInShortestPathOrder[i];
      // Mark node as part in the shortest path
      document.getElementById(`node-${node.row}-${node.column}`).className =
        'node node-shortest-path';
    }, 50 * i);
  }
};

const PathFinder = () => {
  const [grid, setGrid] = useState(getInitialGrid());
  const [mouseIsPressed, setMouseIsPressed] = useState(false);

  const visualizeDijkstra = () => {
    const startNode = grid[START_ROW][START_COL];
    const finishNode = grid[END_ROW][END_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  const handleMouseDown = (row, col) => {
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
    setMouseIsPressed(true);
  };

  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };

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
      element.classList.add('node', 'node');
      if (isStart) {
        element.classList.add('node', 'node-start');
      }
      if (isEnd) {
        element.classList.add('node', 'node-end');
      }
    });
    setGrid(getInitialGrid());
    return;
  };

  useEffect(() => {}, [grid]);

  return (
    <>
      <div className='post-single-wrapper axil-section-gap bg-color-white'>
        <div className='container'>
          <div className='row'>
            <div className='mainmenu-wrapper d-none d-xl-block'>
              <nav className='mainmenu-nav'>
                <ul className='mainmenu'>
                  <li className='menu-item-has-children'>
                    <p>Select algorithm: Dijkstra</p>
                  </li>
                  <li className='menu-item-has-children'>
                    <button
                      type='submit'
                      className='search-button'
                      onClick={() => visualizeDijkstra()}
                      style={{ color: 'white' }}
                    >
                      Visualize algorithm <i className='fal fa-search' />
                    </button>
                  </li>
                  <li className='menu-item-has-children'>
                    <button
                      type='submit'
                      className='search-button'
                      onClick={() => resetBoard()}
                      style={{ color: 'white' }}
                    >
                      Reset board <i className='fal fa-trash-restore' />
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <div className='grid'>
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx} style={{ marginBottom: '-8px' }}>
                {row.map((node, nodeIdx) => {
                  const { row, column, isEnd, isStart, isWall } = node;
                  return (
                    <Node
                      key={nodeIdx}
                      row={row}
                      col={column}
                      isEnd={isEnd}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => handleMouseDown(row, col)}
                      onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                      onMouseUp={() => handleMouseUp()}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default PathFinder;
