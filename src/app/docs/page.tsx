import React from 'react';
import { notFound } from 'next/navigation';

import '@/css/prism.css';
import { getPost } from '@/app/api/getPosts';
import PostDetail from '@/components/PostDetail';

export const metadata = {
  title: 'Maffin Docs',
  description: 'Tutorials and help for maffin.io',
  icons: {
    icon: [
      {
        url: '/favicon/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        url: '/favicon/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
    ],
    apple: '/favicon/apple-touch-icon.png',

  },
  category: ['technology', 'finance'],
  metadataBase: new URL('https://docs.maffin.io'),
  openGraph: {
    title: 'Maffin Docs',
    description: 'Tutorials and help for maffin.io',
    siteName: 'Maffin Docs',
    locale: 'en-US',
    type: 'website',
  },
};

export default async function DocsPage(): Promise<JSX.Element> {
  const post = await getPost('overview');
  if (post === null) {
    notFound();
  }

  return <PostDetail post={post} />;
}
