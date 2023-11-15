import React from 'react';
import Image from 'next/image';
import { PostInterface } from '@/interfaces';

const PostCard = ({ post }: { post: PostInterface }) => (
  <div className="bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8">
    <div className="relative overflow-hidden shadow-md pb-80 mb-8 bg-gray-100">
      <Image
        fill
        src="/vercel.svg"
        alt=""
        className="w-full object-fill shadow-lg rounded-t-lg lg:rounded-lg opacity-10 px-10"
      />
    </div>

    <div className="px-8 text-center">
      <h1 className="transition duration-700 text-center mb-4 cursor-pointer hover:text-blue-600 text-3xl font-semibold">
        {post.title}
      </h1>
      <p className="mb-8 text-gray-700">{post.body}</p>
      <div className="mb-8 text-gray-700">Author: {post?.user?.name}</div>
    </div>
  </div>
);

export default PostCard;
