import React from 'react';

const Node = ({
  nodeId,
  status,
  isWall,
  handleMouseEnter,
  handleMouseDown,
  handleMouseUp,
  handleMouseLeave,
}) => {
  let extraClassName = status ? `node ${status}` : 'node node-unvisited';
  if (isWall) {
    extraClassName = 'node node-wall';
  }
  return (
    <div
      id={nodeId}
      className={extraClassName}
      onMouseEnter={() => (handleMouseEnter ? handleMouseEnter(nodeId) : null)}
      onMouseDown={() => (handleMouseDown ? handleMouseDown(nodeId) : null)}
      onMouseUp={() => (handleMouseUp ? handleMouseUp(nodeId) : null)}
      onMouseLeave={() => (handleMouseLeave ? handleMouseLeave(nodeId) : null)}
    />
  );
};

export default Node;
