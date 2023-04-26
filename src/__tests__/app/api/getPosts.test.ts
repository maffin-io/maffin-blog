import { DateTime } from 'luxon';

import { getPosts, getPost } from '@/app/api/getPosts';

const mockListForRepo = jest.fn();
jest.mock('octokit', () => ({
  Octokit: jest.fn(() => ({
    rest: {
      issues: {
        listForRepo: () => mockListForRepo(),
      },
    },
  })),
}));

const mockMarkdownToHtml = jest.fn();
jest.mock('@/lib/markdownToHtml', () => ({
  __esModule: true,
  default: () => mockMarkdownToHtml(),
}));

describe('getPosts', () => {
  beforeEach(() => {
    mockListForRepo.mockResolvedValue({
      data: [
        {
          title: 'My Blog Post: Part 1',
          body: '#header',
          labels: [
            {
              name: 'label1',
            },
          ],
          created_at: '2023-01-01T00:00:00',
          user: {
            login: 'username',
            avatar_url: 'avatar_url',
          },
        },
      ],
    });

    mockMarkdownToHtml.mockResolvedValue({
      content: '<div>Content</div>',
      metadata: {
        slug: 'slug',
        summary: 'summary',
        reading_time: '1 min',
      },
    });
  });

  it('returns posts with expected data', async () => {
    const issues = await getPosts();

    expect(issues).toEqual([
      {
        content: '<div>Content</div>',
        reading_time: '1 min',
        slug: 'slug',
        summary: 'summary',
        tags: ['label1'],
        title: 'My Blog Post: Part 1',
        date: DateTime.fromISO('2023-01-01'),
        author: {
          name: 'username',
          avatar: 'avatar_url',
        },
      },
    ]);
  });

  it('throws an error if post without body', async () => {
    mockListForRepo.mockResolvedValue({
      data: [
        {
          title: 'My Blog Post: Part 1',
          labels: [
            {
              name: 'label1',
            },
          ],
          created_at: '2023-01-01T00:00:00',
          user: {
            login: 'username',
            avatar_url: 'avatar_url',
          },
        },
      ],
    });

    await expect(() => getPosts()).rejects.toThrow(new Error('Missing body in issue My Blog Post: Part 1'));
  });

  it('ignores PRs', async () => {
    mockListForRepo.mockResolvedValue({
      data: [
        {
          title: 'My Blog Post: Part 1',
          labels: [
            {
              name: 'label1',
            },
          ],
          created_at: '2023-01-01T00:00:00',
          user: {
            login: 'username',
            avatar_url: 'avatar_url',
          },
          pull_request: {},
        },
      ],
    });

    const issues = await getPosts();
    expect(issues).toEqual([]);
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
          body: '#header',
          labels: [
            {
              name: 'label1',
            },
          ],
          created_at: '2023-01-01T00:00:00',
          user: {
            login: 'username',
            avatar_url: 'avatar_url',
          },
        },
      ],
    });

    mockMarkdownToHtml.mockResolvedValue({
      content: '<div>Content</div>',
      metadata: {
        slug: 'slug',
        summary: 'summary',
        reading_time: '1 min',
      },
    });
  });

  it('returns post with expected data', async () => {
    const issue = await getPost('slug');

    expect(issue).toEqual({
      content: '<div>Content</div>',
      reading_time: '1 min',
      slug: 'slug',
      summary: 'summary',
      tags: ['label1'],
      title: 'My Blog Post: Part 1',
      date: DateTime.fromISO('2023-01-01'),
      author: {
        name: 'username',
        avatar: 'avatar_url',
      },
    });
  });

  it('returns null when post not found', async () => {
    mockListForRepo.mockResolvedValue({ data: [] });

    const issue = await getPost('slug');
    expect(issue).toBeNull();
  });
});
