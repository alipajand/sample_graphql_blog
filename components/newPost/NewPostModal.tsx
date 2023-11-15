import React from 'react';
import { Modal, NewPostForm, ProgressBar } from '@/components';

interface NewPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  posts: {
    title: string;
    body: string;
  }[];
  onTitleChange: (value: string, index: number) => void;
  onBodyChange: (value: string, index: number) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  progress: number;
}

const NewPostModal: React.FC<NewPostModalProps> = ({
  isOpen,
  onClose,
  posts,
  onTitleChange,
  onBodyChange,
  onSubmit,
  isLoading,
  progress
}) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    {isOpen && (
      <>
        <h1 className="text-2xl font-bold mb-8">Add New Posts</h1>
        <NewPostForm
          posts={posts}
          onTitleChange={onTitleChange}
          onBodyChange={onBodyChange}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
        <ProgressBar progress={progress} />
      </>
    )}
  </Modal>
);

export default NewPostModal;
