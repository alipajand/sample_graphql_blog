// ProgressBar.tsx
import React from 'react';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => (
  <div className="mt-4">
    <progress value={progress} max="100"></progress>
    <p>{Math.round(progress)}% Complete</p>
  </div>
);

export default ProgressBar;
