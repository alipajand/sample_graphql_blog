import React from 'react';
import { PostInterface } from '@/interfaces';

const RecentPosts = ({ data }: { data: PostInterface[] }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
      <h3 className="text-xl mb-2 font-semibold border-b pb-4">Recent Posts</h3>
      {data?.map((post, index) => (
        <div
          key={index}
          className="w-full py-4 border-b-2 hover:text-blue-500 cursor-pointer transition duration-500 ease transform"
        >
          {post.title}
        </div>
      ))}
    </div>
  );
};

export default RecentPosts;
