import { DataSet } from 'vis-data/peer';
import { Network } from 'vis-network/peer';
import { Connection } from '../types/types';

export const createNodes = (connections: Connection[]) => {
  const nodes = new DataSet<{ id: string; label: string }>();
  const uniqueNodes = new Set<string>();
  connections.forEach((connection) => {
    uniqueNodes.add(connection.from);
    uniqueNodes.add(connection.to);
  });
  uniqueNodes.forEach((nodeName) => {
    nodes.add({ id: nodeName, label: nodeName });
  });
  return nodes;
};

export const createEdges = (connections: Connection[]) => {
  const edges = new DataSet<{ id?: undefined, from: string; to: string }>();
  connections.forEach((connection) => {
    edges.add({ from: connection.from, to: connection.to });
  });
  return edges;
};

export const createOptions = () => {
  return {
    layout: {
      hierarchical: false
    },
    edges: {
      smooth: {
        enabled: true,
        type: 'dynamic',
        forceDirection: 'none',
        roundness: 0.5
      },
      color: {
        color: '#848484',
        highlight: '#ff0000',
        hover: '#848484',
        opacity: 1.0
      }
    },
    physics: {
      hierarchicalRepulsion: {
        nodeDistance: 150,
        centralGravity: 0.0,
        springLength: 200,
        springConstant: 1.05,
        damping: 0.9
      }
    },
    height: "700px"
  };
};

export const cleanupNetwork = (network: Network) => {
  network.destroy();
};