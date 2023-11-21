import React from 'react';

const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => {
  const inProgress = progress < 1;
  const textClass = inProgress ? 'text-yellow-600' : 'text-green-600';
  const progressBarClass = `flex items-center rounded-full p-1 ${textClass} ${
    inProgress ? 'bg-yellow-200' : 'bg-green-200'
  }`;
  const statusClass = `text-center text-white rounded-full ${inProgress ? 'bg-yellow-400' : 'bg-green-500'}`;

  if (progress === 0) return <div className="h-[33px] my-3"></div>;

  return (
    <div className="flex items-center justify-between my-3">
      <div className={progressBarClass}>
        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase ">Task Status</span>
        <div className={statusClass}>
          {inProgress ||
            (progress === 100 && (
              <span className="text-xs font-semibold inline-block py-1 px-2">
                {inProgress ? 'In Progress' : 'Completed'}
              </span>
            ))}
        </div>
      </div>
      <div className="text-right">
        <span className={`text-xs font-semibold inline-block ${textClass}`}>{`${(progress * 100).toFixed(0)}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
