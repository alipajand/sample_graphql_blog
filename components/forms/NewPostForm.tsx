import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Modal } from '@/components';
import { createPost } from '@/services';

interface NewPostFormProps {
  onAddPost: () => void;
}

const NewPostForm: React.FC<NewPostFormProps> = ({ onAddPost }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const queryClient = useQueryClient();

  const createPostMutation = useMutation(
    async () => {
      const res = await createPost({ title, body });
      console.log(res);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('posts');
        onAddPost();
        closeModal();
      }
    }
  );

  const handleAddPost = (e: { preventDefault: () => void }) => {
    e?.preventDefault();
    createPostMutation.mutate();
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setTitle('');
    setBody('');
    setIsOpen(false);
  };

  return (
    <>
      <div className="flex justify-center lg:justify-start">
        <button
          onClick={openModal}
          className="bg-blue-500 text-white px-12 py-3 mb-8 rounded-full transition duration-500 ease transform hover:-translate-y-1 cursor-pointer"
        >
          + Add New Post
        </button>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal}>
        {isOpen && (
          <>
            <h1 className="text-2xl font-bold mb-8">Add New Post</h1>
            <form onSubmit={handleAddPost}>
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
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <button
                type="submit"
                disabled={createPostMutation.isLoading}
                className="bg-blue-600 text-white px-12 py-3 rounded-full w-full mt-8"
              >
                Add Post
              </button>
            </form>
          </>
        )}
      </Modal>
    </>
  );
};

export default NewPostForm;
