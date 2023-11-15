import React, { useEffect, useState } from 'react';
import { usePostsQuery } from '@/hooks/usePostsQuery';
import { PostInterface } from '@/interface/post';
import { Loader, NewPostForm, PostCard } from '@/components';

const limit = 5;

const PostPagination = () => {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<PostInterface[]>([]);
  const { data, isLoading, refetch, isRefetching } = usePostsQuery({ page });

  const lastPage = (data?.data?.length || 0) / limit <= page;

  const onAddPost = async () => {
    const { data } = await refetch();
    if (data) {
      setPage(1);
      setItems(data.data);
    }
  };

  useEffect(() => {
    if (data) {
      const start = (page - 1) * limit;
      const end = start + limit;

      setItems(data.data.slice(start, end));
    }
  }, [data, page]);

  if (isLoading || isRefetching) return <Loader />;

  return (
    <>
      <NewPostForm onAddPost={onAddPost} />

      {items?.map((post: PostInterface, index: number) => <PostCard key={index} post={post} />)}

      <div className="flex justify-center items-center">
        <button
          disabled={page <= 1}
          className={`my-8 text-center transition duration-500 ease transform text-sm font-medium rounded-full text-white px-8 py-3 inline-block ${
            page > 1 ? 'hover:-translate-y-1 bg-gray-500 cursor-pointer' : 'bg-gray-300'
          }`}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Prev
        </button>

        <span className="mx-8">
          {page} / {(data?.data?.length || 0) / limit}
        </span>

        <button
          disabled={lastPage}
          className={`my-8 text-center transition duration-500 ease transform text-sm font-medium rounded-full text-white px-8 py-3 inline-block ${
            !lastPage ? 'hover:-translate-y-1 bg-gray-500 cursor-pointer' : 'bg-gray-300'
          }`}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default PostPagination;
