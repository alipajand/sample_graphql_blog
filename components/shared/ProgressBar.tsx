import React from 'react';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="relative pt-1">
      <div className="flex mb-2 items-center justify-between">
        <div>
          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
            Task in Progress
          </span>
        </div>
        <div className="text-right">
          <span className="text-xs font-semibold inline-block text-green-600">{`${progress.toFixed(2)}%`}</span>
        </div>
      </div>
      <div className="flex mb-2 items-center justify-between">
        <div className="flex flex-col">
          <div className="w-full bg-gray-200 rounded-full">
            <div style={{ width: `${progress}%` }} className="text-center text-white bg-green-500 rounded-full">
              {progress > 0 && progress < 100 && (
                <span className="text-xs font-semibold inline-block py-1 px-2">In Progress</span>
              )}
              {progress === 100 && <span className="text-xs font-semibold inline-block py-1 px-2">Completed</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
