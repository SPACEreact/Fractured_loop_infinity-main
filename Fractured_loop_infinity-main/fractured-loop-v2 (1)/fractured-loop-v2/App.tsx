

import React, { useState, useCallback } from 'react';
import type { Project, Asset, Track, Layer, TimelineItem } from './types';
import Workspace from './components/Workspace';

const App: React.FC = () => {
  // Sample assets for initial project state
  const sampleAssets: Asset[] = [
    {
      id: 'asset-1',
      type: 'character',
      name: 'Protagonist',
      content: 'Name: Alex Rivera\nAge: 28\nAppearance: Short dark hair, athletic build, determined eyes\nPersonality: Brave, resourceful, compassionate\nBackground: Former journalist turned activist\nGoals: Expose corporate corruption',
      tags: ['character', 'protagonist'],
      createdAt: new Date(),
      summary: 'The main character, a brave activist fighting corruption'
    },
    {
      id: 'asset-2',
      type: 'plot_point',
      name: 'Inciting Incident',
      content: 'Event: Alex discovers leaked documents revealing environmental crimes\nImpact: Forces Alex to go on the run\nTiming: Act 1, 15 minutes in\nCharacters involved: Alex, Corporate Executive',
      tags: ['plot', 'inciting'],
      createdAt: new Date(),
      summary: 'The event that kicks off the main conflict'
    },
    {
      id: 'asset-3',
      type: 'shot_card',
      name: 'Opening Shot',
      content: 'Shot type: Wide establishing\nSubject: City skyline at dawn\nAngle: Low angle looking up\nLighting: Golden hour\nMood: Hopeful, determined',
      tags: ['shot', 'visual', 'opening'],
      createdAt: new Date(),
      summary: 'The first shot establishing the story world'
    },
    {
      id: 'asset-4',
      type: 'master_style',
      name: 'Neo-Noir Thriller',
      content: 'Visual style: High contrast, shadows and light\nTone: Tense, suspenseful\nColor palette: Blues, grays, occasional red accents\nNarrative approach: Non-linear storytelling with flashbacks',
      tags: ['style', 'master', 'noir'],
      createdAt: new Date(),
      summary: 'The overall aesthetic and narrative style'
    }
  ];

  const sampleTracks: Track[] = [
    {
      id: 'track-1',
      name: 'Style',
      type: 'global'
    },
    {
      id: 'track-2',
      name: 'Audio',
      type: 'global'
    },
    {
      id: 'track-3',
      name: 'Scenes',
      type: 'scene',
      layers: [
        { id: 'layer-1', name: 'Character', type: 'character' },
        { id: 'layer-2', name: 'Shot', type: 'shot' },
        { id: 'layer-3', name: 'Lighting', type: 'lighting' }
      ]
    }
  ];

  const sampleTimelineItems: TimelineItem[] = [
    {
      id: 'item-1',
      assetId: 'asset-4',
      trackId: 'track-1',
      startTime: 0,
      duration: 120 // 2 minutes
    },
    {
      id: 'item-2',
      assetId: 'asset-1',
      trackId: 'track-3',
      startTime: 0,
      duration: 30,
      layerId: 'layer-1'
    },
    {
      id: 'item-3',
      assetId: 'asset-3',
      trackId: 'track-3',
      startTime: 0,
      duration: 15,
      layerId: 'layer-2'
    },
    {
      id: 'item-4',
      assetId: 'asset-2',
      trackId: 'track-3',
      startTime: 15,
      duration: 45,
      layerId: 'layer-1'
    }
  ];

  // Single unified project state
  const [project, setProject] = useState<Project>({
    id: 'project-1',
    name: 'My AI Filmmaker Project',
    assets: sampleAssets,
    tracks: sampleTracks,
    timelineItems: sampleTimelineItems,
    createdAt: new Date(),
    updatedAt: new Date(),
    canvas: {
      nodes: [],
      connections: []
    }
  });

  // Global state for Tag Weighting System
  const [tagWeights, setTagWeights] = useState<Record<string, number>>({});
  const [styleRigidity, setStyleRigidity] = useState<number>(50);
  const [isWeightingEnabled, setIsWeightingEnabled] = useState<boolean>(false);

  const handleTagWeightChange = useCallback((tagId: string, newWeight: number) => {
    setTagWeights(prevWeights => {
      if (!isWeightingEnabled) {
        return { ...prevWeights, [tagId]: newWeight };
      }
      // Distribute weight changes within group
      // (Implementation can be added here if needed)
      return { ...prevWeights, [tagId]: newWeight };
    });
  }, [isWeightingEnabled]);

  // Handlers to update project state (add/remove assets, nodes, connections, etc.) can be added here

  return (
    <div className="min-h-screen font-sans gradient-bg text-gray-100 overflow-y-auto">
      <div className="gradient-overlay min-h-full">
        <Workspace
          project={project}
          setProject={setProject}
          tagWeights={tagWeights}
          styleRigidity={styleRigidity}
          isWeightingEnabled={isWeightingEnabled}
          onTagWeightChange={handleTagWeightChange}
          onStyleRigidityChange={setStyleRigidity}
          onWeightingToggle={setIsWeightingEnabled}
        />
      </div>
    </div>
  );
};

export default App;
