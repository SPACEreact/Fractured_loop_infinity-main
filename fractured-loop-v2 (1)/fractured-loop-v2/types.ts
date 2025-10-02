// Core types for the application

export interface Asset {
  id: string;
  name: string;
  type: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  assets: Asset[];
  tracks?: Track[];
  timelineItems?: TimelineItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Build {
  id: string;
  name: string;
  description: string;
  icon?: string;
}

// Quantum Box types
export interface Node {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: any;
}

export interface Connection {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
}

export interface NodeGraph {
  nodes: Node[];
  connections: Connection[];
}



// Timeline types
export interface Track {
  id: string;
  name: string;
  type: 'video' | 'audio' | 'text';
  items: TimelineItem[];
}

export interface Layer {
  id: string;
  name: string;
  visible: boolean;
  opacity: number;
}

export interface TimelineItem {
  id: string;
  trackId: string;
  startTime: number;
  endTime: number;
  content: any;
  type: string;
}

// Workflow types
export interface Workflow {
  id: string;
  name: string;
  description: string;
  steps: WorkflowStep[];
}

export interface WorkflowStep {
  id: string;
  name: string;
  description: string;
  type: string;
}

export const WORKFLOWS: Workflow[] = [
  // Add default workflows here
];
