import React from 'react';

interface NewPostFormProps {
  posts: {
    title: string;
    body: string;
  }[];
  onTitleChange: (value: string, index: number) => void;
  onBodyChange: (value: string, index: number) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const NewPostForm: React.FC<NewPostFormProps> = ({ posts, onTitleChange, onBodyChange, onSubmit, isLoading }) => (
  <form onSubmit={onSubmit}>
    {posts.map((post, index) => (
      <div key={index} className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
        <input
          type="text"
          value={post.title}
          onChange={(e) => onTitleChange(e.target.value, index)}
          className="w-full p-2 border rounded"
        />
        <label className="block text-gray-700 text-sm font-bold mb-2 mt-2">Body:</label>
        <textarea
          value={post.body}
          onChange={(e) => onBodyChange(e.target.value, index)}
          className="w-full p-2 border rounded"
        />
      </div>
    ))}

    <button type="submit" disabled={isLoading} className="bg-blue-600 text-white px-12 py-3 rounded-full w-full mt-8">
      Add Posts
    </button>
  </form>
);

export default NewPostForm;
