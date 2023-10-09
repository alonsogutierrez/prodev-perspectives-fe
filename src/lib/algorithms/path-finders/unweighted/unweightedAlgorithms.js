const unweightedSearchAlgorithm = (
  nodes,
  start,
  end,
  nodesToAnimate,
  grid,
  name
) => {
  if (!start || !end || start === end) {
    return false;
  }
  let structure = [nodes[start]];
  let exploredNodes = { start: true };
  while (structure.length) {
    let currentNode = name === 'bfs' ? structure.shift() : structure.pop();
    nodesToAnimate.push(currentNode);
    if (name === 'dfs') exploredNodes[currentNode.id] = true;
    currentNode.status = 'visited';
    if (currentNode.id === end) {
      return 'success';
    }
    let currentNeighbors = getNeighbors(currentNode.id, nodes, grid, name);
    currentNeighbors.forEach((neighbor) => {
      if (!exploredNodes[neighbor]) {
        if (name === 'bfs') exploredNodes[neighbor] = true;
        nodes[neighbor].previousNode = currentNode.id;
        structure.push(nodes[neighbor]);
      }
    });
  }
  return false;
};

const getNeighbors = (id, nodes, grid, name) => {
  let coordinates = id.split('-');
  let x = parseInt(coordinates[0]);
  let y = parseInt(coordinates[1]);
  let neighbors = [];
  let potentialNeighbor;
  if (grid[x - 1] && grid[x - 1][y]) {
    potentialNeighbor = `${(x - 1).toString()}-${y.toString()}`;
    if (nodes[potentialNeighbor].status !== 'node-wall') {
      if (name === 'bfs') {
        neighbors.push(potentialNeighbor);
      } else {
        neighbors.unshift(potentialNeighbor);
      }
    }
  }
  if (grid[x][y + 1]) {
    potentialNeighbor = `${x.toString()}-${(y + 1).toString()}`;
    if (nodes[potentialNeighbor].status !== 'node-wall') {
      if (name === 'bfs') {
        neighbors.push(potentialNeighbor);
      } else {
        neighbors.unshift(potentialNeighbor);
      }
    }
  }
  if (grid[x + 1] && grid[x + 1][y]) {
    potentialNeighbor = `${(x + 1).toString()}-${y.toString()}`;
    if (nodes[potentialNeighbor].status !== 'node-wall') {
      if (name === 'bfs') {
        neighbors.push(potentialNeighbor);
      } else {
        neighbors.unshift(potentialNeighbor);
      }
    }
  }
  if (grid[x][y - 1]) {
    potentialNeighbor = `${x.toString()}-${(y - 1).toString()}`;
    if (nodes[potentialNeighbor].status !== 'node-wall') {
      if (name === 'bfs') {
        neighbors.push(potentialNeighbor);
      } else {
        neighbors.unshift(potentialNeighbor);
      }
    }
  }
  return neighbors;
};

export default unweightedSearchAlgorithm;
