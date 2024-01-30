import { DateTime } from 'luxon';
import PostDetail from '@/components/PostDetail';
import { render } from '@testing-library/react';

import type { Post } from '@/app/api/getPosts';

jest.mock('@/components/TableOfContents', () => jest.fn(
  () => <div data-testid="TableOfContents" />,
));

jest.mock('@/components/TagsWidget', () => jest.fn(
  () => <div data-testid="TagsWidget" />,
));

describe('PostDetailTest', () => {
  it('renders post as expected', async () => {
    const post = {
      content: '<div>Content</div>',
      slug: 'my-blog-post',
      summary: 'Blog post summary TODO',
      tags: ['label1'],
      reading_time: '1 min',
      title: 'My Blog Post',
      date: DateTime.fromISO('2023-01-01'),
      author: {
        name: 'Name',
        avatar: 'https://avatar.image',
      },
    } as Post;
    const { container } = render(<PostDetail post={post} />);

    expect(container).toMatchSnapshot();
  });

  it('renders doc as expected', async () => {
    const post = {
      content: '<div>Content</div>',
      slug: 'my-doc',
      summary: 'Doc summary TODO',
      tags: ['docs'],
      reading_time: '1 min',
      title: 'My Doc',
      date: DateTime.fromISO('2023-01-01'),
      author: {
        name: 'Name',
        avatar: 'https://avatar.image',
      },
    } as Post;
    const { container } = render(<PostDetail post={post} />);

    expect(container).toMatchSnapshot();
  });
});
