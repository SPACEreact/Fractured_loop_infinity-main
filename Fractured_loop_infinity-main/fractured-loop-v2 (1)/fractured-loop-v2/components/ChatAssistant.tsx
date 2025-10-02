import React, { useState, useRef, useEffect } from 'react';
import type { Message } from '../types';
import { ChatRole } from '../types';
import LoadingSpinner from './LoadingSpinner';
import { SendIcon, SparklesIcon, UserIcon, MagicWandIcon } from './IconComponents';

interface ChatAssistantProps {
  messages: Message[];
  isLoading: boolean;
  generatedOutput: string;
  onSendMessage: (message: string) => void;
}

// Helper to escape HTML to prevent XSS from user input being reflected in prompt
const escapeHtml = (unsafe: string) => {
    return unsafe
         .replace(/&/g, '&amp;')
         .replace(/</g, '<')
         .replace(/>/g, '>')
         .replace(/"/g, '"')
         .replace(/'/g, '&#039;');
}

const formatGeneratedOutput = (content: string): string => {
    try {
        const data = JSON.parse(content);
        if (data.prompt && data.explanation) {
            return `
                <div class="prose prose-invert max-w-none">
                    <h3 class="!mb-2">Generated Content</h3>
                    <pre class="bg-gray-900/50 p-4 rounded-lg text-indigo-300 whitespace-pre-wrap break-words font-mono text-sm"><code>${escapeHtml(data.prompt)}</code></pre>
                    <h3 class="!mt-6 !mb-2">AI Commentary</h3>
                    <p class="!mt-0">${escapeHtml(data.explanation)}</p>
                </div>
            `.trim();
        }
    } catch (e) {
        // Not a JSON object, or not a format we recognize, so just display as plain text
        return `<p>${escapeHtml(content)}</p>`;
    }
    return `<p>${escapeHtml(content)}</p>`;
};

const ChatAssistant: React.FC<ChatAssistantProps> = ({ messages, isLoading, generatedOutput, onSendMessage }) => {
  const [prompt, setPrompt] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Build system state
  const [isBuildMode, setIsBuildMode] = useState(false);
  const [currentBuild, setCurrentBuild] = useState<string | null>(null);
  const [buildAnswers, setBuildAnswers] = useState<Record<string, string>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showBuildMenu, setShowBuildMenu] = useState(false);

  // Build types and their questions
  const buildTypes: Record<string, { name: string; description: string; questions: { key: string; question: string; section: string; }[] }> = {
    story: {
      name: 'StoryBuild',
      description: 'Create a comprehensive story with character arcs, world-building, and thematic depth',
      questions: [
        // Part 1 - Character & World
        { key: 'character_name', question: 'What is the character\'s full name? Any nicknames or titles?', section: 'Character Foundation' },
        { key: 'character_age', question: 'Exact age or approximate age range?', section: 'Character Foundation' },
        { key: 'character_gender', question: 'How does the character identify?', section: 'Character Foundation' },
        { key: 'character_physical', question: 'Height, build, notable features, hair/eye color, scars/tattoos?', section: 'Character Foundation' },
        { key: 'character_personality', question: 'Main personality traits (e.g., bold, insecure, cunning, empathetic)?', section: 'Character Foundation' },
        { key: 'character_backstory', question: 'What events shaped them? Childhood, trauma, achievements?', section: 'Character Foundation' },
        { key: 'character_wants', question: 'What does the character actively strive for?', section: 'Character Foundation' },
        { key: 'character_needs', question: 'What do they actually need to learn or overcome internally?', section: 'Character Foundation' },
        { key: 'character_flaws', question: 'What are their limitations, fears, or contradictions?', section: 'Character Foundation' },
        { key: 'character_wound', question: 'What unresolved past pain or secret drives them?', section: 'Character Foundation' },
        { key: 'world_tone', question: 'Urban, rural, fantastical, dystopian, sci-fi? Day/night, era, climate?', section: 'World & Opposition' },
        { key: 'external_conflict', question: 'What forces outside the character oppose them? Physical, social, political?', section: 'World & Opposition' },
        { key: 'conscious_forces', question: 'Who consciously helps or hinders them?', section: 'World & Opposition' },
        { key: 'unconscious_forces', question: 'Hidden societal pressures, norms, or invisible antagonists?', section: 'World & Opposition' },
        { key: 'story_linearity', question: 'Should events be chronological, fragmented, flashback-heavy?', section: 'World & Opposition' },
        { key: 'core_theme', question: 'What is the story\'s central message or question?', section: 'Thematic Suture' },
        { key: 'opposing_values', question: 'What conflicts with the character\'s beliefs?', section: 'Thematic Suture' },
        { key: 'antagonist_goal', question: 'What does the antagonist want, and what do they need internally?', section: 'Thematic Suture' },
        { key: 'character_mirror', question: 'How does the antagonist mirror or contrast the protagonist?', section: 'Thematic Suture' },
        { key: 'first_line', question: 'How should the story open?', section: 'Dialogue & Contrast' },
        { key: 'character_voice', question: 'Casual, formal, poetic, sarcastic, jargon-heavy?', section: 'Dialogue & Contrast' },
        { key: 'stereotype_subversion', question: 'Does this character break or fulfill a cliché?', section: 'Dialogue & Contrast' },
        { key: 'contradictions', question: 'Any internal vs external contradictions to highlight?', section: 'Dialogue & Contrast' },
        // Part 2 - Plot & Resonance
        { key: 'surface_conflict', question: 'What triggers the story?', section: 'Plot & Arc' },
        { key: 'internal_contradiction', question: 'Where does the character struggle internally?', section: 'Plot & Arc' },
        { key: 'inciting_incident', question: 'What event disrupts the normal world?', section: 'Plot & Arc' },
        { key: 'midpoint', question: 'What shifts the story\'s stakes or understanding?', section: 'Plot & Arc' },
        { key: 'climax', question: 'How does the character confront the ultimate challenge?', section: 'Plot & Arc' },
        { key: 'resolution', question: 'How does the character end the story? Success, failure, ambiguous?', section: 'Plot & Arc' },
        { key: 'ordinary_traits', question: 'What human, relatable qualities do they have?', section: 'Relatability & Transcendence' },
        { key: 'mythic_resonance', question: 'What timeless or universal traits emerge?', section: 'Relatability & Transcendence' },
        { key: 'key_recognition', question: 'When does the audience empathize, reflect, or recognize themselves?', section: 'Relatability & Transcendence' },
        { key: 'symbolic_objects', question: 'Items that symbolize character traits, theme, or conflict?', section: 'Symbolic Objects & Motivated Cuts' },
        { key: 'object_symbolism', question: 'What deeper meaning do they carry?', section: 'Symbolic Objects & Motivated Cuts' },
        { key: 'motivated_cuts', question: 'Scenes where objects or visual cues signal change? (Match cut, smash cut, echo cut, jump cut, etc.)', section: 'Symbolic Objects & Motivated Cuts' }
      ]
    },
    shot: {
      name: 'ShotBuild',
      description: 'Define cinematic shots with camera work, lighting, and composition',
      questions: [
        { key: 'shot_name', question: 'What do you want to call this shot? (For reference and seed tracking)', section: 'Shot Identification' },
        { key: 'shot_purpose', question: 'Is this establishing, dialogue, emotional, payoff, or action?', section: 'Shot Identification' },
        { key: 'scene_context', question: 'Which part of the story does this shot belong to?', section: 'Shot Identification' },
        { key: 'shot_type', question: 'Shot type: High-angle, Dutch angle, Extreme wide, POV, Over-the-shoulder, Silhouette, etc.', section: 'Shot Core & Camera' },
        { key: 'framing_rule', question: 'Rule of thirds, Golden ratio, Negative space, Symmetry, Frame-in-frame?', section: 'Shot Core & Camera' },
        { key: 'character_blocking', question: 'Subject foreground, antagonist rear, group center, left midground, etc.', section: 'Shot Core & Camera' },
        { key: 'camera_type', question: 'Arri Alexa 65, Red Monstro 8K, Sony Venice 2, etc.', section: 'Shot Core & Camera' },
        { key: 'focal_length', question: '10mm (ultra-wide), 35mm (standard), 50mm (natural), 100mm (portrait), 200mm (telephoto)', section: 'Shot Core & Camera' },
        { key: 'depth_field', question: 'f/1.2 (dreamy), f/2.8 (cinematic), f/5.6 (balanced), f/11 (deep focus), f/22 (everything sharp)', section: 'Shot Core & Camera' },
        { key: 'camera_movement', question: 'Pan, Tilt, Dolly, Track, Crane, Handheld, Steadicam, Zoom, Static', section: 'Movement & Dynamics' },
        { key: 'character_movement', question: 'Walking, running, entering frame, reaction, gesture, POV interaction', section: 'Movement & Dynamics' },
        { key: 'temporal_notes', question: 'Slow motion, real-time, long take, cut-heavy', section: 'Movement & Dynamics' },
        { key: 'lighting_style', question: 'High-key, Low-key, Ambient, Golden hour, etc.', section: 'Lighting, Color & Atmosphere' },
        { key: 'lighting_technical', question: 'Ratios, bloom, flare, practical sources, shadow emphasis', section: 'Lighting, Color & Atmosphere' },
        { key: 'color_palette', question: 'Teal & Orange, Golden glow, Black & White, etc.', section: 'Lighting, Color & Atmosphere' },
        { key: 'hex_codes', question: 'Specific hex codes for background, foreground, costume, props', section: 'Lighting, Color & Atmosphere' },
        { key: 'film_stock', question: 'Kodak Vision3 5219, Fujifilm Eterna 250D, etc.', section: 'Lighting, Color & Atmosphere' },
        { key: 'environmental_effects', question: 'Rain, Snow, Fog, Dust, Smoke, Haze, Light Shafts', section: 'Texture & Atmosphere' },
        { key: 'lens_effects', question: 'Bloom, Lens flare, Vignette, Grain, Motion blur', section: 'Texture & Atmosphere' },
        { key: 'important_props', question: 'Any symbolic or plot-driven objects?', section: 'Props & Visual Foreshadowing' }
      ]
    },
    img: {
      name: 'ImgBuild',
      description: 'Generate AI image prompts with cinematic parameters',
      questions: [
        { key: 'shot_type', question: 'Shot type: High-angle, Dutch angle, Extreme wide, POV, etc.', section: 'Shot Parameters' },
        { key: 'style_guide', question: 'Style reference: 1920s silent film, 80s cyberpunk, etc.', section: 'Style & Reference' },
        { key: 'camera_type', question: 'Camera type for this image generation', section: 'Camera Settings' },
        { key: 'focal_length', question: 'Focal length for composition', section: 'Camera Settings' },
        { key: 'aperture', question: 'Depth of field / aperture setting', section: 'Camera Settings' },
        { key: 'film_stock', question: 'Film stock / look emulation', section: 'Film & Lighting' },
        { key: 'lighting_style', question: 'Overall lighting approach', section: 'Film & Lighting' },
        { key: 'lighting_details', question: 'Technical lighting details', section: 'Film & Lighting' },
        { key: 'color_grading', question: 'Color grading style', section: 'Color & Look' },
        { key: 'hex_codes', question: 'Specific color hex codes', section: 'Color & Look' },
        { key: 'framing', question: 'Framing and composition rules', section: 'Composition' },
        { key: 'character_blocking', question: 'Character positioning', section: 'Composition' },
        { key: 'texture_atmosphere', question: 'Environmental effects and atmosphere', section: 'Effects' },
        { key: 'ai_model', question: 'Which AI model: MidJourney, Sora, Veo 3, etc.', section: 'AI Generation' }
      ]
    },
    vid: {
      name: 'VidBuild',
      description: 'Create video sequences with motion and continuity',
      questions: [
        { key: 'subject_action', question: 'What is the main subject and their action?', section: 'Scene Parameters' },
        { key: 'camera_movement', question: 'Camera movement for this sequence', section: 'Camera & Motion' },
        { key: 'setting', question: 'Location and environment details', section: 'Environment' },
        { key: 'lighting_mood', question: 'Lighting setup and emotional tone', section: 'Lighting & Mood' },
        { key: 'style_reference', question: 'Visual style and film reference', section: 'Style & Continuity' },
        { key: 'continuity_flags', question: 'Continuity requirements from previous shots', section: 'Continuity' }
      ]
    },
    edit: {
      name: 'EditBuild',
      description: 'Plan video editing with cuts, transitions, and audio',
      questions: [
        { key: 'review_context', question: 'Import context from previous builds? (All, Selected, None)', section: 'Context Review' },
        { key: 'selected_seeds', question: 'Which seeds/IDs should be included?', section: 'Context Review' },
        { key: 'seed_mutations', question: 'For each seed: Keep as-is, Mutate, or Discard?', section: 'Context Review' },
        { key: 'prompt_review', question: 'Review prompts in execution order? (Yes/No)', section: 'Sequential Review' },
        { key: 'prompt_adjustments', question: 'For each prompt: Keep, adjust, or remove?', section: 'Sequential Review' },
        { key: 'visual_suggestions', question: 'Additional B-roll, angles, or lighting variations?', section: 'Visual Suggestions' },
        { key: 'cinematic_guidance', question: 'Framing, lighting, texture, or atmosphere improvements?', section: 'Cinematic Guidance' },
        { key: 'editing_recommendations', question: 'Cut points, pacing, transitions, motion effects?', section: 'Video Editing' },
        { key: 'audio_sfx', question: 'Background music, sound effects, audio timing?', section: 'Audio & Effects' },
        { key: 'output_format', question: 'Copy-paste prompts, editing notes, or combined document?', section: 'Output Options' }
      ]
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, generatedOutput]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      onSendMessage(prompt);
      setPrompt('');
    }
  };

  const renderMessageContent = (message: Message) => {
    if (message.role === ChatRole.MODEL) {
      const formattedContent = formatGeneratedOutput(message.content);
      return <div dangerouslySetInnerHTML={{ __html: formattedContent }} />;
    }

    const contentWithBreaks = message.content.replace(/\n/g, '<br />');
    return <div dangerouslySetInnerHTML={{ __html: contentWithBreaks }} />;
  };

  return (
    <div className="flex flex-col h-full bg-gray-900/50">
      <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
        <div className="flex flex-col gap-6">
          {messages.map((msg, index) => (
            <div key={index} className={`flex gap-4 items-start ${msg.role === ChatRole.USER ? 'justify-end' : ''}`}>
              {msg.role !== ChatRole.USER && (
                <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center flex-shrink-0">
                  <SparklesIcon className="w-5 h-5 text-white" />
                </div>
              )}

              <div className={`max-w-xl p-4 rounded-xl ${
                msg.role === ChatRole.USER
                  ? 'bg-gray-700 text-gray-100'
                  : msg.role === ChatRole.MODEL
                  ? 'bg-transparent border border-indigo-500/50 w-full max-w-none'
                  : 'bg-gray-800 text-gray-200'
              }`}>
                {renderMessageContent(msg)}
              </div>

              {msg.role === ChatRole.USER && (
                <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                  <UserIcon className="w-5 h-5 text-gray-300" />
                </div>
              )}
            </div>
          ))}

          {generatedOutput && (
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center flex-shrink-0">
                <SparklesIcon className="w-5 h-5 text-white" />
              </div>
              <div className="max-w-none p-4 rounded-xl bg-transparent border border-indigo-500/50 w-full">
                <div dangerouslySetInnerHTML={{ __html: formatGeneratedOutput(generatedOutput) }} />
              </div>
            </div>
          )}

          {isLoading && (
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center flex-shrink-0">
                  <SparklesIcon className="w-5 h-5 text-white animate-pulse" />
              </div>
              <div className="max-w-xl p-4 rounded-xl bg-gray-800 text-gray-200">
                <LoadingSpinner />
              </div>
            </div>
          )}
        </div>
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-gray-700">
        {/* Build Menu */}
        {showBuildMenu && (
          <div className="mb-4 p-4 bg-gray-800 rounded-lg border border-indigo-500/30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-indigo-300">Build System</h3>
              <button
                onClick={() => setShowBuildMenu(false)}
                className="text-gray-400 hover:text-gray-200"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.entries(buildTypes).map(([key, buildType]) => (
                <button
                  key={key}
                  onClick={() => {
                    setCurrentBuild(key);
                    setIsBuildMode(true);
                    setCurrentQuestionIndex(0);
                    setBuildAnswers({});
                    setShowBuildMenu(false);
                  }}
                  className="p-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-left transition-colors"
                >
                  <div className="font-medium text-indigo-300">{buildType.name}</div>
                  <div className="text-sm text-gray-300 mt-1">{buildType.description}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Build Mode Interface */}
        {isBuildMode && currentBuild && (
          <div className="mb-4 p-4 bg-gray-800 rounded-lg border border-indigo-500/30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-indigo-300">
                {buildTypes[currentBuild].name} - Question {currentQuestionIndex + 1} of {buildTypes[currentBuild].questions.length}
              </h3>
              <button
                onClick={() => {
                  setIsBuildMode(false);
                  setCurrentBuild(null);
                  setCurrentQuestionIndex(0);
                  setBuildAnswers({});
                }}
                className="text-gray-400 hover:text-gray-200"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="text-sm text-indigo-400 font-medium">
                {buildTypes[currentBuild].questions[currentQuestionIndex].section}
              </div>
              <div className="text-gray-200">
                {buildTypes[currentBuild].questions[currentQuestionIndex].question}
              </div>
              <textarea
                value={buildAnswers[buildTypes[currentBuild].questions[currentQuestionIndex].key] || ''}
                onChange={(e) => {
                  const key = buildTypes[currentBuild].questions[currentQuestionIndex].key;
                  setBuildAnswers(prev => ({ ...prev, [key]: e.target.value }));
                }}
                placeholder="Your answer..."
                className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                rows={3}
              />
              <div className="flex justify-between">
                <button
                  onClick={() => {
                    if (currentQuestionIndex > 0) {
                      setCurrentQuestionIndex(currentQuestionIndex - 1);
                    }
                  }}
                  disabled={currentQuestionIndex === 0}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed rounded-lg text-gray-300 disabled:text-gray-500"
                >
                  Previous
                </button>
                <button
                  onClick={() => {
                    if (currentQuestionIndex < buildTypes[currentBuild].questions.length - 1) {
                      setCurrentQuestionIndex(currentQuestionIndex + 1);
                    } else {
                      // Build complete - generate prompt
                      const buildData = {
                        type: currentBuild,
                        answers: buildAnswers,
                        timestamp: new Date().toISOString()
                      };
                      onSendMessage(`Build complete: ${JSON.stringify(buildData)}`);
                      setIsBuildMode(false);
                      setCurrentBuild(null);
                      setCurrentQuestionIndex(0);
                      setBuildAnswers({});
                    }
                  }}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white"
                >
                  {currentQuestionIndex < buildTypes[currentBuild].questions.length - 1 ? 'Next' : 'Complete Build'}
                </button>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask the AI assistant..."
            disabled={isLoading}
            className="w-full bg-gray-800 border border-gray-600 rounded-lg py-3 pl-4 pr-20 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-700 disabled:cursor-not-allowed"
            aria-label="Chat input"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
            <button
              type="button"
              onClick={() => setShowBuildMenu(!showBuildMenu)}
              className="p-2 rounded-full text-gray-400 hover:bg-gray-700 hover:text-indigo-400 transition-colors duration-200"
              aria-label="Build menu"
            >
              <MagicWandIcon className="w-5 h-5" />
            </button>
            <button
              type="submit"
              disabled={isLoading || !prompt.trim()}
              className="p-2 rounded-full text-gray-400 hover:bg-gray-700 hover:text-indigo-400 transition-colors duration-200 disabled:opacity-50 disabled:hover:bg-transparent disabled:cursor-not-allowed"
              aria-label="Send message"
            >
              <SendIcon className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatAssistant;
