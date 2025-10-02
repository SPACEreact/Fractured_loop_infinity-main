

import React, { useState, useCallback } from 'react';
import type { Project, Asset } from './types';
import Workspace from './components/Workspace';
import { SparklesIcon, FolderIcon } from './components/IconComponents';

const App: React.FC = () => {
  // Sample assets for initial project state
  const sampleAssets: Asset[] = [
    {
      id: 'asset-1',
      seedId: 'A',
      type: 'primary',
      name: 'Haunted Cathedral',
      content: 'A gothic cathedral shrouded in mist, with towering spires piercing the stormy sky. Ancient stone walls covered in ivy, stained glass windows glowing with ethereal light.',
      tags: ['primary', 'setting'],
      createdAt: new Date(),
      summary: 'The central location of the story'
    },
    {
      id: 'asset-2',
      seedId: 'B',
      type: 'secondary',
      name: 'Eerie Lighting',
      content: 'Dramatic chiaroscuro lighting with long shadows cast by flickering candlelight. Moonlight filtering through broken stained glass creates colorful patterns on stone floors.',
      tags: ['secondary', 'lighting'],
      createdAt: new Date(),
      summary: 'Atmospheric lighting setup'
    }
  ];

  // Single unified project state
  const [project, setProject] = useState<Project>({
    id: 'project-1',
    name: 'My Fractured Loop Project',
    assets: sampleAssets,
    primaryTimeline: {
      blocks: [
        {
          id: 'block-1',
          assetId: 'asset-1',
          position: 0,
          isExpanded: false,
          createdAt: new Date()
        },
        {
          id: 'block-2',
          assetId: 'asset-2',
          position: 1,
          isExpanded: false,
          createdAt: new Date()
        }
      ]
    },
    secondaryTimeline: undefined, // Will appear after first master asset
    createdAt: new Date(),
    updatedAt: new Date()
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
