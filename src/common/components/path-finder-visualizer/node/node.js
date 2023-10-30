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
      onMouseEnter={() => handleMouseEnter(nodeId)}
      onMouseDown={() => handleMouseDown(nodeId)}
      onMouseUp={() => handleMouseUp(nodeId)}
      onMouseLeave={() => handleMouseLeave(nodeId)}
    />
  );
};

export default Node;
