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

export const getInitialGrid = (totalRows, totalColumns) => {
  const grid = [];
  let start = '';
  let end = '';
  let nodes = {};
  for (let row = 0; row < totalRows; row++) {
    const currentRow = [];
    for (let column = 0; column < totalColumns; column++) {
      let newNodeId = `${row}-${column}`;
      let status = '';
      let heightDividedByTwo = Math.floor(totalRows / 2);
      if (
        row === heightDividedByTwo &&
        column === Math.floor(totalColumns / 4)
      ) {
        status = 'node-start';
        start = newNodeId;
      } else if (
        row === heightDividedByTwo &&
        column === Math.floor((3 * totalColumns) / 4)
      ) {
        status = 'node-end';
        end = newNodeId;
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
