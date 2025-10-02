import { GoogleGenerativeAI } from '@google/generative-ai';
import { NodeGraph } from '../types';

const genAI = new GoogleGenerativeAI((import.meta as any).env?.VITE_GEMINI_API_KEY || '');

export const generateFromQuantumBox = async (graph: NodeGraph): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `Analyze this quantum box configuration and generate content based on the nodes and connections:

Nodes: ${JSON.stringify(graph.nodes)}
Connections: ${JSON.stringify(graph.connections)}

Please provide a detailed analysis and generated content based on this configuration.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating from quantum box:', error);
    return 'Error generating content from quantum box configuration.';
  }
};

// Other Gemini service functions can be added here
