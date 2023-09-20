import React from 'react';

const Node = ({ id, status, isWall, onMouseDown, onMouseEnter, onMouseUp }) => {
  const idNode = id;
  let extraClassName = `node ${status}`;
  if (isWall) {
    extraClassName = 'node node-wall';
  }
  return (
    <div
      id={idNode}
      className={extraClassName}
      onMouseDown={() => onMouseDown(id)}
      onMouseEnter={() => onMouseEnter(id)}
      onMouseUp={() => onMouseUp()}
    />
  );
};

export default Node;
