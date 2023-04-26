import { DateTime } from 'luxon';

import PostsList from '@/components/PostsList';
import { render } from '@testing-library/react';

describe('PostsList', () => {
  it('renders all posts as expected', () => {
    const posts = [
      {
        content: '<div>Content</div>',
        slug: 'my-blog-post-1',
        summary: 'Blog post summary TODO',
        tags: ['label1', 'label2'],
        reading_time: '1 min',
        title: 'My Blog Post 1',
        date: DateTime.fromISO('2023-01-01'),
        author: {
          name: 'Name',
          avatar: 'https://avatar.image',
        },
      },
      {
        content: '<div>Content</div>',
        slug: 'my-blog-post-2',
        summary: 'Blog post summary TODO',
        tags: ['label2'],
        reading_time: '1 min',
        title: 'My Blog Post 2',
        date: DateTime.fromISO('2023-01-01'),
        author: {
          name: 'Name',
          avatar: 'https://avatar.image',
        },
      },
    ];

    const { container } = render(<PostsList posts={posts} />);

    expect(container).toMatchSnapshot();
  });
});
