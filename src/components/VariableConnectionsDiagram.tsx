import React, { useEffect, useRef } from 'react';
import { Network } from 'vis-network/peer';
import { cleanupNetwork, createEdges, createNodes, createOptions } from '../utils/diagramUtils';
import { Connection } from '../types/types';

interface Props {
  connections: Connection[];
}

const VariableConnectionsDiagram: React.FC<Props> = ({ connections }) => {
  const networkRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = networkRef.current;
    if (!container) return;

    const nodes = createNodes(connections);
    const edges = createEdges(connections);

    const data = { nodes, edges };
    const options = createOptions();

    const network = new Network(container, data, options);

    return () => {
      cleanupNetwork(network);
    };
  }, [connections]);

  return <div ref={networkRef} style={{ width: '100%', height: '700px' }}></div>;
};

export default VariableConnectionsDiagram;
