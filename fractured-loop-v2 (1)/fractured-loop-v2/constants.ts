export const BUILD_TYPES = [
  {
    id: 'storybuild',
    name: 'Story Build',
    description: 'Guided build for story elements including character, world, and plot.',
  },
  {
    id: 'shotbuild',
    name: 'Shot Build',
    description: 'Guided build for cinematic shots including camera, lighting, and composition.',
  },
  {
    id: 'imgbuild',
    name: 'Image Build',
    description: 'Guided build for AI image generation prompts with context awareness.',
  },
  {
    id: 'vidbuild',
    name: 'Video Build',
    description: 'Guided build for video scene planning including camera movement and mood.',
  },
  {
    id: 'editbuild',
    name: 'Edit Build',
    description: 'Guided build for video editing suggestions and seed tracking.',
  },
];

// Example questions for StoryBuild (can be expanded)
export const STORYBUILD_QUESTIONS = [
  {
    id: 'character_name',
    text: 'What is the character\'s full name?',
    type: 'text',
    required: true,
  },
  {
    id: 'character_age',
    text: 'What is the character\'s age or age range?',
    type: 'text',
    required: true,
  },
  {
    id: 'character_backstory',
    text: 'Briefly describe the character\'s backstory.',
    type: 'text',
  },
  {
    id: 'character_want',
    text: 'What does the character want?',
    type: 'text',
  },
  {
    id: 'character_need',
    text: 'What does the character truly need to learn or overcome?',
    type: 'text',
  },
  // Add more questions as per the detailed documentation
];

// Similarly, define questions for ShotBuild, ImgBuild, VidBuild, EditBuild as needed

// Field options for dropdowns based on knowledge base
export const FIELD_OPTIONS = {
  storybuild: [
    // From screenplay_conventions_and_archetypes.md
    { id: 'character_archetype_hero', name: 'Hero', description: 'The protagonist who drives the story forward.' },
    { id: 'character_archetype_mentor', name: 'Mentor', description: 'The wise guide who helps the hero.' },
    { id: 'character_archetype_villain', name: 'Villain', description: 'The antagonist opposing the hero.' },
    { id: 'character_archetype_trickster', name: 'Trickster', description: 'The mischievous character who challenges norms.' },
    { id: 'scene_structure_setup', name: 'Setup', description: 'Establishing the world and characters.' },
    { id: 'scene_structure_confrontation', name: 'Confrontation', description: 'The main conflict or challenge.' },
    { id: 'scene_structure_resolution', name: 'Resolution', description: 'The conclusion and aftermath.' },
    // From story_idea_generation_notes.md
    { id: 'brainstorming_mind_mapping', name: 'Mind Mapping', description: 'Visual brainstorming technique.' },
    { id: 'brainstorming_free_writing', name: 'Free Writing', description: 'Unstructured writing to generate ideas.' },
    { id: 'brainstorming_character_driven', name: 'Character-Driven Plots', description: 'Stories centered on character development.' },
    { id: 'genre_tropes', name: 'Tropes', description: 'Common genre conventions.' },
    { id: 'genre_subversions', name: 'Subversions', description: 'Twisting traditional genre expectations.' },
    // From logline_notes.md
    { id: 'logline_protagonist', name: 'Protagonist', description: 'The main character.' },
    { id: 'logline_conflict', name: 'Conflict', description: 'The central problem or challenge.' },
    { id: 'logline_stakes', name: 'Stakes', description: 'What is at risk in the story.' },
    { id: 'logline_concise', name: 'Concise Writing', description: 'Keep the logline brief.' },
    { id: 'logline_hook', name: 'Include Hook', description: 'Add an intriguing element.' },
    { id: 'logline_uniqueness', name: 'Show Uniqueness', description: 'Highlight what makes the story special.' },
    // From screenwriting_day6_notes.md
    { id: 'plot_three_act', name: 'Three-Act Structure', description: 'Classic story structure.' },
    { id: 'plot_hero_journey', name: 'Hero\'s Journey', description: 'Mythic story arc.' },
    { id: 'character_backstory', name: 'Backstory', description: 'Character\'s past experiences.' },
    { id: 'character_motivation', name: 'Motivation', description: 'What drives the character.' },
    { id: 'character_arc', name: 'Character Arc', description: 'How the character changes.' },
  ],
  shotbuild: [
    // From film_techniques_notes.md
    { id: 'lighting_three_point', name: 'Three-Point Lighting', description: 'Key, fill, and back light setup.' },
    { id: 'lighting_rembrandt', name: 'Rembrandt Lighting', description: 'Creates dramatic shadows.' },
    { id: 'lighting_high_key', name: 'High-Key Lighting', description: 'Bright, even lighting.' },
    { id: 'lighting_low_key', name: 'Low-Key Lighting', description: 'Dark, moody lighting.' },
    { id: 'camera_pan', name: 'Pan', description: 'Horizontal camera movement.' },
    { id: 'camera_tilt', name: 'Tilt', description: 'Vertical camera movement.' },
    { id: 'camera_dolly', name: 'Dolly', description: 'Forward/backward movement.' },
    { id: 'camera_tracking', name: 'Tracking', description: 'Following the subject.' },
    { id: 'composition_rule_thirds', name: 'Rule of Thirds', description: 'Dividing frame into thirds.' },
    { id: 'composition_leading_lines', name: 'Leading Lines', description: 'Lines guiding the eye.' },
    { id: 'composition_symmetry', name: 'Symmetry', description: 'Balanced composition.' },
    // From camera_movement_notes.md
    { id: 'camera_static', name: 'Static Shot', description: 'Fixed camera position.' },
    { id: 'camera_zoom', name: 'Zoom', description: 'Changing focal length.' },
    { id: 'camera_dolly_zoom', name: 'Dolly Zoom', description: 'Vertigo effect.' },
    { id: 'camera_steadicam', name: 'Steadicam', description: 'Smooth handheld movement.' },
    { id: 'camera_handheld', name: 'Handheld', description: 'Unsteady, documentary style.' },
  ],
  imgbuild: [
    // From film_techniques_notes.md
    { id: 'lighting_three_point', name: 'Three-Point Lighting', description: 'Key, fill, and back light setup.' },
    { id: 'lighting_rembrandt', name: 'Rembrandt Lighting', description: 'Creates dramatic shadows.' },
    { id: 'lighting_high_key', name: 'High-Key Lighting', description: 'Bright, even lighting.' },
    { id: 'lighting_low_key', name: 'Low-Key Lighting', description: 'Dark, moody lighting.' },
    { id: 'camera_pan', name: 'Pan', description: 'Horizontal camera movement.' },
    { id: 'camera_tilt', name: 'Tilt', description: 'Vertical camera movement.' },
    { id: 'camera_dolly', name: 'Dolly', description: 'Forward/backward movement.' },
    { id: 'camera_tracking', name: 'Tracking', description: 'Following the subject.' },
    { id: 'composition_rule_thirds', name: 'Rule of Thirds', description: 'Dividing frame into thirds.' },
    { id: 'composition_leading_lines', name: 'Leading Lines', description: 'Lines guiding the eye.' },
    { id: 'composition_symmetry', name: 'Symmetry', description: 'Balanced composition.' },
    // From camera_movement_notes.md
    { id: 'camera_static', name: 'Static Shot', description: 'Fixed camera position.' },
    { id: 'camera_zoom', name: 'Zoom', description: 'Changing focal length.' },
    { id: 'camera_dolly_zoom', name: 'Dolly Zoom', description: 'Vertigo effect.' },
    { id: 'camera_steadicam', name: 'Steadicam', description: 'Smooth handheld movement.' },
    { id: 'camera_handheld', name: 'Handheld', description: 'Unsteady, documentary style.' },
    // From scene_writing_and_opening_hooks.md
    { id: 'hook_action', name: 'Start with Action', description: 'Begin with exciting events.' },
    { id: 'hook_question', name: 'Pose a Question', description: 'Raise curiosity.' },
    { id: 'hook_intrigue', name: 'Intrigue the Audience', description: 'Create mystery.' },
    { id: 'transition_fade', name: 'Fade In/Out', description: 'Gradual transitions.' },
    { id: 'transition_cut', name: 'Cut To', description: 'Instant scene change.' },
    { id: 'transition_dissolve', name: 'Dissolve', description: 'Overlapping scenes.' },
  ],
};

export interface NodeTemplate {
  id: string;
  name: string;
  type: string;
  description: string;
  defaultData: any;
}

export const NODE_TEMPLATES: NodeTemplate[] = [
  // Add default node templates here
];
