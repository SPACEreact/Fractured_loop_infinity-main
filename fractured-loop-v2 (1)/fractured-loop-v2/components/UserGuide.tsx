import React from 'react';
import { ChevronDownIcon, XMarkIcon } from './IconComponents';

const UserGuide: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="user-guide">
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <XMarkIcon className="w-6 h-6" /> : 'Help'}
      </button>
      {isOpen && (
        <div className="guide-content">
          <h2>User Guide</h2>
          <p>Welcome to Fractured Loop! Here's how to use the application...</p>
        </div>
      )}
    </div>
  );
};

export default UserGuide;
