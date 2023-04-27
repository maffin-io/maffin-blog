import React from 'react';
import Link from 'next/link';

import { getPosts, getPostsByTag } from '@/app/api/getPosts';
import PostsList from '@/components/PostsList';

export async function generateStaticParams() {
  const posts = await getPosts();
  const tags = new Set<string>();

  posts.forEach((post) => post.tags.forEach((tag) => tags.add(tag)));

  return Array.from(tags).map((tag) => ({
    tag,
  }));
}

export type TagPageProps = {
  params: { tag: string },
};

export default async function TagPage(
  { params: { tag } }: TagPageProps,
): Promise<JSX.Element> {
  const posts = await getPostsByTag(tag);

  return (
    <div className="divide-y divide-gray-200">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          <Link href="/tag/{tag}">
            #
            {tag}
          </Link>
        </h1>
      </div>
      <PostsList posts={posts} />
    </div>
  );
}
