import { render, screen } from '@testing-library/react';

import BlogPage from '@/app/posts/[slug]/page';

const mockListForRepo = jest.fn();
jest.mock('octokit', () => ({
  Octokit: jest.fn(() => ({
    rest: {
      issues: {
        listForRepo: mockListForRepo,
      },
    },
  })),
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
    mockListForRepo.mockResolvedValue({
      data: [
        {
          title: 'My Blog Post',
          body_html: '<div>Content</div>',
        },
      ]
    });
  });

  it('renders post with content and title', async () => {
    const Component = await resolveComponent(BlogPage, { params: { slug: 'My-Blog-Post'}});
    const { container } = render(<Component />);

    expect(container).toMatchSnapshot();
  });

  /**
   * This test checks against paths that are encoded by Next routing
   */
  it('finds post with encoded slug', async () => {
    mockListForRepo.mockResolvedValue({
      data: [
        {
          title: 'My Blog Post: Part 1',
          body_html: '<div>Content</div>',
        },
      ]
    });
    const Component = await resolveComponent(BlogPage, { params: { slug: 'My-Blog-Post%3A-Part-1'}});
    render(<Component />);

    expect(screen.getByText('My Blog Post: Part 1').outerHTML).toEqual('<h1>My Blog Post: Part 1</h1>');
  });

  it('returns 404 when slug not found', async () => {
    await expect(
      () => resolveComponent(BlogPage, { params: { slug: 'My-Blog-Post%3A-Part-1'}}),
    ).rejects.toThrow('NEXT_NOT_FOUND');
  });
});
