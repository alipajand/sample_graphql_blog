import React from 'react';

import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="border-b w-full inline-block py-8">
        <div className="text-center">
          <Link href="/">
            <span className="cursor-pointer font-bold text-4xl">GraphQl Sample Blog</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
