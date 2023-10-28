import React from 'react';

const Node = ({
  id,
  status,
  isWall,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
  onMouseLeave,
}) => {
  const idNode = id;
  let extraClassName = `node ${status}`;
  if (isWall) {
    extraClassName = 'node node-wall';
  }
  return (
    <div
      id={idNode}
      className={extraClassName}
      onMouseDown={() => (onMouseDown ? onMouseDown(id) : null)}
      onMouseEnter={() => (onMouseEnter ? onMouseEnter(id) : null)}
      onMouseUp={() => (onMouseUp ? onMouseUp(id) : null)}
      onMouseLeave={() => (onMouseLeave ? onMouseLeave(id) : null)}
    />
  );
};

export default Node;
