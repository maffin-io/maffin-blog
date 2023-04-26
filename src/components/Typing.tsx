import React from 'react';
import Link from 'next/link';

export default function Typing(): JSX.Element {
  return (
    <p className="overflow-hidden whitespace-nowrap font-mono text-lg leading-7 text-gray-500 animate-typing">
      <span>
        everything
        {' '}
      </span>
      <span className="text-emerald-500">
        <Link href="/tags/travel">travel</Link>
      </span>
      <span>
        ,
        {' '}
      </span>
      <span className="text-sky-500">
        <Link href="/tags/engineering">engineering</Link>
      </span>
      <span>
        {' '}
        and
        {' '}
      </span>
      <span className="text-orange-500">
        <Link href="/tags/finance">finance</Link>
      </span>
    </p>
  );
}
