import React, { useCallback, useState } from 'react';
import { useQueryClient } from 'react-query';
import { createPost } from '@/services';
import { NewPostProps, PostInterface } from '@/interfaces';
import { Modal, NewPostForm, ProgressBar, SavedPost } from '@/components';

const NewPost = ({ onAddPost }: { onAddPost: (posts: PostInterface[]) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showResult, toggleResult] = useState(false);
  const [savedData, setSaveData] = useState<NewPostProps[]>([]);
  const [loadingProgress, setProgress] = useState(0);

  const queryClient = useQueryClient();

  const onSummary = useCallback(() => {
    setProgress(1);
    toggleResult(true);
  }, [toggleResult, setProgress]);

  const onSubmit = useCallback(
    async (e: { preventDefault: () => void }) => {
      e?.preventDefault();

      const promises = savedData.map((item: NewPostProps) => createPost({ title: item.title, body: item.body }));
      const errors: number[] = [];
      await Promise.all(
        promises.map(async (promise, index) => {
          try {
            setProgress((index + 0.5) / promises.length);
            return await promise;
          } catch (error) {
            errors.push(index);
            console.log(error);
          }
        })
      );

      setSaveData((prev: NewPostProps[]) =>
        prev.map((item: PostInterface, index) => ({
          ...item,
          status: errors.includes(index) ? 'failed' : 'successful'
        }))
      );

      onSummary();
    },
    [setProgress, setSaveData, onSummary]
  );

  const addToQueue = useCallback(
    (newData: NewPostProps) => {
      setSaveData((prev: NewPostProps[]) => [...prev, newData]);
    },
    [setSaveData]
  );

  const removeFromQueue = useCallback(
    (index: number) => {
      setSaveData((prev: NewPostProps[]) => {
        const result = [...prev];
        result.splice(index, 1);
        return result;
      });
    },
    [setSaveData]
  );

  const allowToCloseModal = loadingProgress === 0 || loadingProgress === 1;
  const openModal = () => setIsOpen(true);

  const closeModal = useCallback(() => {
    if (!allowToCloseModal) return;

    setIsOpen(false);
    setSaveData([]);
    toggleResult(false);

    /**
     * update the list of posts
     */
    onAddPost(savedData.filter((item) => item.status === 'successful'));

    /**
     * get new data
     */
    queryClient.invalidateQueries('posts');
  }, [allowToCloseModal, setIsOpen, setSaveData, toggleResult, onAddPost, savedData, queryClient]);

  return (
    <>
      <button onClick={openModal} className="bg-blue-500 text-white px-12 py-3 mb-8 rounded-full cursor-pointer w-full">
        + Add New Post
      </button>

      <Modal isOpen={isOpen} onClose={closeModal}>
        {isOpen && (
          <>
            <h1 className="text-2xl font-bold mb-5 text-center">Add Multiple Posts</h1>

            <hr className="my-5" />

            <div className="lg:flex block">
              {!showResult && (
                <div className="flex-grow">
                  <NewPostForm onSave={addToQueue} />
                </div>
              )}
              <div
                className={`${
                  showResult ? 'w-full' : 'lg:w-[300px] lg:ml-4'
                } lg:h-[280px] bg-gray-100 rounded-lg p-4 text-gray-500 overflow-auto text-sm`}
              >
                {savedData.length !== 0 ? (
                  <ul>
                    {savedData.map((item, index) => (
                      <SavedPost key={index} index={index} data={item} onRemove={() => removeFromQueue(index)} />
                    ))}
                  </ul>
                ) : (
                  'No post in queue yet...'
                )}
              </div>
            </div>

            <hr className="mb-5 mt-8" />

            <ProgressBar progress={loadingProgress} />

            <div className="flex items-center">
              {!showResult && (
                <button
                  disabled={savedData.length === 0 || !allowToCloseModal}
                  className={`px-12 py-3 rounded-full flex-grow ${
                    savedData.length === 0 || loadingProgress > 0 ? 'bg-gray-300 text-white' : 'bg-green-600 text-white'
                  }`}
                  onClick={onSubmit}
                >
                  {loadingProgress > 0 ? (
                    'Uploading...'
                  ) : (
                    <>
                      Submit
                      {savedData.length !== 0 && (
                        <>
                          <span className="mx-2 font-bold">{savedData.length} New</span>Posts
                        </>
                      )}
                    </>
                  )}
                </button>
              )}

              <button
                disabled={!allowToCloseModal}
                className={`py-3 px-6 rounded-full ml-3 ${
                  !allowToCloseModal ? 'bg-gray-200 text-gray-500' : 'bg-black text-white'
                } ${showResult ? 'flex-grow' : ''}`}
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </>
        )}
      </Modal>
    </>
  );
};

export default NewPost;
