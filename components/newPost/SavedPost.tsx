import React from 'react';
import classNames from 'classnames';
import { NewPostProps } from '@/interfaces';

const SavedPost = ({ index, data, onRemove }: { index: number; data: NewPostProps; onRemove: () => void }) => {
  const textColor = classNames({
    'text-red-600': data.status === 'failed',
    'text-green-600': data.status === 'successful',
    'text-yellow-600': data.status !== 'failed' && data.status !== 'successful'
  });

  const getStatusText = () => {
    switch (data.status) {
      case 'failed':
        return 'Failed';
      case 'successful':
        return 'Successful';
      default:
        return 'Pending';
    }
  };

  const renderDeleteButton = () => {
    if (data.status === 'pending') {
      return (
        <button className="text-red-600 cursor-pointer" onClick={onRemove}>
          Delete?
        </button>
      );
    }
    return null;
  };

  return (
    <li className="mb-4 flex justify-between">
      <div className="flex flex-col w-full">
        <span className="block truncate text-black">
          {index + 1}- {data.title}
        </span>
        <span className="block truncate">{data.body}</span>
        <hr className="my-1" />
        <div className="flex text-xs">
          <span className="mr-1">Status:</span>
          <span className={`truncate mr-4 flex-grow uppercase ${textColor}`}>{getStatusText()}</span>
          {renderDeleteButton()}
        </div>
      </div>
    </li>
  );
};

export default SavedPost;
