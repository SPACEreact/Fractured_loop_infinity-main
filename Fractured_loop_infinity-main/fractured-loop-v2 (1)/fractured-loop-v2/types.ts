// Fractured Loop Asset Types
export interface Asset {
  id: string;
  seedId: string; // Core lineage identifier (e.g., "A", "A.1", "A.1.3")
  type: 'primary' | 'secondary' | 'tertiary' | 'master_story' | 'master_image' | 'master_video' | 'shot';
  name: string;
  content: string;
  tags: string[];
  createdAt: Date;
  summary: string;
  metadata?: Record<string, any>;
  questions?: Question[]; // For guided build assets
  chatContext?: Message[]; // All Q&A with user
  userSelections?: Record<string, any>; // Dropdowns, toggles
  outputs?: string[]; // Generated drafts, prompts
  isMaster?: boolean; // Flag for master assets
  lineage?: string[]; // Array of asset IDs that contributed to this asset
}

// Timeline Block Interface
export interface TimelineBlock {
  id: string;
  assetId: string;
  position: number; // Position in timeline sequence
  isExpanded: boolean; // Whether block is expanded to chat
  createdAt: Date;
}

// Primary Timeline (Ideation Loop)
export interface PrimaryTimeline {
  blocks: TimelineBlock[];
  outputDraft?: string; // Generated draft from Output Node
}

// Secondary Timeline (Production Loop)
export interface SecondaryTimeline {
  masterAssets: Asset[]; // Locked master assets
  shotLists: ShotList[]; // Generated shot lists
  appliedStyles?: Record<string, string>; // Style applications across shots
}

export interface ShotList {
  id: string;
  masterAssetId: string; // Reference to story master
  shots: Asset[]; // Individual shot assets
  createdAt: Date;
}

export interface Project {
  id: string;
  name: string;
  assets: Asset[];
  primaryTimeline: PrimaryTimeline;
  secondaryTimeline?: SecondaryTimeline; // Appears after first master asset
  createdAt: Date;
  updatedAt: Date;
  targetModel?: string; // Target AI model for generation (MidJourney, Sora, etc.)
}

// Enhanced Guided Build Types
export interface Question {
  id: string;
  text: string;
  type: 'text' | 'option' | 'dropdown';
  options?: string[];
  optionsKey?: string; // Key to lookup options from FIELD_OPTIONS
  required?: boolean;
}

export interface Build {
  id: string;
  name: string;
  description: string;
  questions: Question[];
  targetAssetType: Asset['type'];
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  builds: Build[];
}

// Chat and AI Types
export enum ChatRole {
  USER = 'USER',
  MODEL = 'MODEL'
}

export interface Message {
  role: ChatRole;
  content: string;
}

// Build Context for Iterative Workflows
export interface BuildContext {
  [key: string]: {
    seeds: Seed[];
    currentStep?: number;
    answers?: Record<string, string>;
  };
}

export interface Seed {
  id: string;
  content: string;
  tags: string[];
  createdAt: Date;
  sourceBuild: string;
  summary: string;
}

// Legacy types for backward compatibility (to be removed after transition)
export interface CanvasNode {
  id: string;
  position: { x: number; y: number };
  size: number;
  assetId: string;
  name: string;
  description: string;
}

export interface CanvasConnection {
  id: string;
  from: string;
  to: string;
  type: 'harmony' | 'tension';
  harmonyLevel: number;
}

export interface CanvasState {
  nodes: CanvasNode[];
  connections: CanvasConnection[];
}

// Quantum Box Types
export interface Node {
  id: string;
  position: { x: number; y: number };
  data: any;
}

export interface Connection {
  id: string;
  source: string;
  target: string;
}

export interface NodeGraph {
  nodes: Node[];
  connections: Connection[];
}

// Timeline Types
export interface Track {
  id: string;
  name: string;
  type: 'audio' | 'video' | 'text';
  items: TimelineItem[];
}

export interface Layer {
  id: string;
  name: string;
  type: 'background' | 'foreground' | 'overlay';
}

export interface TimelineItem {
  id: string;
  trackId: string;
  start: number;
  end: number;
  content: string;
}
