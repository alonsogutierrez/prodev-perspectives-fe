import React from 'react';

const Node = ({ row, col, isEnd, isStart }) => {
  const extraClassName = isEnd ? 'node-end' : isStart ? 'node-start' : 'node';
  return (
    <div id={`node-${row}-${col}`} className={`node ${extraClassName}`}></div>
  );
};

export default Node;
