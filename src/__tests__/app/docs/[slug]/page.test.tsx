import { DateTime } from 'luxon';
import { render } from '@testing-library/react';

import BlogPage, {
  generateStaticParams,
  generateMetadata,
  DocsDetailPageProps,
} from '@/app/docs/[slug]/page';
import PostDetail from '@/components/PostDetail';
import * as postsApi from '@/app/api/getPosts';

jest.mock('@/app/api/getPosts', () => ({
  __esModule: true,
  ...jest.requireActual('@/app/api/getPosts'),
}));

jest.mock('@/components/PostDetail', () => jest.fn(
  () => <div data-testid="PostDetail" />,
));

async function resolveComponent(
  Component: typeof BlogPage,
  props: DocsDetailPageProps,
): Promise<() => JSX.Element> {
  const ComponentResolved = await Component(props);
  return () => ComponentResolved;
}

describe('DocsDetailPage', () => {
  beforeEach(() => {
    jest.spyOn(postsApi, 'getPost').mockResolvedValue(null);
  });

  it('renders post with content and title', async () => {
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
    };
    jest.spyOn(postsApi, 'getPost').mockResolvedValue(post);
    const Component = await resolveComponent(BlogPage, { params: { slug: 'My-Doc' } });

    render(<Component />);

    expect(PostDetail).toBeCalledWith({ post }, {});
  });

  it('returns 404 when slug not found', async () => {
    await expect(
      () => resolveComponent(BlogPage, { params: { slug: 'My-Doc%3A-Part-1' } }),
    ).rejects.toThrow('NEXT_NOT_FOUND');
  });
});

describe('generateStaticParams', () => {
  it('returns one slug per post', async () => {
    jest.spyOn(postsApi, 'getDocs').mockResolvedValue([
      {
        content: '<div>Content</div>',
        slug: 'my-doc-1',
        summary: 'Doc summary TODO',
        tags: ['docs'],
        reading_time: '1 min',
        title: 'My Doc 1',
        date: DateTime.fromISO('2023-01-01'),
        author: {
          name: 'Name',
          avatar: 'https://avatar.image',
        },
      },
      {
        content: '<div>Content</div>',
        slug: 'my-doc-2',
        summary: 'Doc summary TODO',
        tags: ['docs'],
        reading_time: '1 min',
        title: 'My Doc 2',
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
        slug: 'my-doc-1',
      },
      {
        slug: 'my-doc-2',
      },
    ]);
  });
});

describe('generateMetadata', () => {
  it('generates metadata as expected', async () => {
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
    };
    jest.spyOn(postsApi, 'getPost').mockResolvedValue(post);

    const metadata = await generateMetadata({ params: { slug: 'my-doc' } });

    expect(metadata).toEqual({
      title: 'Maffin Docs - My Doc',
      description: post.summary,
      keywords: post.tags,
      authors: [{ name: post.author.name }],
    });
  });
});
