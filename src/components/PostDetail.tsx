import React from 'react';
import Link from 'next/link';

import '@/css/prism.css';
import { Post } from '@/app/api/getPosts';
import TableOfContents from '@/components/TableOfContents';
import TagsWidget from './TagsWidget';

export type PostDetailProps = {
  post: Post;
};

export default function PostDetail(
  { post }: PostDetailProps,
): JSX.Element {
  return (
    <article>
      <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
        <header className="text-center pt-6 xl:pb-6">
          <h1 className="heading">
            {post.title}
          </h1>
        </header>

        <div
          className="pb-8 xl:grid xl:grid-cols-4 xl:gap-x-6"
          style={{ gridTemplateRows: 'auto 1fr' }}
        >
          <div className="sidenav">
            <div className="nav-section">
              <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Table of contents
              </h2>
              <TableOfContents post={post} />
            </div>
            <div className="nav-section">
              <TagsWidget tags={post.tags} />
            </div>
            {
              !post.tags.includes('docs')
              && (
                <div className="nav-section pt-4 xl:pt-8">
                  <Link href="/">
                    &larr; Back to the blog
                  </Link>
                </div>
              )
            }
          </div>
          <div className="xl:col-span-3 xl:row-span-2 xl:pb-0">
            <div className="prose prose-img:mx-auto max-w-none pt-10 pb-8 dark:prose-dark">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
