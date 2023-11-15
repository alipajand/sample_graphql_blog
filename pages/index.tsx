import React, { useState } from 'react';
import { PostInterface } from '@/interfaces';
import { usePostsQuery } from '@/hooks/usePostsQuery';
import { Loader, NewPost, PostPagination, RecentPosts } from '@/components';

const Index = () => {
  const [newData, setNewData] = useState<PostInterface[]>([]);
  const { data, isLoading, refetch } = usePostsQuery();

  if (isLoading) return <Loader />;

  const onFetch = (items: PostInterface[] = []) => {
    refetch();
    setNewData(items);
  };

  const result = [...newData, ...data?.data];

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-8 gap-4">
        <div className="lg:col-span-8 col-span-1">
          <PostPagination data={result} />
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <NewPost onAddPost={onFetch} />
            <RecentPosts data={result.slice(0, 5)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
