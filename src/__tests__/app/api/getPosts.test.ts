import { getPosts, getPost } from '@/app/api/getPosts';

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

describe('getPosts', () => {
  beforeEach(() => {
    mockListForRepo.mockResolvedValue({
      data: [
        {
          title: 'My Blog Post: Part 1',
          body: '<div>Content</div>',
          labels: [
            {
              name: 'label1',
            },
          ],
          created_at: '2023-01-01T09:00:40',
        },
      ],
    });
  });

  it('returns posts with expected data', async () => {
    const issues = await getPosts();
    expect(issues).toEqual([
      {
        content: '<div>Content</div>',
        slug: 'my-blog-post:-part-1',
        summary: 'Blog post summary TODO',
        tags: ['label1'],
        title: 'My Blog Post: Part 1',
        date: 'Jan 1, 2023',
      },
    ]);
  });

  it('returns empty list when no posts available', async () => {
    mockListForRepo.mockResolvedValue({ data: [] });

    const issues = await getPosts();
    expect(issues).toEqual([]);
  });
});

describe('getPost', () => {
  beforeEach(() => {
    mockListForRepo.mockResolvedValue({
      data: [
        {
          title: 'My Blog Post: Part 1',
          body_html: '<div>Content</div>',
          labels: [
            {
              name: 'label1',
            },
          ],
          created_at: '2023-01-01T09:00:40',
        },
      ],
    });
  });

  it('returns post with expected data', async () => {
    const issue = await getPost('my-blog-post:-part-1');

    expect(issue).toEqual({
      content: '<div>Content</div>',
      slug: 'my-blog-post:-part-1',
      summary: 'Blog post summary TODO',
      tags: ['label1'],
      title: 'My Blog Post: Part 1',
      date: 'Jan 1, 2023',
    });
  });

  /**
   * This test checks against paths that are encoded by Next routing
   */
  it('finds post with encoded slug characters', async () => {
    const issue = await getPost('my-blog-post%3a-part-1');

    expect(issue).not.toBeNull();
  });

  it('returns null when post not found', async () => {
    mockListForRepo.mockResolvedValue({ data: [] });

    const issue = await getPost('slug');
    expect(issue).toBeNull();
  });
});
