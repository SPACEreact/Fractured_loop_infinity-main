import React, { useState, useCallback } from 'react';
import { ChatRole } from '../types';
import type { Project, Asset, Message, TimelineBlock } from '../types';
import { ASSET_TEMPLATES, FIELD_OPTIONS } from '../constants';
import { generateFromWorkspace, generateSandboxResponse } from '../services/geminiService';
import { FolderIcon, SparklesIcon, CubeTransparentIcon, ChatBubbleLeftRightIcon, Cog6ToothIcon, MagicWandIcon } from './IconComponents';
import ChatAssistant from './ChatAssistant.tsx';

interface WorkspaceProps {
  project: Project;
  setProject: React.Dispatch<React.SetStateAction<Project>>;
  tagWeights: Record<string, number>;
  styleRigidity: number;
  isWeightingEnabled: boolean;
  onTagWeightChange: (tagId: string, weight: number) => void;
  onStyleRigidityChange: (value: number) => void;
  onWeightingToggle: (enabled: boolean) => void;
}

// Optimized Dropdown Component
const OptimizedDropdown = ({
  value,
  options,
  onChange,
  placeholder,
  className = ""
}: {
  value: string;
  options: string[];
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
      setSearchTerm('');
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(option => option === value);

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-gray-700 text-gray-100 rounded px-3 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 flex items-center justify-between"
      >
        <span className={selectedOption ? '' : 'text-gray-400'}>
          {selectedOption || placeholder || 'Select option...'}
        </span>
        <span className="text-gray-400 ml-2">
          {isOpen ? '▲' : '▼'}
        </span>
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-gray-700 border border-gray-600 rounded shadow-lg max-h-60 overflow-hidden">
          {options.length > 5 && (
            <div className="p-2 border-b border-gray-600">
              <input
                type="text"
                placeholder="Search options..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-600 text-gray-100 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}

          <div className="max-h-48 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <div
                  key={index}
                  onClick={() => handleSelect(option)}
                  className={`px-3 py-2 cursor-pointer hover:bg-gray-600 transition-colors ${
                    option === value ? 'bg-indigo-600 text-white' : 'text-gray-100'
                  }`}
                >
                  {option}
                </div>
              ))
            ) : (
              <div className="px-3 py-2 text-gray-400 text-sm">
                No options found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Sub-components
const AssetLibraryPanel = () => {
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    primary: true,
    secondary: true,
    tertiary: false
  });

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({ ...prev, [category]: !prev[category] }));
  };

  const groupedTemplates = Object.values(ASSET_TEMPLATES).reduce((acc, template) => {
    if (!acc[template.category]) acc[template.category] = [];
    acc[template.category].push(template);
    return acc;
  }, {} as Record<string, typeof ASSET_TEMPLATES[keyof typeof ASSET_TEMPLATES][]>);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, templateType: string) => {
    e.dataTransfer.setData('text/plain', templateType);
  };

  return (
    <aside className="glass-card w-64 p-4 flex flex-col fixed top-14 bottom-0 left-0 overflow-y-auto custom-scrollbar z-30">
      <div className="flex items-center gap-2 px-2 mb-4">
        <FolderIcon className="w-8 h-8 text-indigo-400" />
        <h1 className="text-xl font-bold text-gray-100">Asset Library</h1>
      </div>
      <div className="space-y-4">
        {Object.keys(groupedTemplates).map(category => (
          <div key={category} className="space-y-2">
            <button
              onClick={() => toggleCategory(category)}
              className="w-full text-left font-medium text-gray-100 hover:text-indigo-400 transition-colors"
            >
              {category.charAt(0).toUpperCase() + category.slice(1)} Assets
              <span className="float-right">
                {expandedCategories[category] ? '▼' : '▶'}
              </span>
            </button>
            {expandedCategories[category] && (
              <div className="space-y-1 ml-4">
                {groupedTemplates[category].map(template => (
                  <div
                    key={template.type}
                    draggable
                    onDragStart={(e) => handleDragStart(e, template.type)}
                    className="p-2 bg-gray-700/50 rounded cursor-move hover:bg-gray-600/50 transition-colors"
                  >
                    <div className="font-medium text-gray-100">{template.name}</div>
                    <div className="text-xs text-gray-400">{template.description}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
};

const AssetDetailsPanel = ({
  selectedAssetId,
  project,
  onUpdateAsset,
  onDeleteAsset,
  onClose
}: {
  selectedAssetId: string | null;
  project: Project;
  onUpdateAsset: (assetId: string, updates: Partial<Asset>) => void;
  onDeleteAsset: (assetId: string) => void;
  onClose: () => void;
}) => {
  if (!selectedAssetId) return null;

  const asset = project.assets.find(a => a.id === selectedAssetId);
  if (!asset) return null;

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete the asset "${asset.name}"? This action cannot be undone.`)) {
      onDeleteAsset(selectedAssetId);
      onClose();
    }
  };

  // Parse content into fields and values
  const parseContent = (content: string) => {
    const lines = content.split('\n');
    const fields: Record<string, string> = {};

    lines.forEach(line => {
      const colonIndex = line.indexOf(':');
      if (colonIndex > 0) {
        const fieldName = line.substring(0, colonIndex).trim().toLowerCase().replace(/\s+/g, '_');
        const fieldValue = line.substring(colonIndex + 1).trim();
        fields[fieldName] = fieldValue;
      }
    });

    return fields;
  };

  // Update content when a field changes
  const updateField = (fieldName: string, value: string) => {
    const fields = parseContent(asset.content);
    fields[fieldName] = value;

    // Reconstruct content
    const newContent = Object.entries(fields)
      .map(([key, val]) => `${key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}: ${val}`)
      .join('\n');

    onUpdateAsset(asset.id, { content: newContent });
  };

  const parsedFields = parseContent(asset.content);

  // Map field names to their dropdown options using FIELD_OPTIONS
  const getFieldOptions = (fieldKey: string): string[] => {
    // First, try if fieldKey is a key in FIELD_OPTIONS with options
    if (FIELD_OPTIONS[fieldKey] && FIELD_OPTIONS[fieldKey].options) {
      return FIELD_OPTIONS[fieldKey].options;
    }

    // Then, try to find fieldKey as subkey in nested FIELD_OPTIONS
    const options: string[] = [];
    for (const [key, value] of Object.entries(FIELD_OPTIONS)) {
      if (value && typeof value === 'object' && value[fieldKey] && Array.isArray(value[fieldKey])) {
        options.push(...value[fieldKey]);
      }
    }
    if (options.length > 0) {
      return [...new Set(options)];
    }

    // Fallback to special mappings for cases where fieldKey doesn't match
    const specialMappings: Record<string, string> = {
      'genre': 'story_genres',
      'tone': 'story_tones',
      'shot_type': 'shot_types',
      'camera_movement': 'camera_movements',
      'lighting': 'lighting_styles',
      'color_palette': 'color_palettes',
      'focal_length': 'camera_focal_lengths',
      'aperture': 'camera_apertures',
      'pacing': 'video_pacing',
      'duration': 'video_durations',
      'aspect_ratio': 'aspect_ratios',
      'layout': 'storyboard_output',
      'annotations': 'storyboard_output',
      'style': 'storyboard_output',
      'lut': 'color_grading',
      'contrast': 'color_grading',
      'saturation': 'color_grading',
      'key_light': 'lighting_setup',
      'color_temperature': 'lighting_setup',
      'intensity': 'lighting_setup',
      'shutter_speed': 'camera_settings',
      'iso': 'camera_settings',
      'quality': 'image_output',
      'color_space': 'image_output',
      'bitrate': 'video_output',
      'codec': 'video_output',
      'frame_rate': 'video_output',
      'format': 'video_output',
      'resolution': 'video_output' // but since it's handled above, but for special, but since it's handled above
    };

    const optionsKey = specialMappings[fieldKey];
    if (optionsKey) {
      const fieldOptions = FIELD_OPTIONS[optionsKey];
      if (fieldOptions) {
        if (fieldOptions.options) {
          return fieldOptions.options;
        } else if (fieldOptions[fieldKey] && Array.isArray(fieldOptions[fieldKey])) {
          return fieldOptions[fieldKey];
        }
      }
    }

    return [];
  };

  return (
    <aside className="glass-card w-80 p-4 flex flex-col fixed top-14 bottom-0 right-0 overflow-y-auto custom-scrollbar z-40">
      <div className="flex items-center justify-between px-2 mb-4">
        <div className="flex items-center gap-2">
          <CubeTransparentIcon className="w-6 h-6 text-indigo-400" />
          <h1 className="text-lg font-bold text-gray-100">Asset Details</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleDelete}
            className="text-red-400 hover:text-red-300 transition-colors text-lg"
            title="Delete Asset"
          >
            🗑️
          </button>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200 transition-colors"
          >
            ✕
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block font-bold text-gray-100 mb-2">Name</label>
          <input
            type="text"
            value={asset.name}
            onChange={(e) => onUpdateAsset(asset.id, { name: e.target.value })}
            className="w-full bg-gray-700 text-gray-100 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block font-bold text-gray-100 mb-2">Type</label>
          <div className="text-sm text-gray-300 bg-gray-700 px-3 py-2 rounded">
            {asset.type.replace('_', ' ').toUpperCase()}
          </div>
        </div>

        <div>
          <label className="block font-bold text-gray-100 mb-2">Fields</label>
          <div className="space-y-3">
            {Object.entries(parsedFields).map(([fieldKey, fieldValue]) => {
              const displayName = fieldKey.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
              const options = getFieldOptions(fieldKey);

              if (options && options.length > 0) {
                // Render optimized dropdown for fields with predefined options
                return (
                  <div key={fieldKey}>
                    <label className="block font-medium text-gray-100 mb-1 text-sm">{displayName}</label>
                    <OptimizedDropdown
                      value={fieldValue}
                      options={options}
                      onChange={(value) => updateField(fieldKey, value)}
                      placeholder={`Select ${displayName.toLowerCase()}...`}
                    />
                  </div>
                );
              } else {
                // Render text input for free-form fields
                return (
                  <div key={fieldKey}>
                    <label className="block font-medium text-gray-100 mb-1 text-sm">{displayName}</label>
                    <input
                      type="text"
                      value={fieldValue}
                      onChange={(e) => updateField(fieldKey, e.target.value)}
                      className="w-full bg-gray-700 text-gray-100 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder={`Enter ${displayName.toLowerCase()}...`}
                    />
                  </div>
                );
              }
            })}
          </div>
        </div>

        <div>
          <label className="block font-bold text-gray-100 mb-2">Raw Content</label>
          <textarea
            value={asset.content}
            onChange={(e) => onUpdateAsset(asset.id, { content: e.target.value })}
            className="w-full bg-gray-700 text-gray-100 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-24 resize-y text-xs"
            placeholder="Raw content..."
          />
        </div>

        <div>
          <label className="block font-bold text-gray-100 mb-2">Tags</label>
          <div className="flex flex-wrap gap-2">
            {asset.tags?.map((tag, index) => (
              <span
                key={index}
                className="bg-indigo-600 text-white px-2 py-1 rounded text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="text-xs text-gray-400">
          Created: {asset.createdAt.toLocaleDateString()}
        </div>
      </div>
    </aside>
  );
};



const ControlPanel = ({
  isWeightingEnabled,
  onWeightingToggle,
  styleRigidity,
  onStyleRigidityChange,
  tagWeights,
  onTagWeightChange,
  onGenerate,
  panelCount,
  isGenerating
}: {
  isWeightingEnabled: boolean;
  onWeightingToggle: (enabled: boolean) => void;
  styleRigidity: number;
  onStyleRigidityChange: (value: number) => void;
  tagWeights: Record<string, number>;
  onTagWeightChange: (tagId: string, weight: number) => void;
  onGenerate: () => void;
  panelCount: number;
  isGenerating: boolean;
}) => {
  return (
    <aside className="glass-card w-80 p-4 flex flex-col fixed top-14 bottom-0 overflow-y-auto custom-scrollbar z-30 transition-all duration-300" style={{ right: `${panelCount * 80}px` }}>
      <div className="flex items-center gap-2 px-2 mb-4">
        <Cog6ToothIcon className="w-8 h-8 text-indigo-400" />
        <h1 className="text-xl font-bold text-gray-100">Controls</h1>
      </div>

      <div className="space-y-4">
        <button
          onClick={onGenerate}
          disabled={isGenerating}
          className={`w-full text-white font-bold py-3 px-4 rounded-lg transition-colors ${
            isGenerating
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-500'
          }`}
        >
          <SparklesIcon className="w-5 h-5 inline mr-2" />
          {isGenerating ? 'Generating...' : 'Generate'}
        </button>

        <div className="bg-gray-700/50 p-3 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <label htmlFor="weighting-enabled" className="font-bold text-gray-100">Enable Tag Weighting</label>
            <button
              role="switch"
              aria-checked={isWeightingEnabled}
              onClick={() => onWeightingToggle(!isWeightingEnabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isWeightingEnabled ? 'bg-indigo-500' : 'bg-gray-600'}`}
              id="weighting-enabled"
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isWeightingEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>

          <div className={`transition-opacity duration-300 ${isWeightingEnabled ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
            <label htmlFor="style-rigidity" className="block font-bold text-gray-100 mb-2">Style Rigidity</label>
            <input
              id="style-rigidity"
              type="range"
              min="0"
              max="100"
              value={styleRigidity}
              onChange={(e) => onStyleRigidityChange(parseInt(e.target.value, 10))}
              className="w-full"
              disabled={!isWeightingEnabled}
            />
            <div className="text-xs text-gray-400 flex justify-between mt-1">
              <span>Creative</span>
              <span>Strict</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

// Simple Timeline View Component
const SimpleTimelineView = ({
  project,
  selectedAssetId,
  setSelectedAssetId,
  onAssetDrop
}: {
  project: Project;
  selectedAssetId: string | null;
  setSelectedAssetId: (id: string | null) => void;
  onAssetDrop: (assetId: string, timelineId: string) => void;
}) => {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const assetId = e.dataTransfer.getData('text/plain');
    if (assetId) {
      onAssetDrop(assetId, 'primary');
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      className="h-full p-6 overflow-y-auto"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-100 mb-6">Primary Timeline</h2>

        <div className="space-y-4">
          {project.primaryTimeline.blocks.map((block, index) => {
            const asset = project.assets.find(a => a.id === block.assetId);
            if (!asset) return null;

            return (
              <div
                key={block.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                  selectedAssetId === asset.id
                    ? 'border-indigo-500 bg-indigo-500/20'
                    : 'border-gray-600 bg-gray-700/50 hover:border-gray-500'
                }`}
                onClick={() => setSelectedAssetId(asset.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-100">{asset.name}</h3>
                      <p className="text-sm text-gray-400">{asset.type.replace('_', ' ')}</p>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {asset.createdAt.toLocaleDateString()}
                  </div>
                </div>
                {asset.summary && (
                  <p className="text-sm text-gray-300 mt-2">{asset.summary}</p>
                )}
              </div>
            );
          })}
        </div>

        {project.primaryTimeline.blocks.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <p>Drag assets from the library to add them to the timeline.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// @ts-ignore - tagWeights and onTagWeightChange are used in ControlPanel and generateFromWorkspace
const Workspace: React.FC<WorkspaceProps> = ({
  project,
  setProject,
  tagWeights: _tagWeights,
  styleRigidity,
  isWeightingEnabled,
  onTagWeightChange: _onTagWeightChange,
  onStyleRigidityChange,
  onWeightingToggle
}) => {
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);
  const [activePanel, setActivePanel] = useState<'canvas' | 'chat' | 'timeline'>('timeline');
  const [generatedOutput, setGeneratedOutput] = useState<string>('');
  const [outputType] = useState<'text' | 'image'>('text');
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);



  const handleGenerate = async () => {
    setGeneratedOutput('');
    setActivePanel('chat');
    setIsGenerating(true);

    try {
      // Convert project timelines to canvas structure expected by generateFromWorkspace
      const canvas = {
        nodes: project.primaryTimeline.blocks.map(block => ({
          id: block.id,
          assetId: block.assetId,
          position: { x: 0, y: 0 }, // Position can be defaulted or enhanced later
          size: 1 // Default size
        })),
        connections: [] // No connections currently, can be enhanced if needed
      };

      const result = await generateFromWorkspace({
        assets: project.assets,
        canvas
      }, _tagWeights, styleRigidity, outputType);
      setGeneratedOutput(result);
    } catch (error) {
      console.error('Generation error:', error);
      setGeneratedOutput('Failed to generate content. Please check your connection and try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    // Add user message
    const userMessage: Message = {
      role: ChatRole.USER,
      content: message
    };
    setChatMessages(prev => [...prev, userMessage]);
    setIsChatLoading(true);

    try {
      // Call Gemini service for chat response
      const response = await generateSandboxResponse(
        message,
        chatMessages.map(msg => ({ role: msg.role === ChatRole.USER ? 'user' : 'assistant', content: msg.content })),
        _tagWeights,
        styleRigidity
      );

      // Add AI response
      const aiMessage: Message = {
        role: ChatRole.MODEL,
        content: response
      };
      setChatMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        role: ChatRole.MODEL,
        content: 'Sorry, I encountered an error while processing your message.'
      };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleUpdateAsset = useCallback((assetId: string, updates: Partial<Asset>) => {
    setProject(prev => ({
      ...prev,
      assets: prev.assets.map(asset =>
        asset.id === assetId ? { ...asset, ...updates } : asset
      ),
      updatedAt: new Date()
    }));
  }, [setProject]);

  const handleDeleteAsset = useCallback((assetId: string) => {
    setProject(prev => ({
      ...prev,
      assets: prev.assets.filter(asset => asset.id !== assetId),
      primaryTimeline: {
        ...prev.primaryTimeline,
        blocks: prev.primaryTimeline.blocks.filter(block => block.assetId !== assetId)
      },
      updatedAt: new Date()
    }));
  }, [setProject]);

  const handleAssetDropOnTimeline = useCallback((templateType: string) => {
    // Create new asset from template
    const template = ASSET_TEMPLATES[templateType];
    if (!template) return;

    // Map template type to Asset type
    const typeMap: Record<string, Asset['type']> = {
      'character': 'secondary',
      'plot_point': 'secondary',
      'shot_card': 'secondary',
      'master_style': 'primary',
      'scene': 'primary',
      'variant_shot': 'secondary',
      'camera_settings': 'tertiary',
      'depth_of_field': 'tertiary',
      'lighting_setup': 'tertiary',
      'color_grading': 'tertiary',
      'audio_design': 'tertiary',
      'vfx_compositing': 'tertiary',
      'video_output': 'primary',
      'image_output': 'primary',
      'storyboard_output': 'primary'
    };

    const newAsset: Asset = {
      id: crypto.randomUUID(),
      seedId: crypto.randomUUID(),
      type: typeMap[template.type] || 'secondary',
      name: template.name,
      content: template.defaultContent || '',
      tags: template.tags || [],
      createdAt: new Date(),
      summary: template.description,
      isMaster: template.type.includes('master') || template.type.includes('output'),
      lineage: []
    };

    // Add asset to primary timeline as a new block
    const newBlock: TimelineBlock = {
      id: crypto.randomUUID(),
      assetId: newAsset.id,
      position: project.primaryTimeline.blocks.length,
      isExpanded: false,
      createdAt: new Date()
    };

    setProject(prev => ({
      ...prev,
      assets: [...prev.assets, newAsset],
      primaryTimeline: {
        ...prev.primaryTimeline,
        blocks: [...prev.primaryTimeline.blocks, newBlock]
      },
      updatedAt: new Date()
    }));
  }, [setProject, project.primaryTimeline.blocks.length]);

  return (
    <div className="h-screen flex flex-col">
      <header className="p-2 border-b border-gray-700 flex justify-between items-center flex-shrink-0 z-10 bg-gray-900">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold text-gray-100">{project.name}</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActivePanel('chat')}
            className={`flex items-center gap-2 font-medium py-2 px-3 rounded-lg transition-colors ${activePanel === 'chat' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
          >
            <ChatBubbleLeftRightIcon className="w-5 h-5" />
            Chat
          </button>
          <button
            onClick={() => setActivePanel('timeline')}
            className={`flex items-center gap-2 font-medium py-2 px-3 rounded-lg transition-colors ${activePanel === 'timeline' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
            title="Timeline"
          >
            <MagicWandIcon className="w-5 h-5" />
            Timeline
          </button>
        </div>
      </header>

      <main className="flex-1 relative">
        <AssetLibraryPanel />

        <div className="fixed left-0 top-14 bottom-0 gradient-bg gradient-overlay overflow-hidden md:left-64">
          {activePanel === 'timeline' && (
            <SimpleTimelineView
              project={project}
              selectedAssetId={selectedAssetId}
              setSelectedAssetId={setSelectedAssetId}
              onAssetDrop={handleAssetDropOnTimeline}
            />
          )}

          {activePanel === 'chat' && (
            <ChatAssistant
              messages={chatMessages}
              isLoading={isChatLoading}
              generatedOutput={generatedOutput}
              onSendMessage={handleSendMessage}
              project={project}
              setProject={setProject}
            />
          )}
        </div>

        <ControlPanel
          isWeightingEnabled={isWeightingEnabled}
          onWeightingToggle={onWeightingToggle}
          styleRigidity={styleRigidity}
          onStyleRigidityChange={onStyleRigidityChange}
          tagWeights={_tagWeights}
          onTagWeightChange={_onTagWeightChange}
          onGenerate={handleGenerate}
          panelCount={selectedAssetId ? 1 : 0}
          isGenerating={isGenerating}
        />

        <AssetDetailsPanel
          selectedAssetId={selectedAssetId}
          project={project}
          onUpdateAsset={handleUpdateAsset}
          onDeleteAsset={handleDeleteAsset}
          onClose={() => setSelectedAssetId(null)}
        />
      </main>
    </div>
  );
};

export default Workspace;
