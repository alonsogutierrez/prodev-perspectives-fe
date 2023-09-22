export const drawShortestPath = (
  nodes,
  setObjectShortestPathNodesToAnimate,
  endNodeId,
  startNodeId,
  object
) => {
  let currentNode;
  currentNode = nodes[nodes[endNodeId].previousNode];
  if (object) {
    while (currentNode.id !== startNodeId) {
      setObjectShortestPathNodesToAnimate(
        (objectShortestPathNodesToAnimate) => [
          currentNode,
          ...objectShortestPathNodesToAnimate,
        ]
      );
      currentNode = nodes[currentNode.previousNode];
    }
    return;
  }
  while (currentNode.id !== startNodeId) {
    setObjectShortestPathNodesToAnimate((objectShortestPathNodesToAnimate) => [
      currentNode,
      ...objectShortestPathNodesToAnimate,
    ]);
    document.getElementById(
      currentNode.id
    ).className = `node node-shortest-path`;
    currentNode = nodes[currentNode.previousNode];
  }
  return;
};

export const addShortestPath = (
  nodes,
  setObjectShortestPathNodesToAnimate,
  endNodeId,
  startNodeId,
  object
) => {
  let currentNode = nodes[nodes[endNodeId].previousNode];
  if (object) {
    while (currentNode.id !== startNodeId) {
      setObjectShortestPathNodesToAnimate(
        (objectShortestPathNodesToAnimate) => [
          currentNode,
          ...objectShortestPathNodesToAnimate,
        ]
      );
      currentNode.relatesToObject = true;
      currentNode = nodes[currentNode.previousNode];
    }
    return;
  }
  while (currentNode.id !== startNodeId) {
    setObjectShortestPathNodesToAnimate((objectShortestPathNodesToAnimate) => [
      currentNode,
      ...objectShortestPathNodesToAnimate,
    ]);
    currentNode = nodes[currentNode.previousNode];
  }
  return;
};

export const drawShortestPathTimeout = (
  nodes,
  endNodeId,
  startNodeId,
  type
) => {
  let currentNode;
  let currentNodesToAnimate;

  // We are going to iterate from end node until start node
  // iterating with the pointer to the previousNode that has every Node
  currentNode = nodes[nodes[endNodeId].previousNode];
  currentNodesToAnimate = [];
  while (currentNode.id !== startNodeId) {
    // Insert at the beginning of the array
    currentNodesToAnimate.unshift(currentNode);
    // update currentNode var poiting to the previousPrevious node
    currentNode = nodes[currentNode.previousNode];
  }

  const timeout = (index) => {
    if (!currentNodesToAnimate.length)
      currentNodesToAnimate.push(nodes[startNodeId]);
    setTimeout(() => {
      if (index === 0) {
        shortestPathChange(currentNodesToAnimate[index]);
      } else if (index < currentNodesToAnimate.length) {
        shortestPathChange(
          currentNodesToAnimate[index],
          currentNodesToAnimate[index - 1]
        );
      } else if (index === currentNodesToAnimate.length) {
        shortestPathChange(
          nodes[endNodeId],
          currentNodesToAnimate[index - 1],
          'isActualTarget'
        );
      }
      if (index > currentNodesToAnimate.length) {
        // toggleButtons();
        return;
      }
      timeout(index + 1);
    }, 40);
  };

  const shortestPathChange = (currentNode, previousNode, isActualTarget) => {
    if (currentNode === 'object') {
      let element = document.getElementById(object);
      element.className = 'node objectTransparent';
    } else if (currentNode.id !== startNodeId) {
      if (
        currentNode.id !== endNodeId ||
        (currentNode.id === endNodeId && isActualTarget)
      ) {
        let currentHTMLNode = document.getElementById(currentNode.id);
        if (type === 'unweighted') {
          currentHTMLNode.className = 'node shortest-path-unweighted';
        } else {
          let direction;
          if (
            currentNode.relatesToObject &&
            !currentNode.overwriteObjectRelation &&
            currentNode.id !== endNodeId
          ) {
            direction = 'storedDirection';
            currentNode.overwriteObjectRelation = true;
          } else {
            direction = 'direction';
          }
          if (currentNode[direction] === 'up') {
            currentHTMLNode.className = 'node shortest-path-up';
          } else if (currentNode[direction] === 'down') {
            currentHTMLNode.className = 'node shortest-path-down';
          } else if (currentNode[direction] === 'right') {
            currentHTMLNode.className = 'node shortest-path-right';
          } else if (currentNode[direction] === 'left') {
            currentHTMLNode.className = 'node shortest-path-left';
          } else {
            currentHTMLNode.className = 'node shortest-path';
          }
        }
      }
    }
    if (previousNode) {
      if (
        previousNode !== 'object' &&
        previousNode.id !== endNodeId &&
        previousNode.id !== startNodeId
      ) {
        let previousHTMLNode = document.getElementById(previousNode.id);
        previousHTMLNode.className =
          previousNode.weight === 15
            ? 'node shortest-path weight'
            : 'node shortest-path';
      }
    } else {
      let element = document.getElementById(startNodeId);
      element.className = 'node startTransparent';
    }
  };

  timeout(0);
};

export const reset = (nodes, start, end, object, objectNotTransparent) => {
  nodes[start].status = 'node-start';
  document.getElementById(start).className = 'node startTransparent';
  nodes[end].status = 'node-end';
  if (object) {
    nodes[object].status = 'object';
    if (objectNotTransparent) {
      document.getElementById(object).className = 'node visitedObjectNode';
    } else {
      document.getElementById(object).className = 'node objectTransparent';
    }
  }
};
