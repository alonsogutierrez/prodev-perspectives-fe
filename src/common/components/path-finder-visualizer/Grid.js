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
                  id={id}
                  status={status}
                  isWall={isWall}
                  mouseIsPressed={mouseIsPressed}
                  onMouseEnter={(nodeId) => handleMouseEnter(nodeId)}
                  onMouseDown={(nodeId) => handleMouseDown(nodeId)}
                  onMouseUp={() => handleMouseUp()}
                  onMouseLeave={() => handleMouseLeave()}
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
