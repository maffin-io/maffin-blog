import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="mt-16 flex flex-col items-center">
        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <Link href="/">Maffin Blog</Link>
          <div>{'\u2022'}</div>
          <div>{`\u00a9${new Date().getFullYear()}`}</div>
        </div>
      </div>
    </footer>
  );
}
