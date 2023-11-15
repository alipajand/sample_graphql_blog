import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { createPost } from '@/services';
import { NewPostButton, NewPostModal } from '@/components';

interface NewPostFormProps {
  onAddPost: () => void;
}

const NewPost: React.FC<NewPostFormProps> = ({ onAddPost }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [posts, setPosts] = useState([{ title: '', body: '' }]);
  const [progress, setProgress] = useState(0);

  const queryClient = useQueryClient();
  const isProcessing = useState(false)[1];

  const createPostMutation = useMutation(
    async (postData: { title: string; body: string }) => {
      const res = await createPost(postData);
      console.log(res);
    },
    {
      onSuccess: () => {
        setProgress((prev) => prev + 100 / posts.length);
        if (posts.length > 0) {
          processNextPost();
        } else {
          queryClient.invalidateQueries('posts');
          closeModal();
          onAddPost();
        }
      }
    }
  );

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();

    setPosts([...posts]);

    if (!isProcessing) {
      processNextPost();
    }
  };

  const processNextPost = () => {
    if (posts.length > 0) {
      const nextPost = posts[0];
      isProcessing(true);
      createPostMutation.mutate(nextPost);
      setPosts((prev) => prev.slice(1));
    } else {
      isProcessing(false);
    }
  };

  const openModal = () => {
    setIsOpen(true);
    setPosts([{ title: '', body: '' }]);
    setProgress(0);
  };

  const closeModal = () => {
    setIsOpen(false);
    setPosts([{ title: '', body: '' }]);
    setProgress(0);
  };

  const handleTitleChange = (value: string, index: number) => {
    setPosts((prev) => prev.map((post, i) => (i === index ? { ...post, title: value } : post)));
  };

  const handleBodyChange = (value: string, index: number) => {
    setPosts((prev) => prev.map((post, i) => (i === index ? { ...post, body: value } : post)));
  };

  return (
    <>
      <NewPostButton onClick={() => setIsOpen(true)} />
      <NewPostModal
        isOpen={isOpen}
        onClose={closeModal}
        posts={posts}
        onTitleChange={handleTitleChange}
        onBodyChange={handleBodyChange}
        onSubmit={handleAddPost}
        isLoading={createPostMutation.isLoading}
        progress={progress}
      />
    </>
  );
};

export default NewPost;
