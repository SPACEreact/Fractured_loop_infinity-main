// Knowledge files content (hardcoded for simplicity)
const filmTechniquesNotes = `# Film Techniques Notes

## Lighting Techniques
- Three-point lighting: Key, fill, back light
- Rembrandt lighting: Creates dramatic shadows
- High-key vs low-key lighting

## Camera Movements
- Pan: Horizontal movement
- Tilt: Vertical movement
- Dolly: Forward/backward movement
- Tracking: Following subject

## Composition Rules
- Rule of thirds
- Leading lines
- Symmetry and asymmetry`;

const screenplayConventionsNotes = `# Screenplay Conventions and Archetypes

## Character Archetypes
- Hero
- Mentor
- Villain
- Trickster

## Scene Structure
- Setup
- Confrontation
- Resolution`;

const subtextNotes = `# Subtext Notes

## What is Subtext?
- Unspoken meaning beneath dialogue
- Emotional undercurrents

## Techniques
- Irony
- Implication
- Non-verbal cues`;

const sceneWritingNotes = `# Scene Writing and Opening Hooks

## Opening Hooks
- Start with action
- Pose a question
- Intrigue the audience

## Scene Transitions
- Fade in/out
- Cut to
- Dissolve`;

const cameraMovementNotes = `# Camera Movement Notes

## Basic Movements
- Static shot
- Pan
- Tilt
- Zoom

## Advanced Techniques
- Dolly zoom
- Steadicam
- Handheld`;

const screenwritingDay6Notes = `# Screenwriting Day 6 Notes

## Plot Structure
- Three-act structure
- Hero's journey

## Character Development
- Backstory
- Motivation
- Arc`;

const storyIdeaNotes = `# Story Idea Generation Notes

## Brainstorming Techniques
- Mind mapping
- Free writing
- Character-driven plots

## Genre Considerations
- Tropes
- Subversions`;

const loglineNotes = `# Screenwriting Logline Plot Exposure Notes

## Logline Elements
- Protagonist
- Conflict
- Stakes

## Writing Tips
- Keep it concise
- Include hook
- Show uniqueness`;

const fracturedLoopNotes = `# Fractured Loop Build System Notes

## Overview
- AI-assisted filmmaking system
- Stepwise guidance
- Seed/ID logic for context transfer

## Builds
- StoryBuild
- ShotBuild
- ImgBuild
- VidBuild
- EditBuild

## Core Logic
- Seed & ID System
- Context Awareness
- Confirmation before mutations`;

interface KnowledgeSection {
  title: string;
  content: string;
  file: string;
}

class KnowledgeService {
  private knowledgeFiles: Record<string, string>;

  constructor() {
    this.knowledgeFiles = {
      'film_techniques_notes.md': filmTechniquesNotes,
      'screenplay_conventions_and_archetypes.md': screenplayConventionsNotes,
      'subtext_notes.md': subtextNotes,
      'scene_writing_and_opening_hooks.md': sceneWritingNotes,
      'camera_movement_notes.md': cameraMovementNotes,
      'screenwriting_day6_notes.md': screenwritingDay6Notes,
      'story_idea_generation_notes.md': storyIdeaNotes,
      'screenwriting_logline_plot_exposure_notes.md': loglineNotes,
      'fractured_loop_build_system_notes.md': fracturedLoopNotes,
    };
  }

  // Search knowledge base for a query, return relevant sections with context
  search(query: string, maxResults = 5): KnowledgeSection[] {
    const results: KnowledgeSection[] = [];
    const lowerQuery = query.toLowerCase();

    for (const [file, content] of Object.entries(this.knowledgeFiles)) {
      const lines = content.split('\n');
      let currentTitle = '';
      let currentContent: string[] = [];
      let matched = false;

      for (const line of lines) {
        if (line.startsWith('#')) {
          // Save previous section if matched
          if (matched && currentTitle && currentContent.length > 0) {
            results.push({
              title: currentTitle,
              content: currentContent.join('\n').trim(),
              file
            });
            if (results.length >= maxResults) return results;
          }
          currentTitle = line.replace(/^#+\s*/, '');
          currentContent = [];
          matched = false;
        } else {
          currentContent.push(line);
          if (!matched && line.toLowerCase().includes(lowerQuery)) {
            matched = true;
          }
        }
      }
      // Add last section if matched
      if (matched && currentTitle && currentContent.length > 0) {
        results.push({
          title: currentTitle,
          content: currentContent.join('\n').trim(),
          file
        });
        if (results.length >= maxResults) return results;
      }
    }
    return results;
  }

  // Get full content of a specific file
  getFileContent(fileName: string): string | null {
    return this.knowledgeFiles[fileName] || null;
  }

  // Get all available knowledge files
  getAvailableFiles(): string[] {
    return Object.keys(this.knowledgeFiles);
  }
}

const knowledgeService = new KnowledgeService();
export default knowledgeService;
