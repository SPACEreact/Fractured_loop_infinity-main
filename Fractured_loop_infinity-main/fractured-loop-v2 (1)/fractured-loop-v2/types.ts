// Timeline-based Project Types
export interface TimelineItem {
  id: string;
  assetId: string; // Reference to the asset this item represents
  trackId: string;
  startTime: number; // In seconds
  duration: number; // In seconds
  layerId?: string; // For layered tracks like scenes
}

export interface Track {
  id: string;
  name: string;
  type: 'global' | 'scene'; // Global tracks (Style, Audio) vs Scene tracks
  layers?: Layer[]; // Only for scene tracks
}

export interface Layer {
  id: string;
  name: string;
  type: 'character' | 'shot' | 'lighting'; // Asset types that can be layered
}

export interface Project {
  id: string;
  name: string;
  assets: Asset[];
  tracks: Track[];
  timelineItems: TimelineItem[];
  createdAt: Date;
  updatedAt: Date;
  targetModel?: string; // Target AI model for generation (MidJourney, Sora, etc.)
  canvas: CanvasState;
}

// Central Asset Interface
export interface Asset {
  id: string;
  type: 'character' | 'plot_point' | 'shot_card' | 'master_style' | 'scene' | 'variant_shot' | 'camera_settings' | 'depth_of_field' | 'lighting_setup' | 'color_grading' | 'audio_design' | 'vfx_compositing' | 'video_output' | 'image_output' | 'storyboard_output';
  name: string;
  content: string;
  tags: string[];
  createdAt: Date;
  summary: string;
  metadata?: Record<string, any>;
  questions?: Question[]; // For guided build assets
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
