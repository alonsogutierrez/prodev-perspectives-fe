import { astartAlgorithm } from './astart';
import { dijkstra } from './dijkstra';

const weightedSearchAlgorithm = (
  nodes,
  start,
  end,
  nodesToAnimate,
  grid,
  name
) => {
  if (name === 'astart') {
    return astartAlgorithm(nodes, start, end, nodesToAnimate, grid);
  } else if (name === 'dijkstra') {
    return dijkstra(nodes, start, end, nodesToAnimate, grid);
  }
  return;
};

export default weightedSearchAlgorithm;
