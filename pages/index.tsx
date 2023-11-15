import { PostPagination, RelatedPosts } from '@/components';
import React from 'react';

const NewPost = () => {
  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-8 gap-4">
        <div className="lg:col-span-8 col-span-1">
          <PostPagination />
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <RelatedPosts />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPost;
