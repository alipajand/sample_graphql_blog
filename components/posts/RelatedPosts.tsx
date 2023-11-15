import React, { useEffect, useState } from 'react';
import { Loader } from '@/components';
import { getRecentPosts } from '@/services';
import { PostInterface } from '@/interfaces';

const RelatedPosts = () => {
  const [relatedPosts, setRelatedPosts] = useState<PostInterface[]>([]);

  useEffect(() => {
    getRecentPosts().then((result) => {
      setRelatedPosts(result);
    });
  }, []);

  if (relatedPosts?.length === 0) return <Loader />;

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
      <h3 className="text-xl mb-2 font-semibold border-b pb-4">Recent Posts</h3>
      {relatedPosts.map((post, index) => (
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

export default RelatedPosts;
