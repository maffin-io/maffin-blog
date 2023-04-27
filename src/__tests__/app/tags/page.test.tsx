import { render } from '@testing-library/react';

import TagsPage from '@/app/tags/page';
import * as postsApi from '@/app/api/getPosts';
import type { Post } from '@/app/api/getPosts';

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
  it('renders as expected', async () => {
    jest.spyOn(postsApi, 'getPosts').mockResolvedValue([
      {
        tags: ['label1'],
      } as Post,
      {
        tags: ['label1', 'label2'],
      } as Post,
    ]);

    const Component = await resolveComponent(TagsPage, {});
    const { container } = render(<Component />);

    expect(container).toMatchSnapshot();
  });
});
