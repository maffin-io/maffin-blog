import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

import '@/css/prism.css';
import { getDocs, getPost } from '@/app/api/getPosts';
import PostDetail from '@/components/PostDetail';

export async function generateStaticParams() {
  const posts = await getDocs();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export type DocsDetailPageProps = {
  params: { slug: string },
};

export async function generateMetadata(
  { params: { slug } }: DocsDetailPageProps,
): Promise<Metadata> {
  const post = await getPost(slug);

  return {
    title: `Maffin Docs - ${post?.title}`,
    description: post?.summary,
    keywords: post?.tags,
    authors: [{ name: post?.author.name }],
  };
}

export default async function DocsDetailPage(
  { params: { slug } }: DocsDetailPageProps,
): Promise<JSX.Element> {
  const post = await getPost(slug);

  if (post === null) {
    notFound();
  }

  return <PostDetail post={post} />;
}
