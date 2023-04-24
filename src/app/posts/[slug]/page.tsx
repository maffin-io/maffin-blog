import React from 'react';
import { notFound } from 'next/navigation';

import { getPost } from '@/app/api/getPosts';

export default async function BlogPage(
  { params: { slug } }: { params: { slug: string } },
): Promise<JSX.Element> {
  const post = await getPost(slug);

  if (post === null) {
    notFound();
  }

  return (
    <>
      <h1>
        {post.title}
      </h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </>
  );
}
