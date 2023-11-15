import React from 'react';
import { usePostsQuery } from '@/hooks/usePostsQuery';
import { Loader, NewPost, PostPagination, RecentPosts } from '@/components';

const Index = () => {
  const { data, isLoading, refetch } = usePostsQuery();

  if (isLoading) return <Loader />;

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-8 gap-4">
        <div className="lg:col-span-8 col-span-1">
          <PostPagination data={data?.data} />
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <NewPost onAddPost={refetch} />
            <RecentPosts data={data?.data.slice(0, 5)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
