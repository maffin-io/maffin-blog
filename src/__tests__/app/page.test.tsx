import { DateTime } from 'luxon';
import { render } from '@testing-library/react';

import HomePage from '@/app/page';
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

describe('HomePage', () => {
  beforeEach(() => {
    jest.spyOn(postsApi, 'getPosts').mockResolvedValue([]);
  });

  it('renders page with posts as expected', async () => {
    jest.spyOn(postsApi, 'getPosts').mockResolvedValue([
      {
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
      },
    ]);

    const Component = await resolveComponent(HomePage, {});
    const { container } = render(<Component />);

    expect(container).toMatchSnapshot();
  });
});
