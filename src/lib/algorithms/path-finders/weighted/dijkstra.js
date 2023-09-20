// Performs Dijkstra's algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.
export const dijkstra = (nodes, start, end, nodesToAnimate, grid) => {
  if (!start || !end || start === end) {
    return false;
  }
  nodes[start].distance = 0;
  nodes[start].direction = 'right';
  let unvisitedNodes = Object.keys(nodes);
  while (unvisitedNodes.length) {
    let currentNode = closestNode(nodes, unvisitedNodes);
    while (currentNode.status === 'node-wall' && unvisitedNodes.length) {
      currentNode = closestNode(nodes, unvisitedNodes);
    }
    if (currentNode.distance === Infinity) {
      return false;
    }
    // This means that current node is the optimal node to visit
    nodesToAnimate.push(currentNode);
    currentNode.status = 'node-visited';
    if (currentNode.id === end) return 'success!';
    updateUnvisitedNeighbors(nodes, currentNode, grid);
  }
};

const closestNode = (nodes, unvisitedNodes) => {
  let currentClosest, index;
  for (let i = 0; i < unvisitedNodes.length; i++) {
    if (
      !currentClosest ||
      currentClosest.distance > nodes[unvisitedNodes[i]].distance
    ) {
      currentClosest = nodes[unvisitedNodes[i]];
      index = i;
    }
  }
  // Delete current closest from unvisited nodes
  unvisitedNodes.splice(index, 1);
  return currentClosest;
};

const updateUnvisitedNeighbors = (nodes, currentNode, grid) => {
  const unvisitedNeighbors = getUnvisitedNeighbors(currentNode.id, nodes, grid);
  for (const neighbor of unvisitedNeighbors) {
    updateNode(currentNode, nodes[neighbor]);
  }
};

const getUnvisitedNeighbors = (currentNodeId, nodes, grid) => {
  let coordinates = currentNodeId.split('-');
  let x = parseInt(coordinates[0]);
  let y = parseInt(coordinates[1]);
  const neighbors = [];
  let potentialNeighbor;
  // look up
  if (grid[x - 1] && grid[x - 1][y]) {
    potentialNeighbor = `${(x - 1).toString()}-${y.toString()}`;
    if (nodes[potentialNeighbor].status !== 'node-wall')
      neighbors.push(potentialNeighbor);
  }
  // look down
  if (grid[x + 1] && grid[x + 1][y]) {
    potentialNeighbor = `${(x + 1).toString()}-${y.toString()}`;
    if (nodes[potentialNeighbor].status !== 'node-wall')
      neighbors.push(potentialNeighbor);
  }
  // look left
  if (grid[x][y - 1]) {
    potentialNeighbor = `${x.toString()}-${(y - 1).toString()}`;
    if (nodes[potentialNeighbor].status !== 'node-wall')
      neighbors.push(potentialNeighbor);
  }
  // look right
  if (grid[x][y + 1]) {
    potentialNeighbor = `${x.toString()}-${(y + 1).toString()}`;
    if (nodes[potentialNeighbor].status !== 'node-wall')
      neighbors.push(potentialNeighbor);
  }
  return neighbors;
};

const updateNode = (currentNode, targetNode) => {
  let distance = getDistance(currentNode, targetNode);
  let distanceToCompare =
    currentNode.distance + targetNode.weight + distance[0];
  if (distanceToCompare < targetNode.distance) {
    targetNode.distance = distanceToCompare;
    targetNode.previousNode = currentNode.id;
    targetNode.path = distance[1];
    targetNode.direction = distance[2];
  }
};

const getDistance = (nodeOne, nodeTwo) => {
  let currentCoordinates = nodeOne.id.split('-');
  let targetCoordinates = nodeTwo.id.split('-');
  let x1 = parseInt(currentCoordinates[0]);
  let y1 = parseInt(currentCoordinates[1]);
  let x2 = parseInt(targetCoordinates[0]);
  let y2 = parseInt(targetCoordinates[1]);
  if (x2 < x1) {
    if (nodeOne.direction === 'up') {
      return [1, ['f'], 'up'];
    } else if (nodeOne.direction === 'right') {
      return [2, ['l', 'f'], 'up'];
    } else if (nodeOne.direction === 'left') {
      return [2, ['r', 'f'], 'up'];
    } else if (nodeOne.direction === 'down') {
      return [3, ['r', 'r', 'f'], 'up'];
    }
  } else if (x2 > x1) {
    if (nodeOne.direction === 'up') {
      return [3, ['r', 'r', 'f'], 'down'];
    } else if (nodeOne.direction === 'right') {
      return [2, ['r', 'f'], 'down'];
    } else if (nodeOne.direction === 'left') {
      return [2, ['l', 'f'], 'down'];
    } else if (nodeOne.direction === 'down') {
      return [1, ['f'], 'down'];
    }
  }
  if (y2 < y1) {
    if (nodeOne.direction === 'up') {
      return [2, ['l', 'f'], 'left'];
    } else if (nodeOne.direction === 'right') {
      return [3, ['l', 'l', 'f'], 'left'];
    } else if (nodeOne.direction === 'left') {
      return [1, ['f'], 'left'];
    } else if (nodeOne.direction === 'down') {
      return [2, ['r', 'f'], 'left'];
    }
  } else if (y2 > y1) {
    if (nodeOne.direction === 'up') {
      return [2, ['r', 'f'], 'right'];
    } else if (nodeOne.direction === 'right') {
      return [1, ['f'], 'right'];
    } else if (nodeOne.direction === 'left') {
      return [3, ['r', 'r', 'f'], 'right'];
    } else if (nodeOne.direction === 'down') {
      return [2, ['l', 'f'], 'right'];
    }
  }
};
