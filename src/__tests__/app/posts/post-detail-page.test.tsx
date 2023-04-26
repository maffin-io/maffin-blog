import { DateTime } from 'luxon';
import { render } from '@testing-library/react';

import BlogPage from '@/app/posts/[slug]/page';
import * as postsApi from '@/app/api/getPosts';

jest.mock('@/app/api/getPosts', () => ({
  __esModule: true,
  ...jest.requireActual('@/app/api/getPosts'),
}));

/**
 * @param {function} Component
 * @param {*} props
 * @returns {Promise<()=>JSX.Element>}
 */
async function resolveComponent(Component: React.FunctionComponent, props: any) {
  const ComponentResolved = await Component(props);
  return () => ComponentResolved;
}

describe('BlogPage', () => {
  beforeEach(() => {
    jest.spyOn(postsApi, 'getPost').mockResolvedValue(null);
  });

  it('renders post with content and title', async () => {
    jest.spyOn(postsApi, 'getPost').mockResolvedValue({
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
    });
    const Component = await resolveComponent(BlogPage, { params: { slug: 'My-Blog-Post' } });
    const { container } = render(<Component />);

    expect(container).toMatchSnapshot();
  });

  it('returns 404 when slug not found', async () => {
    await expect(
      () => resolveComponent(BlogPage, { params: { slug: 'My-Blog-Post%3A-Part-1' } }),
    ).rejects.toThrow('NEXT_NOT_FOUND');
  });
});
