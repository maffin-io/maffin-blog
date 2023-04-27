import { render } from '@testing-library/react';

import HomePage from '@/app/page';
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

async function resolveComponent(Component: typeof HomePage): Promise<() => JSX.Element> {
  const ComponentResolved = await Component();
  return () => ComponentResolved;
}

describe('HomePage', () => {
  beforeEach(() => {
    jest.spyOn(postsApi, 'getPosts').mockResolvedValue([]);
  });

  it('renders page with posts as expected', async () => {
    jest.spyOn(postsApi, 'getPosts').mockResolvedValue([
      {
        title: 'My Blog Post 1',
      } as Post,
      {
        title: 'My Blog Post 2',
      } as Post,
    ]);

    const Component = await resolveComponent(HomePage);
    const { container } = render(<Component />);

    expect(container).toMatchSnapshot();
  });
});
