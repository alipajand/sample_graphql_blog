import React, { useState } from 'react';
import { NewPostProps } from '@/interfaces';

const NewPostForm: React.FC<{
  onSave: ({ title, body }: NewPostProps) => void;
}> = ({ onSave }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!title) return;
    if (!body) return;

    setTitle('');
    setBody('');
    if (onSave) onSave({ title, body });
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Body:</label>
        <textarea value={body} onChange={(e) => setBody(e.target.value)} className="w-full p-2 border rounded" />
      </div>

      <button type="submit" className="bg-blue-600 text-white px-12 py-3 rounded-full w-full mt-8">
        Save
      </button>
    </form>
  );
};

export default NewPostForm;
