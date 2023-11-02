const createNode = (id, status) => {
  return {
    id: id,
    status: status,
    isWall: false,
    previousNode: null,
    path: null,
    direction: null,
    storedDirection: null,
    distance: Infinity,
    totalDistance: Infinity,
    heuristicDistance: null,
    weight: 0,
    relatesToObject: false,
    overwriteObjectRelation: false,
    otherid: id,
    otherstatus: status,
    otherpreviousNode: null,
    otherpath: null,
    otherdirection: null,
    otherstoredDirection: null,
    otherdistance: Infinity,
    otherweight: 0,
    otherrelatesToObject: false,
    otheroverwriteObjectRelation: false,
  };
};

export const getInitialGrid = (totalRows, totalColumns, startNode, endNode) => {
  const grid = [];
  let start = startNode;
  let end = endNode;
  let nodes = {};
  const [startNodeRow, startNodeCol] = startNode.split('-');
  const [endNodeRow, endNodeCol] = endNode.split('-');
  for (let row = 0; row < totalRows; row++) {
    const currentRow = [];
    for (let column = 0; column < totalColumns; column++) {
      let newNodeId = `${row}-${column}`;
      let status = '';
      if (row === parseInt(startNodeRow) && column === parseInt(startNodeCol)) {
        status = 'node-start';
      } else if (
        row === parseInt(endNodeRow) &&
        column === parseInt(endNodeCol)
      ) {
        status = 'node-end';
      } else {
        status = 'node-unvisited';
      }
      const newNode = createNode(newNodeId, status);
      currentRow.push(newNode);
      nodes = { ...nodes, [newNodeId]: newNode };
    }
    grid.push(currentRow);
  }
  return { grid, nodes, start, end };
};
