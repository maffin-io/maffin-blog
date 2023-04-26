import { DateTime } from 'luxon';
import { render } from '@testing-library/react';

import TagPage, { generateStaticParams } from '@/app/tags/[tag]/page';
import * as postsApi from '@/app/api/getPosts';
import type { Post } from '@/app/api/getPosts';

jest.mock('@/app/api/getPosts', () => ({
  __esModule: true,
  ...jest.requireActual('@/app/api/getPosts'),
}));

jest.mock('@/components/PostsList', () => {
  function PostsList({ posts }: { posts: Post[] }) {
    return (
      <div className="PostsList" data-props={`with-${posts.length}-posts`} />
    );
  }

  return PostsList;
});

async function resolveComponent(Component: React.FunctionComponent, props: any) {
  const ComponentResolved = await Component(props);
  return () => ComponentResolved;
}

describe('TagPage', () => {
  beforeEach(() => {
    jest.spyOn(postsApi, 'getPostsByTag').mockResolvedValue([]);
  });

  it('renders post with content and title', async () => {
    jest.spyOn(postsApi, 'getPostsByTag').mockResolvedValue([
      {
        title: 'My Blog Post 1',
      } as Post,
      {
        title: 'My Blog Post 2',
      } as Post,
    ]);
    const Component = await resolveComponent(TagPage, { params: { tag: 'label1' } });
    const { container } = render(<Component />);

    expect(container).toMatchSnapshot();
  });

  it('renders with no posts', async () => {
    const Component = await resolveComponent(TagPage, { params: { tag: 'label1' } });
    const { container } = render(<Component />);

    expect(container).toMatchSnapshot();
  });
});

describe('generateStaticParams', () => {
  it('returns one slug per post', async () => {
    jest.spyOn(postsApi, 'getPosts').mockResolvedValue([
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
    ]);

    const staticParams = await generateStaticParams();

    expect(staticParams).toEqual([
      {
        tag: 'label1',
      },
      {
        tag: 'label2',
      },
    ]);
  });
});
