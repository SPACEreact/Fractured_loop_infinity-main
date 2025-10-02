import React from 'react';
import { Track, Layer, TimelineItem, Project } from '../types';

interface TimelineProps {
  project: Project;
  selectedNodeId?: string;
  selectedConnectionId?: string;
}

const Timeline: React.FC<TimelineProps> = ({ project, selectedNodeId, selectedConnectionId }) => {
  const timelineRef = React.useRef<HTMLDivElement>(null);

  return (
    <div className="timeline" ref={timelineRef}>
      <div className="tracks">
        {project.tracks?.map((track) => (
          <div key={track.id} className="track">
            <div className="track-header">{track.name}</div>
            <div className="track-items">
              {track.items.map((item) => (
                <div key={item.id} className="timeline-item">
                  {item.content}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="timeline-items">
        {project.timelineItems?.map((item) => (
          <div key={item.id} className="timeline-item">
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
