import React, { useState } from 'react';
import { NewPostProps } from '@/interfaces';

const NewPostForm: React.FC<{ onSave: ({ title, body, status }: NewPostProps) => void }> = ({ onSave }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setter(e.target.value);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !body) return;

    setTitle('');
    setBody('');
    if (onSave) onSave({ title, body, status: 'pending' });
  };

  const disabled = !title || !body;

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => handleInputChange(e, setTitle)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Body:</label>
        <textarea value={body} onChange={(e) => handleInputChange(e, setBody)} className="w-full p-2 border rounded" />
      </div>

      <button
        disabled={disabled}
        type="submit"
        className={`text-white px-12 py-3 rounded-full w-full mt-8 ${disabled ? 'bg-gray-300' : 'bg-blue-600'}`}
      >
        Add to queue
      </button>
    </form>
  );
};

export default NewPostForm;
