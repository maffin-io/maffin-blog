import React from 'react';
import Link from 'next/link';

import '@/css/prism.css';
import { Post } from '@/app/api/getPosts';
import TableOfContents from '@/components/TableOfContents';
import Tag from '@/components/Tag';

export type PostDetailProps = {
  post: Post;
};

export default function PostDetail(
  { post }: PostDetailProps,
): JSX.Element {
  return (
    <article>
      <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
        <header className="pt-6 xl:pb-6">
          <div className="space-y-1 text-center">
            <div>
              <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
                {post.title}
              </h1>
            </div>
          </div>
        </header>

        <div
          className="divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0"
          style={{ gridTemplateRows: 'auto 1fr' }}
        >
          <div className="sticky top-14 prose border-r-[1px] divide-gray-200 dark:divide-gray-700 mt-10 pt-4 pb-8">
            <div className="text-sm font-medium leading-5 xl:col-start-1 xl:row-start-2">
              <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Table of contents
              </h2>
              <TableOfContents post={post} />
            </div>
            <div className="divide-gray-200 text-sm font-medium leading-5 dark:divide-gray-700 xl:col-start-1 xl:row-start-2 xl:divide-y">
              {post.tags && (
                <div className="py-4 xl:py-8">
                  <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Tags
                  </h2>
                  <div className="flex flex-wrap">
                    {post.tags.map((tag) => (
                      <Tag key={tag} text={tag} />
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="divide-gray-200 font-medium leading-5 dark:divide-gray-700 xl:col-start-1 xl:row-start-2 xl:divide-y">
              <div className="pt-4 xl:pt-8">
                <Link
                  href="/"
                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  &larr; Back to the blog
                </Link>
              </div>
            </div>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
            <div className="prose prose-img:mx-auto max-w-none pt-10 pb-8 dark:prose-dark">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
