import React from 'react';

interface CreatePostButtonProps {
  onClick: () => void;
}

const NewPostButton: React.FC<CreatePostButtonProps> = ({ onClick }) => (
  <div className="flex justify-center lg:justify-start">
    <button
      onClick={onClick}
      className="bg-blue-500 text-white px-12 py-3 mb-8 rounded-full transition duration-500 ease transform hover:-translate-y-1 cursor-pointer"
    >
      + Add New Post
    </button>
  </div>
);

export default NewPostButton;
