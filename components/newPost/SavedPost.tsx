import React from 'react';
import { NewPostProps } from '@/interfaces';

const SavedPost = ({ data, onRemove }: { data: NewPostProps; onRemove: () => void }) => {
  return (
    <li className="mb-4 flex justify-between">
      <span className="truncate mr-4">{data.title}</span>
      <button className="text-red-600 text-xs cursor-pointer" onClick={onRemove}>
        Delete?
      </button>
    </li>
  );
};

export default SavedPost;
