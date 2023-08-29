import React from 'react';

const Node = ({
  row,
  col,
  isEnd,
  isStart,
  isWall,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
}) => {
  const extraClassName = isEnd
    ? 'node-end'
    : isStart
    ? 'node-start'
    : isWall
    ? 'node-wall'
    : 'node';
  return (
    <div
      id={`node-${row}-${col}`}
      className={`node ${extraClassName}`}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp()}
    />
  );
};

export default Node;
