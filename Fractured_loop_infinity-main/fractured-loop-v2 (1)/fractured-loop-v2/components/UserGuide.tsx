import React, { useState } from 'react';
import { QuestionMarkCircleIcon, XMarkIcon } from './IconComponents';

interface UserGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserGuide: React.FC<UserGuideProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('getting-started');

  if (!isOpen) return null;

  const tabs = [
    { id: 'getting-started', label: 'Getting Started', icon: '🚀' },
    { id: 'builds', label: 'Guided Builds', icon: '✨' },
    { id: 'timeline', label: 'Timeline', icon: '⏱️' },
    { id: 'assets', label: 'Assets', icon: '📦' },
    { id: 'ai-chat', label: 'AI Chat', icon: '🤖' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'getting-started':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-indigo-300 mb-3">Welcome to Fractured Loop</h3>
              <p className="text-gray-300 mb-4">
                Fractured Loop is an AI-powered filmmaking assistant that helps you create cinematic content through structured workflows and intelligent automation.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-indigo-200 mb-2">Three Ways to Create</h4>
              <div className="grid gap-4">
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h5 className="font-medium text-indigo-300 mb-2">🎭 Storybuild</h5>
                  <p className="text-sm text-gray-300">Create compelling narratives with character arcs, plot structures, and emotional journeys using our 7-keyframe emotional structure.</p>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h5 className="font-medium text-indigo-300 mb-2">🎬 Shotbuild</h5>
                  <p className="text-sm text-gray-300">Design cinematic shots with professional cinematography techniques, lighting, composition, and visual storytelling.</p>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h5 className="font-medium text-indigo-300 mb-2">🎨 Imgbuild</h5>
                  <p className="text-sm text-gray-300">Generate AI images from your shot seeds with advanced prompting, style consistency, and iterative refinement.</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'builds':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-indigo-300 mb-3">Guided Builds</h3>
              <p className="text-gray-300 mb-4">
                Our guided build system walks you through professional filmmaking workflows with expert knowledge and AI assistance.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-indigo-200 mb-2">How to Start a Build</h4>
              <ol className="list-decimal list-inside space-y-2 text-gray-300">
                <li>Click the magic wand icon (✨) in the chat panel</li>
                <li>Choose your build type (Storybuild, Shotbuild, or Imgbuild)</li>
                <li>Answer the guided questions to build your cinematic elements</li>
                <li>Review and refine your results with AI assistance</li>
              </ol>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-indigo-200 mb-2">Build Types</h4>
              <div className="space-y-3">
                <div className="bg-gray-800/50 p-3 rounded">
                  <strong className="text-indigo-300">Storybuild:</strong> Creates narrative foundations with character psychology, plot structure, and emotional arcs.
                </div>
                <div className="bg-gray-800/50 p-3 rounded">
                  <strong className="text-indigo-300">Shotbuild:</strong> Develops visual sequences with cinematography, lighting, and composition techniques.
                </div>
                <div className="bg-gray-800/50 p-3 rounded">
                  <strong className="text-indigo-300">Imgbuild:</strong> Generates AI images from your shot concepts with professional prompting.
                </div>
              </div>
            </div>
          </div>
        );

      case 'timeline':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-indigo-300 mb-3">Timeline & Project Management</h3>
              <p className="text-gray-300 mb-4">
                Organize your cinematic elements on a professional timeline with drag-and-drop functionality.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-indigo-200 mb-2">Working with the Timeline</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• <strong>Drag assets</strong> from the Asset Library to timeline tracks</li>
                <li>• <strong>Resize items</strong> by dragging the right edge</li>
                <li>• <strong>Move items</strong> between tracks and layers</li>
                <li>• <strong>Click items</strong> to select and edit in the inspector</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-indigo-200 mb-2">Track Types</h4>
              <div className="space-y-2 text-gray-300">
                <div><strong className="text-indigo-300">Global Tracks:</strong> Style, Audio - affect the entire project</div>
                <div><strong className="text-indigo-300">Scene Tracks:</strong> Character, Shot, Lighting - scene-specific elements</div>
              </div>
            </div>
          </div>
        );

      case 'assets':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-indigo-300 mb-3">Asset Library</h3>
              <p className="text-gray-300 mb-4">
                Create and manage cinematic assets with our comprehensive template system.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-indigo-200 mb-2">Asset Categories</h4>
              <div className="grid gap-3">
                <div className="bg-gray-800/50 p-3 rounded">
                  <strong className="text-indigo-300">Primary Assets:</strong> Characters, Plots, Master Styles
                </div>
                <div className="bg-gray-800/50 p-3 rounded">
                  <strong className="text-indigo-300">Secondary Assets:</strong> Locations, Props, Sound Design
                </div>
                <div className="bg-gray-800/50 p-3 rounded">
                  <strong className="text-indigo-300">Tertiary Assets:</strong> Transitions, Effects, Technical specs
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-indigo-200 mb-2">Creating Assets</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• Drag templates from the Asset Library to the canvas</li>
                <li>• Use guided builds to create assets automatically</li>
                <li>• Edit asset details in the Node Details panel</li>
                <li>• Connect assets to show relationships</li>
              </ul>
            </div>
          </div>
        );

      case 'ai-chat':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-indigo-300 mb-3">AI Chat Assistant</h3>
              <p className="text-gray-300 mb-4">
                Get expert filmmaking advice and creative assistance from our specialized AI assistant.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-indigo-200 mb-2">Chat Features</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• <strong>Contextual help</strong> based on your current project</li>
                <li>• <strong>Expert knowledge</strong> in cinematography and storytelling</li>
                <li>• <strong>Iterative refinement</strong> of your creative ideas</li>
                <li>• <strong>Guided workflows</strong> through the magic wand button</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-indigo-200 mb-2">Tips for Best Results</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• Be specific about your creative vision</li>
                <li>• Reference cinematic techniques or directors</li>
                <li>• Ask for explanations of filmmaking concepts</li>
                <li>• Use the chat to refine assets and builds</li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-indigo-500/30 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <QuestionMarkCircleIcon className="w-8 h-8 text-indigo-400" />
            <h2 className="text-2xl font-bold text-gray-100">User Guide</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200 transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="flex h-[calc(90vh-80px)]">
          <div className="w-64 border-r border-gray-700 p-4">
            <nav className="space-y-2">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserGuide;
