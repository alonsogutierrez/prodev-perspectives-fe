import React, { useState } from 'react';

import Node from './node/node';

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
  };
};

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let column = 0; column < 20; column++) {
      currentRow.push(createNode(row, column));
    }
    grid.push(currentRow);
  }
  return grid;
};

const PathFinder = () => {
  const [grid] = useState(getInitialGrid());

  return (
    <div className='grid'>
      {grid.map((row, rowIdx) => {
        return (
          <div key={rowIdx}>
            {row.map((node, nodeIdx) => {
              const { row, column, isEnd, isStart } = node;
              return (
                <Node
                  key={nodeIdx}
                  row={row}
                  col={column}
                  isEnd={isEnd}
                  isStart={isStart}
                ></Node>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default PathFinder;
