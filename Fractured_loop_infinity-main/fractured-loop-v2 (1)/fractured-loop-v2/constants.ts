import { Build, Workflow } from './types';

export type TagGroup = string[];

export type AssetTemplate = {
  type: 'character' | 'plot_point' | 'shot_card' | 'master_style' | 'scene' | 'variant_shot' | 'camera_settings' | 'depth_of_field' | 'lighting_setup' | 'color_grading' | 'audio_design' | 'vfx_compositing' | 'video_output' | 'image_output' | 'storyboard_output';
  name: string;
  description: string;
  defaultContent?: string;
  tags?: string[];
  category: 'primary' | 'secondary' | 'tertiary';
};

export const BUILDS: Build[] = [
  {
    id: 'storybuild',
    name: 'Storybuild',
    description: 'Create compelling narratives with psychological depth using the 7-keyframe emotional structure focusing on Want vs. Need',
    targetAssetType: 'scene',
    questions: [
      {
        id: 'genre',
        text: 'What genre best fits your story?',
        type: 'dropdown',
        optionsKey: 'story_genres',
        required: true
      },
      {
        id: 'tone',
        text: 'What is the overall tone of your story?',
        type: 'dropdown',
        optionsKey: 'story_tones',
        required: true
      },
      {
        id: 'protagonist_want',
        text: 'What does your protagonist want? (Their surface-level goal)',
        type: 'text',
        required: true
      },
      {
        id: 'protagonist_need',
        text: 'What does your protagonist need? (Their deeper transformation)',
        type: 'text',
        required: true
      },
      {
        id: 'antagonist_force',
        text: 'What external force opposes the protagonist?',
        type: 'text',
        required: true
      },
      {
        id: 'keyframe_1',
        text: 'Keyframe 1 - Setup: Establish the world, protagonist\'s want, and initial situation',
        type: 'text',
        required: true
      },
      {
        id: 'keyframe_2',
        text: 'Keyframe 2 - Confrontation: Protagonist faces first challenge, want is threatened',
        type: 'text',
        required: true
      },
      {
        id: 'keyframe_3',
        text: 'Keyframe 3 - Crisis: Major turning point, protagonist questions their want',
        type: 'text',
        required: true
      },
      {
        id: 'keyframe_4',
        text: 'Keyframe 4 - Realization: Protagonist begins to understand their need',
        type: 'text',
        required: true
      },
      {
        id: 'keyframe_5',
        text: 'Keyframe 5 - Climax: Final confrontation with antagonist',
        type: 'text',
        required: true
      },
      {
        id: 'keyframe_6',
        text: 'Keyframe 6 - Resolution: Protagonist achieves need, transforms',
        type: 'text',
        required: true
      },
      {
        id: 'keyframe_7',
        text: 'Keyframe 7 - New Beginning: Protagonist enters new world with their transformation',
        type: 'text',
        required: true
      }
    ]
  },
  {
    id: 'shotbuild',
    name: 'Shotbuild',
    description: 'Design cinematic shots with expert camera, lighting, and composition techniques',
    targetAssetType: 'shot_card',
    questions: [
      {
        id: 'shot_type',
        text: 'What type of shot is this?',
        type: 'dropdown',
        optionsKey: 'shot_types',
        required: true
      },
      {
        id: 'camera_movement',
        text: 'How does the camera move?',
        type: 'dropdown',
        optionsKey: 'camera_movements',
        required: true
      },
      {
        id: 'lighting_style',
        text: 'What lighting style should be used?',
        type: 'dropdown',
        optionsKey: 'lighting_styles',
        required: true
      },
      {
        id: 'color_palette',
        text: 'What color palette fits this shot?',
        type: 'dropdown',
        optionsKey: 'color_palettes',
        required: true
      },
      {
        id: 'focal_length',
        text: 'Camera focal length',
        type: 'dropdown',
        optionsKey: 'camera_focal_lengths',
        required: true
      },
      {
        id: 'aperture',
        text: 'Camera aperture',
        type: 'dropdown',
        optionsKey: 'camera_apertures',
        required: true
      },
      {
        id: 'mood',
        text: 'What mood should this shot convey?',
        type: 'text',
        required: true
      },
      {
        id: 'subject_focus',
        text: 'What is the main subject and focus of this shot?',
        type: 'text',
        required: true
      }
    ]
  },
  {
    id: 'imgbuild',
    name: 'Imgbuild',
    description: 'Generate stunning images with AI models like MidJourney using expert prompts',
    targetAssetType: 'image_output',
    questions: [
      {
        id: 'style_reference',
        text: 'Reference artists or styles (e.g., "in the style of Caravaggio")',
        type: 'text',
        required: true
      },
      {
        id: 'composition',
        text: 'Describe the composition and framing',
        type: 'text',
        required: true
      },
      {
        id: 'lighting_mood',
        text: 'Lighting and mood description',
        type: 'text',
        required: true
      },
      {
        id: 'color_scheme',
        text: 'Color scheme and palette',
        type: 'dropdown',
        optionsKey: 'color_palettes',
        required: true
      },
      {
        id: 'resolution',
        text: 'Desired resolution',
        type: 'dropdown',
        optionsKey: 'image_resolutions',
        required: true
      },
      {
        id: 'aspect_ratio',
        text: 'Aspect ratio',
        type: 'dropdown',
        optionsKey: 'aspect_ratios',
        required: true
      }
    ]
  },
  {
    id: 'vidbuild',
    name: 'Vidbuild',
    description: 'Create cinematic videos with AI models like Sora using advanced prompt engineering',
    targetAssetType: 'video_output',
    questions: [
      {
        id: 'narrative_summary',
        text: 'Brief narrative summary of the video',
        type: 'text',
        required: true
      },
      {
        id: 'visual_style',
        text: 'Overall visual style and aesthetic',
        type: 'text',
        required: true
      },
      {
        id: 'camera_work',
        text: 'Camera movements and techniques',
        type: 'dropdown',
        optionsKey: 'camera_movements',
        required: true
      },
      {
        id: 'pacing',
        text: 'Pacing and rhythm of the video',
        type: 'dropdown',
        optionsKey: 'video_pacing',
        required: true
      },
      {
        id: 'duration',
        text: 'Approximate duration',
        type: 'dropdown',
        optionsKey: 'video_durations',
        required: true
      },
      {
        id: 'resolution_fps',
        text: 'Resolution and frame rate',
        type: 'dropdown',
        optionsKey: 'video_formats',
        required: true
      }
    ]
  }
];

export const WORKFLOWS: Workflow[] = [
  {
    id: 'cinematic_production',
    name: 'Cinematic Production Workflow',
    description: 'Complete expert-guided workflow for film production from story to final output',
    builds: BUILDS
  }
];

export const TAG_GROUPS: Record<string, TagGroup> = {
  genres: ['Action', 'Adventure', 'Animation', 'Biography', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy', 'Film-Noir', 'History', 'Horror', 'Music', 'Musical', 'Mystery', 'Romance', 'Sci-Fi', 'Short', 'Sport', 'Thriller', 'War', 'Western'],
  tones: ['Dark', 'Hopeful', 'Melancholic', 'Uplifting', 'Suspenseful', 'Humorous', 'Intense', 'Serene', 'Nostalgic', 'Energetic', 'Contemplative', 'Chaotic'],
  techniques: ['Long Take', 'Montage', 'Slow Motion', 'Flashback', 'Non-linear', 'Parallel Action', 'Jump Cut', 'Match Cut', 'Cross-cutting'],
  styles: ['Realistic', 'Stylized', 'Abstract', 'Minimalist', 'Ornate', 'Noir', 'Expressionist', 'Surreal', 'Documentary', 'Experimental']
};

export const ASSET_TEMPLATES: Record<string, AssetTemplate> = {
  character: {
    type: 'character',
    name: 'Character Profile',
    description: 'Create character assets for timeline tracks, defining traits, arcs, and psychological depth',
    defaultContent: 'Name: \nAge: \nAppearance: \nPersonality: \nBackground: \nGoals (Want): \nNeeds (Transformation): \nArc: ',
    tags: ['character'],
    category: 'secondary'
  },
  plot_point: {
    type: 'plot_point',
    name: 'Plot Point',
    description: 'Define key events in your timeline that drive the story forward',
    defaultContent: 'Event: \nImpact on Protagonist: \nTiming in Timeline: \nCharacters involved: \nEmotional Keyframe: ',
    tags: ['plot'],
    category: 'secondary'
  },
  shot_card: {
    type: 'shot_card',
    name: 'Shot Card',
    description: 'Design individual shots for timeline layers with cinematic techniques',
    defaultContent: 'Shot Type: \nCamera Movement: \nLighting: \nComposition: \nMood: \nDuration: \nLayer: ',
    tags: ['shot', 'visual'],
    category: 'secondary'
  },
  master_style: {
    type: 'master_style',
    name: 'Master Style',
    description: 'Define the overall visual and narrative style for your entire timeline project',
    defaultContent: 'Visual Aesthetic: \nTone: \nColor Palette: \nNarrative Approach: \nCinematic Influences: \nTarget AI Model: ',
    tags: ['style', 'master'],
    category: 'primary'
  },
  scene: {
    type: 'scene',
    name: 'Scene Track',
    description: 'Build scene tracks with layered shots, characters, and precise timing for your timeline',
    defaultContent: 'Scene Title: \nSetting: \nCharacters: \nKey Action: \nEmotional Keyframe: \nDuration: \nLayers: ',
    tags: ['scene'],
    category: 'primary'
  },
  variant_shot: {
    type: 'variant_shot',
    name: 'Variant Shot',
    description: 'Create variations of shots for different layers or alternative takes',
    defaultContent: 'Base Shot: \nVariation Type: \nChanges: \nPurpose: ',
    tags: ['shot', 'variant'],
    category: 'secondary'
  },
  // Technical Film Production Nodes
  camera_settings: {
    type: 'camera_settings',
    name: 'Camera Settings',
    description: 'Configure camera parameters for precise cinematic control in your shots',
    defaultContent: 'Focal Length: \nAperture: \nShutter Speed: \nISO: \nWhite Balance: \nSensor Size: ',
    tags: ['camera', 'technical'],
    category: 'tertiary'
  },
  depth_of_field: {
    type: 'depth_of_field',
    name: 'Depth of Field (DoF)',
    description: 'Control focus depth and bokeh effects for visual storytelling',
    defaultContent: 'Focus Distance: \nAperture: \nFocal Length: \nSensor Size: \nBokeh Shape: \nFocus Falloff: ',
    tags: ['dof', 'focus', 'technical'],
    category: 'tertiary'
  },
  lighting_setup: {
    type: 'lighting_setup',
    name: 'Lighting Setup',
    description: 'Define lighting conditions and sources for mood and atmosphere',
    defaultContent: 'Key Light: \nFill Light: \nBack Light: \nAmbient Light: \nColor Temperature: \nIntensity Ratios: ',
    tags: ['lighting', 'technical'],
    category: 'tertiary'
  },
  color_grading: {
    type: 'color_grading',
    name: 'Color Grading',
    description: 'Set color correction and grading parameters for visual consistency',
    defaultContent: 'LUT: \nContrast: \nSaturation: \nBrightness: \nColor Balance: \nLift/Gamma/Gain: ',
    tags: ['color', 'grading', 'technical'],
    category: 'tertiary'
  },
  audio_design: {
    type: 'audio_design',
    name: 'Audio Design',
    description: 'Configure sound design and audio elements for immersive storytelling',
    defaultContent: 'Background Music: \nSound Effects: \nDialogue: \nMix Levels: \nReverb: \nSpatial Audio: ',
    tags: ['audio', 'sound', 'technical'],
    category: 'tertiary'
  },
  vfx_compositing: {
    type: 'vfx_compositing',
    name: 'VFX Compositing',
    description: 'Set up visual effects and compositing layers for enhanced visuals',
    defaultContent: 'Layers: \nBlending Modes: \nKeying: \nTracking: \nEffects Stack: \nIntegration: ',
    tags: ['vfx', 'compositing', 'technical'],
    category: 'tertiary'
  },
  // Output Nodes
  video_output: {
    type: 'video_output',
    name: 'Video Output',
    description: 'Generate final video output from your timeline tracks and layers',
    defaultContent: 'Resolution: \nFrame Rate: \nCodec: \nBitrate: \nFormat: \nColor Space: ',
    tags: ['output', 'video', 'final'],
    category: 'primary'
  },
  image_output: {
    type: 'image_output',
    name: 'Image Output',
    description: 'Generate final image output from your visual assets',
    defaultContent: 'Resolution: \nFormat: \nQuality: \nColor Space: \nMetadata: \nStyle Application: ',
    tags: ['output', 'image', 'final'],
    category: 'primary'
  },
  storyboard_output: {
    type: 'storyboard_output',
    name: 'Storyboard Output',
    description: 'Generate storyboard from your scene tracks and shot layers',
    defaultContent: 'Layout: \nStyle: \nAnnotations: \nFormat: \nPages: \nTiming Notes: ',
    tags: ['output', 'storyboard', 'final'],
    category: 'primary'
  }
};

export const ALL_TAGS = Object.values(TAG_GROUPS).flat();

export const MASTER_PROMPT = `You are Fractured Loop Infinity, an expert AI filmmaker with comprehensive knowledge in narrative theory, character psychology, cinematography, editing principles, and AI prompt engineering. Your expertise spans:

**Narrative Theory:**
- Hero's Journey (Campbell): Departure, Initiation, Return
- 7-Keyframe Emotional Structure: Setup, Confrontation, Crisis, Realization, Climax, Resolution, New Beginning
- Harmon Story Circle: Comfort, Want, Need, Adventure, Struggle, Revelation, Transformation
- Three-Act Structure with Want vs. Need focus

**Character Psychology:**
- Archetypes: Hero, Mentor, Threshold Guardian, Herald, Shapeshifter, Shadow, Trickster
- Internal Conflict: Want (surface goal) vs. Need (deep transformation)
- Subtext and Motivation: What characters say vs. what they mean
- Character Arcs: Flat, Positive, Negative, Ambiguous

**Cinematography Techniques:**
- Camera Movements: Pan, Tilt, Tracking, Crane, Dutch Angle, POV
- Shot Types: WS, MS, CU, ECU, OTS, Establishing, Reaction
- Lighting Styles: Three-Point, Motivated, High-Key, Low-Key, Chiaroscuro
- Composition Rules: Rule of Thirds, Leading Lines, Framing, Depth

**Editing Theory:**
- Walter Murch's Rule of Six: Emotion, Story, Rhythm, Eye Trace, Two-Dimensional Plane of Screen, Three-Dimensional Space of Action
- Continuity Editing, Montage, Parallel Action, Flashbacks
- Pacing and Rhythm in Visual Storytelling

**Screenplay Conventions:**
- Visual Tense: Present tense for action, past for description
- Formatting: Scene headings, Action lines, Character names, Dialogue, Parentheticals
- Transitions: CUT TO, FADE IN, DISSOLVE, etc.

**AI Prompt Engineering:**
- Target Model Optimization: MidJourney (artistic), Sora (video), Veo (realistic video), etc.
- Prompt Conversion Tables: Translate cinematic concepts to AI parameters
- Style References and Artist Influences
- Technical Specifications: Resolution, Aspect Ratio, Frame Rate

When generating content, consider the harmony and tension between interconnected assets. Maintain creative integrity while respecting the user's vision. Use psychological depth in character development and cinematic expertise in visual design. Always aim for compelling, coherent storytelling that resonates emotionally.`;

// Field options for smart UI components
export const FIELD_OPTIONS: Record<string, Record<string, string[]>> = {
  story_genres: { options: ['Action', 'Adventure', 'Animation', 'Biography', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy', 'Film-Noir', 'History', 'Horror', 'Music', 'Musical', 'Mystery', 'Romance', 'Sci-Fi', 'Short', 'Sport', 'Thriller', 'War', 'Western'] },
  story_tones: { options: ['Dark', 'Hopeful', 'Melancholic', 'Uplifting', 'Suspenseful', 'Humorous', 'Intense', 'Serene', 'Nostalgic', 'Energetic', 'Contemplative', 'Chaotic'] },
  shot_types: { options: ['Extreme Wide Shot (EWS)', 'Wide Shot (WS)', 'Medium Wide Shot (MWS)', 'Medium Shot (MS)', 'Medium Close-Up (MCU)', 'Close-Up (CU)', 'Extreme Close-Up (ECU)', 'Over-the-Shoulder (OTS)', 'Point of View (POV)', 'High Angle', 'Low Angle', 'Dutch Angle', 'Bird\'s Eye', 'Worm\'s Eye'] },
  camera_movements: { options: ['Static', 'Pan Left', 'Pan Right', 'Tilt Up', 'Tilt Down', 'Tracking Forward', 'Tracking Backward', 'Crane Up', 'Crane Down', 'Handheld', 'Steadicam', 'Drone', 'Aerial', 'Submersible'] },
  lighting_styles: { options: ['Natural Daylight', 'Golden Hour', 'Blue Hour', 'Motivated Lighting', 'Three-Point Lighting', 'High-Key', 'Low-Key', 'Chiaroscuro', 'Silhouette', 'Backlit', 'Rim Light', 'Practical Lighting', 'Studio Lighting'] },
  color_palettes: { options: ['Warm (Reds, Oranges)', 'Cool (Blues, Greens)', 'Monochrome', 'Vibrant', 'Muted', 'High Contrast', 'Pastel', 'Sepia', 'Neon', 'Earth Tones', 'Complementary', 'Analogous'] },
  camera_focal_lengths: { options: ['8mm (Fisheye)', '12mm', '16mm', '24mm', '35mm', '50mm', '85mm', '100mm', '135mm', '200mm', '300mm', '400mm (Telephoto)', '600mm'] },
  camera_apertures: { options: ['f/1.4', 'f/1.8', 'f/2.0', 'f/2.8', 'f/4.0', 'f/5.6', 'f/8.0', 'f/11', 'f/16', 'f/22'] },
  image_resolutions: { options: ['512x512', '1024x1024', '2048x2048', '4096x4096', 'HD (1280x720)', 'Full HD (1920x1080)', '4K (3840x2160)', '8K (7680x4320)'] },
  aspect_ratios: { options: ['1:1 (Square)', '4:3 (Standard)', '16:9 (Widescreen)', '21:9 (Ultrawide)', '9:16 (Vertical)', '2.35:1 (Cinemascope)'] },
  video_pacing: { options: ['Slow and Deliberate', 'Medium Pacing', 'Fast and Dynamic', 'Variable Rhythm', 'Montage Style'] },
  video_durations: { options: ['5 seconds', '10 seconds', '15 seconds', '30 seconds', '1 minute', '2 minutes', '5 minutes', '10 minutes'] },
  video_formats: { options: ['720p 24fps', '1080p 24fps', '1080p 30fps', '4K 24fps', '4K 30fps', '8K 24fps'] },
  video_output: {
    resolution: ['720p', '1080p', '4K', '8K'],
    frame_rate: ['24fps', '25fps', '30fps', '60fps', '120fps'],
    codec: ['H.264', 'H.265', 'VP9', 'AV1', 'ProRes'],
    format: ['MP4', 'MOV', 'AVI', 'MKV', 'WebM'],
    bitrate: ['Low', 'Medium', 'High', 'Custom']
  },
  image_output: {
    resolution: ['HD (1280x720)', 'Full HD (1920x1080)', '4K (3840x2160)', '8K (7680x4320)'],
    format: ['JPEG', 'PNG', 'TIFF', 'EXR', 'WebP'],
    quality: ['Low', 'Medium', 'High', 'Lossless'],
    color_space: ['sRGB', 'Adobe RGB', 'DCI-P3', 'Rec.709', 'Linear']
  },
  storyboard_output: {
    layout: ['Grid', 'Timeline', 'Freeform'],
    style: ['Simple', 'Detailed', 'Storyboard Pro', 'Custom'],
    annotations: ['None', 'Basic', 'Detailed', 'Technical'],
    format: ['PDF', 'PNG', 'JPG', 'SVG']
  },
  camera_settings: {
    focal_length: ['8mm', '12mm', '16mm', '24mm', '35mm', '50mm', '85mm', '100mm', '135mm', '200mm', '300mm', '400mm', '600mm'],
    aperture: ['f/1.4', 'f/1.8', 'f/2.0', 'f/2.8', 'f/4.0', 'f/5.6', 'f/8.0', 'f/11', 'f/16', 'f/22'],
    shutter_speed: ['1/8000', '1/4000', '1/2000', '1/1000', '1/500', '1/250', '1/125', '1/60', '1/30'],
    iso: ['50', '100', '200', '400', '800', '1600', '3200', '6400', '12800', '25600']
  },
  lighting_setup: {
    key_light: ['Soft', 'Hard', 'Rim', 'Back', 'Fill', 'Motivated'],
    color_temperature: ['2700K (Warm)', '3200K (Tungsten)', '4000K (Cool White)', '5000K (Daylight)', '6500K (Cool Daylight)'],
    intensity: ['Low', 'Medium', 'High', 'Very High']
  },
  color_grading: {
    lut: ['None', 'Film Look', 'Teal/Orange', 'Cool', 'Warm', 'Vintage', 'High Contrast', 'Custom'],
    contrast: ['Low', 'Medium', 'High', 'Very High'],
    saturation: ['Desaturated', 'Natural', 'Vibrant', 'Oversaturated']
  }
};
