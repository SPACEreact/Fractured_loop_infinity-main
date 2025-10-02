import React from 'react';
import { Build } from '../types';

interface WelcomeScreenProps {
  builds: Build[];
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ builds }) => {
  return (
    <div className="welcome-screen">
      <h1>Welcome to Fractured Loop</h1>
      <div className="builds-grid">
        {builds.map((build) => (
          <div key={build.id} className="build-card">
            {build.icon && <img src={build.icon} alt={build.name} />}
            <h3>{build.name}</h3>
            <p>{build.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WelcomeScreen;
