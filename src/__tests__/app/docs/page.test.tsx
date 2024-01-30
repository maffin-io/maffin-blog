import { DateTime } from 'luxon';
import { render } from '@testing-library/react';

import DocsPage from '@/app/docs/page';
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
  Component: typeof DocsPage,
): Promise<() => JSX.Element> {
  const ComponentResolved = await Component();
  return () => ComponentResolved;
}

describe('DocsDetailPage', () => {
  beforeEach(() => {
    jest.spyOn(postsApi, 'getPost').mockResolvedValue(null);
  });

  it('renders post with content and title', async () => {
    const post = {
      content: '<div>Content</div>',
      slug: 'my-blog-post',
      summary: 'Blog post summary TODO',
      tags: ['label1'],
      reading_time: '1 min',
      title: 'My Doc',
      date: DateTime.fromISO('2023-01-01'),
      author: {
        name: 'Name',
        avatar: 'https://avatar.image',
      },
    };
    jest.spyOn(postsApi, 'getPost').mockResolvedValue(post);
    const Component = await resolveComponent(DocsPage);

    render(<Component />);

    expect(postsApi.getPost).toBeCalledWith('overview');
    expect(PostDetail).toBeCalledWith({ post }, {});
  });

  it('returns 404 when slug not found', async () => {
    await expect(
      () => resolveComponent(DocsPage),
    ).rejects.toThrow('NEXT_NOT_FOUND');
  });
});
