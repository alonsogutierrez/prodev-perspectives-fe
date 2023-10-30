import Node from './node/node';

const Grid = (props) => {
  const {
    grid,
    mouseIsPressed,
    handleMouseEnter,
    handleMouseDown,
    handleMouseUp,
    handleMouseLeave,
  } = props;
  return (
    <div id='board' className='grid' style={{ display: 'inline-block' }}>
      {grid.map((row, rowIdx) => {
        return (
          <div key={rowIdx} className='rowGridNodes'>
            {row.map((node, nodeIdx) => {
              const { id, status, isWall } = node;
              return (
                <Node
                  key={nodeIdx}
                  nodeId={id}
                  status={status}
                  isWall={isWall}
                  handleMouseEnter={handleMouseEnter}
                  handleMouseDown={handleMouseDown}
                  handleMouseUp={handleMouseUp}
                  handleMouseLeave={handleMouseLeave}
                ></Node>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Grid;
