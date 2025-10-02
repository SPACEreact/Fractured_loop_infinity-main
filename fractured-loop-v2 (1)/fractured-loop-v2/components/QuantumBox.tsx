import React from 'react';
import { Node, Connection, NodeGraph } from '../types';
import { NODE_TEMPLATES, NodeTemplate } from '../constants';
import { generateFromQuantumBox } from '../services/geminiService';

const QuantumBox: React.FC = () => {
  const [nodes, setNodes] = React.useState<Node[]>([]);
  const [connections, setConnections] = React.useState<Connection[]>([]);

  const handleGenerate = async () => {
    const graph: NodeGraph = { nodes, connections };
    const result = await generateFromQuantumBox(graph);
    console.log(result);
  };

  return (
    <div className="quantum-box">
      <div className="nodes-container">
        {nodes.map((node) => (
          <div key={node.id} className="node">
            {node.data.label || node.type}
          </div>
        ))}
      </div>
      <button onClick={handleGenerate}>Generate</button>
    </div>
  );
};

export default QuantumBox;
