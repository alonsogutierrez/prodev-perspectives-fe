export const allMazeAndPatterns = [
  {
    id: 1,
    name: 'Recursive Division',
    value: 'recursiveDivision',
  },
  {
    id: 2,
    name: 'Basic Random Maze',
    value: 'basicRandomMaze',
  },
  {
    id: 3,
    name: 'Recursive Division (horizontal skew)',
    value: 'recurisveDivisionHorizontalS',
  },
];

export const recursiveDivisionMaze = (pathFinderData) => {
  const {
    start,
    end,
    rowStart,
    rowEnd,
    colStart,
    colEnd,
    orientation,
    surroundingWalls,
    type,
    object,
    nodes,
    height,
    width,
    wallsToAnimate,
  } = pathFinderData;
  if (rowEnd < rowStart || colEnd < colStart) {
    return;
  }
  if (!surroundingWalls) {
    let relevantIds = [start, end];
    if (object) relevantIds.push(object);
    Object.keys(nodes).forEach((node) => {
      if (!relevantIds.includes(node)) {
        let r = parseInt(node.split('-')[0]);
        let c = parseInt(node.split('-')[1]);
        if (r === 0 || c === 0 || r === height - 1 || c === width - 1) {
          let currentHTMLNode = document.getElementById(node);
          wallsToAnimate.push(currentHTMLNode);
          if (type === 'wall') {
            nodes[node].status = 'node-wall';
            nodes[node].weight = 0;
          } else if (type === 'weight') {
            nodes[node].status = 'node-unvisited';
            nodes[node].weight = 15;
          }
        }
      }
    });
    surroundingWalls = true;
  }
  if (orientation === 'horizontal') {
    let possibleRows = [];
    for (let number = rowStart; number <= rowEnd; number += 2) {
      possibleRows.push(number);
    }
    let possibleCols = [];
    for (let number = colStart - 1; number <= colEnd + 1; number += 2) {
      possibleCols.push(number);
    }
    let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
    let randomColIndex = Math.floor(Math.random() * possibleCols.length);
    let currentRow = possibleRows[randomRowIndex];
    let colRandom = possibleCols[randomColIndex];
    Object.keys(nodes).forEach((node) => {
      let r = parseInt(node.split('-')[0]);
      let c = parseInt(node.split('-')[1]);
      if (
        r === currentRow &&
        c !== colRandom &&
        c >= colStart - 1 &&
        c <= colEnd + 1
      ) {
        let currentHTMLNode = document.getElementById(node);
        if (
          currentHTMLNode.className !== 'node node-start' &&
          currentHTMLNode.className !== 'node node-end' &&
          currentHTMLNode.className !== 'node object'
        ) {
          wallsToAnimate.push(currentHTMLNode);
          if (type === 'wall') {
            nodes[node].status = 'node-wall';
            nodes[node].weight = 0;
          } else if (type === 'weight') {
            nodes[node].status = 'node-unvisited';
            nodes[node].weight = 15;
          }
        }
      }
    });
    if (currentRow - 2 - rowStart > colEnd - colStart) {
      const pathFinderData = {
        start,
        end,
        rowStart,
        rowEnd: currentRow - 2,
        colStart,
        colEnd,
        orientation,
        surroundingWalls,
        type,
        object,
        nodes,
        height,
        width,
        wallsToAnimate,
      };
      recursiveDivisionMaze(pathFinderData);
    } else {
      const pathFinderData = {
        start,
        end,
        rowStart,
        rowEnd: currentRow - 2,
        colStart,
        colEnd,
        orientation: 'vertical',
        surroundingWalls,
        type,
        object,
        nodes,
        height,
        width,
        wallsToAnimate,
      };
      recursiveDivisionMaze(pathFinderData);
    }
    if (rowEnd - (currentRow + 2) > colEnd - colStart) {
      const pathFinderData = {
        start,
        end,
        rowStart: currentRow + 2,
        rowEnd,
        colStart,
        colEnd,
        orientation,
        surroundingWalls,
        type,
        object,
        nodes,
        height,
        width,
        wallsToAnimate,
      };
      recursiveDivisionMaze(pathFinderData);
    } else {
      const pathFinderData = {
        start,
        end,
        rowStart: currentRow + 2,
        rowEnd,
        colStart,
        colEnd,
        orientation: 'vertical',
        surroundingWalls,
        type,
        object,
        nodes,
        height,
        width,
        wallsToAnimate,
      };
      recursiveDivisionMaze(pathFinderData);
    }
  } else {
    let possibleCols = [];
    for (let number = colStart; number <= colEnd; number += 2) {
      possibleCols.push(number);
    }
    let possibleRows = [];
    for (let number = rowStart - 1; number <= rowEnd + 1; number += 2) {
      possibleRows.push(number);
    }
    let randomColIndex = Math.floor(Math.random() * possibleCols.length);
    let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
    let currentCol = possibleCols[randomColIndex];
    let rowRandom = possibleRows[randomRowIndex];
    Object.keys(nodes).forEach((node) => {
      let r = parseInt(node.split('-')[0]);
      let c = parseInt(node.split('-')[1]);
      if (
        c === currentCol &&
        r !== rowRandom &&
        r >= rowStart - 1 &&
        r <= rowEnd + 1
      ) {
        let currentHTMLNode = document.getElementById(node);
        if (
          currentHTMLNode.className !== 'node node-start' &&
          currentHTMLNode.className !== 'node node-end' &&
          currentHTMLNode.className !== 'node object'
        ) {
          wallsToAnimate.push(currentHTMLNode);
          if (type === 'wall') {
            nodes[node].status = 'node-wall';
            nodes[node].weight = 0;
          } else if (type === 'weight') {
            nodes[node].status = 'node-unvisited';
            nodes[node].weight = 15;
          }
        }
      }
    });
    if (rowEnd - rowStart > currentCol - 2 - colStart) {
      const pathFinderData = {
        start,
        end,
        rowStart,
        rowEnd,
        colStart,
        colEnd: currentCol - 2,
        orientation: 'horizontal',
        surroundingWalls,
        type,
        object,
        nodes,
        height,
        width,
        wallsToAnimate,
      };
      recursiveDivisionMaze(pathFinderData);
    } else {
      const pathFinderData = {
        start,
        end,
        rowStart,
        rowEnd,
        colStart,
        colEnd: currentCol - 2,
        orientation,
        surroundingWalls,
        type,
        object,
        nodes,
        height,
        width,
        wallsToAnimate,
      };
      recursiveDivisionMaze(pathFinderData);
    }
    if (rowEnd - rowStart > colEnd - (currentCol + 2)) {
      const pathFinderData = {
        start,
        end,
        rowStart,
        rowEnd,
        colStart: currentCol + 2,
        colEnd,
        orientation: 'horizontal',
        surroundingWalls,
        type,
        object,
        nodes,
        height,
        width,
        wallsToAnimate,
      };
      recursiveDivisionMaze(pathFinderData);
    } else {
      const pathFinderData = {
        start,
        end,
        rowStart,
        rowEnd,
        colStart: currentCol + 2,
        colEnd,
        orientation,
        surroundingWalls,
        type,
        object,
        nodes,
        height,
        width,
        wallsToAnimate,
      };
      recursiveDivisionMaze(pathFinderData);
    }
  }
};
