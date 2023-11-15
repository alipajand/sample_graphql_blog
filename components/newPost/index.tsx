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
  const [loadingProgress, setProgress] = useState(0);

  const queryClient = useQueryClient();

  const onSubmit = (e: { preventDefault: () => void }) => {
    e?.preventDefault();

    const promises = savedData.map((item: NewPostProps) => createPost({ title: item.title, body: item.body }));
    let progress = 1;

    function tick(promise: Promise<any>) {
      promise.then(function () {
        progress++;
        setProgress((progress / promises.length) * 100);
      });
      return promise;
    }

    Promise.all(promises.map(tick))
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
    result.splice(index, 1);

    setSaveData(result);
  };

  const openModal = () => setIsOpen(true);

  const closeModal = () => {
    setIsOpen(false);

    setTimeout(() => {
      setSaveData([]);
      setProgress(0);
    }, 500);
  };

  return (
    <>
      <button
        onClick={openModal}
        className="bg-blue-500 text-white px-12 py-3 mb-8 rounded-full transition duration-500 ease transform hover:-translate-y-1 cursor-pointer w-full"
      >
        + Add New Post
      </button>

      <Modal isOpen={isOpen} onClose={closeModal}>
        {isOpen && (
          <>
            <h1 className="text-2xl font-bold mb-8">Add Multiple Posts</h1>

            <div className="lg:flex block">
              <div className="flex-grow">
                <NewPostForm onSave={onSave} />
              </div>
              <div className="lg:w-[300px] lg:h-[280px] bg-gray-100 rounded-lg lg:ml-4 p-4 text-gray-500 overflow-auto text-sm">
                {savedData.length !== 0 && (
                  <ul>
                    {savedData.map((item, index) => (
                      <SavedPost
                        key={index}
                        data={item}
                        onRemove={() => {
                          onRemove(index);
                        }}
                      />
                    ))}
                  </ul>
                )}

                {savedData.length === 0 && 'No post yet...'}
              </div>
            </div>

            <div className="border-b-2 w-full my-8"></div>
            <ProgressBar progress={loadingProgress} />

            <button
              disabled={savedData.length === 0}
              className={`px-12 py-3 rounded-full w-full mt-5 ${
                savedData.length === 0 ? 'bg-gray-300 text-white' : 'bg-green-600 text-white'
              }`}
              onClick={onSubmit}
            >
              Submit
              {savedData.length !== 0 && (
                <>
                  <span className="mx-2 font-bold">{savedData.length} New</span>Posts
                </>
              )}
            </button>
          </>
        )}
      </Modal>
    </>
  );
};

export default NewPost;
