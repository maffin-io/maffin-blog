import { render } from '@testing-library/react';

import TagsPage from '@/app/tags/page';
import * as postsApi from '@/app/api/getPosts';
import type { Post } from '@/app/api/getPosts';

jest.mock('@/app/api/getPosts', () => ({
  __esModule: true,
  ...jest.requireActual('@/app/api/getPosts'),
}));

async function resolveComponent(Component: typeof TagsPage): Promise<() => JSX.Element> {
  const ComponentResolved = await Component();
  return () => ComponentResolved;
}

describe('TagsPage', () => {
  it('renders as expected', async () => {
    jest.spyOn(postsApi, 'getPosts').mockResolvedValue([
      {
        tags: ['label1'],
      } as Post,
      {
        tags: ['label1', 'label2'],
      } as Post,
    ]);

    const Component = await resolveComponent(TagsPage);
    const { container } = render(<Component />);

    expect(container).toMatchSnapshot();
  });
});
