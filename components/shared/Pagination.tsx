import React, { useState } from 'react';

interface Props {
  total: number;
  page: number;
  limit: number;
  prev: () => void;
  next: () => void;
}

const Pagination = ({ total, page, limit, prev, next }: Props) => {
  const [] = useState(1);
  const isLastPage = total / limit <= page;
  const totalPage = Math.ceil(total / limit);

  return (
    <div className="flex justify-center items-center">
      <button
        disabled={page <= 1}
        className={`my-8 text-center transition duration-500 ease transform text-sm font-medium rounded-full text-white px-8 py-3 inline-block ${
          page > 1 ? 'hover:-translate-y-1 bg-gray-500 cursor-pointer' : 'bg-gray-300'
        }`}
        onClick={prev}
      >
        Prev
      </button>

      <span className="mx-8">
        {page} / {totalPage}
      </span>

      <button
        disabled={isLastPage}
        className={`my-8 text-center transition duration-500 ease transform text-sm font-medium rounded-full text-white px-8 py-3 inline-block ${
          !isLastPage ? 'hover:-translate-y-1 bg-gray-500 cursor-pointer' : 'bg-gray-300'
        }`}
        onClick={next}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
