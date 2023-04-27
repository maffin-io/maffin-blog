import React from 'react';
import Link from 'next/link';

type TagProps = {
  text: string,
};

export default function Tag({ text }: TagProps): JSX.Element {
  return (
    <Link href={`/tags/${text}`}>
      <span className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
        #
        {text}
      </span>
    </Link>
  );
}
