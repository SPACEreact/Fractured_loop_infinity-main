import React from 'react';
import { WORKFLOWS } from '../types';

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      <h1>Welcome to Fractured Loop</h1>
      <p>Your AI-powered creative writing assistant</p>
      <div className="workflows">
        {WORKFLOWS.map((workflow) => (
          <div key={workflow.id} className="workflow-card">
            <h3>{workflow.name}</h3>
            <p>{workflow.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
