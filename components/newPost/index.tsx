import React, { useState } from 'react';
import { useQueryClient } from 'react-query';

import { createPost } from '@/services';
import { NewPostProps } from '@/interfaces';
import { Modal, SavedPost, NewPostForm, ProgressBar } from '@/components';

interface NewPostFormProps {
  onAddPost: () => void;
}

const NewPost: React.FC<NewPostFormProps> = ({ onAddPost }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [savedData, setSaveData] = useState<NewPostProps[]>([]);

  const queryClient = useQueryClient();

  const onSubmit = (e: { preventDefault: () => void }) => {
    e?.preventDefault();

    const promises = savedData.map((item: NewPostProps) => createPost({ title: item.title, body: item.body }));
    Promise.all(promises)
      .then((res) => console.log(res))
      .finally(() => {
        queryClient.invalidateQueries('posts');
        onAddPost();
        closeModal();
      });
  };

  const onSave = (newData: NewPostProps) => {
    setSaveData((prev: NewPostProps[]) => {
      return [...prev, newData];
    });
  };

  const onRemove = (index: number) => {
    const result = [...savedData];
    result.splice(index, 1)

    setSaveData(result);
  };

  const openModal = () => setIsOpen(true);

  const closeModal = () => {
    setSaveData([]);
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
            <h1 className="text-2xl font-bold mb-8">Add Multiple Posts</h1>

            <div className="lg:flex block">
              <div className="flex-grow">
                <NewPostForm onSave={onSave} />
              </div>
              <div className="lg:w-[300px] lg:pl-8 text-gray-500">
                {savedData.length !== 0 && (
                  <ul>
                    {savedData.map((item, index) => (
                      <>
                        {index + 1}-
                        <SavedPost
                          key={index}
                          data={item}
                          onRemove={() => {
                            onRemove(index);
                          }}
                        />
                      </>
                    ))}
                  </ul>
                )}

                {savedData.length === 0 && 'No post yet...'}
              </div>
            </div>

            <div className="border-b-2 w-full my-8"></div>
            <ProgressBar progress={0} />

            <button
              disabled={savedData.length === 0}
              className={`px-12 py-3 rounded-full w-full mt-5 ${
                savedData.length === 0 ? 'bg-gray-300 text-white' : 'bg-blue-600 text-white'
              }`}
              onClick={onSubmit}
            >
              Submit
              {savedData.length !== 0 && <>{savedData.length} Posts</>}
            </button>
          </>
        )}
      </Modal>
    </>
  );
};

export default NewPost;
