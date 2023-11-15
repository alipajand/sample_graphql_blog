import React, { useEffect, useState } from 'react';
import { PostInterface } from '@/interfaces';
import { Pagination, PostCard } from '@/components';

const limit = 5;

const PostPagination = ({ data }: { data: PostInterface[] }) => {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<PostInterface[]>([]);

  useEffect(() => {
    if (data) {
      const start = (page - 1) * limit;
      const end = start + limit;

      setItems(data.slice(start, end));
    }
  }, [data, page]);

  return (
    <>
      {items?.map((post: PostInterface, index: number) => <PostCard key={index} post={post} />)}

      <Pagination
        page={page}
        limit={limit}
        total={data?.length || 0}
        prev={() => setPage((prev) => prev - 1)}
        next={() => setPage((prev) => prev + 1)}
      />
    </>
  );
};

export default PostPagination;
