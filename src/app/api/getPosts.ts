import { DateTime } from 'luxon';
import { Octokit } from 'octokit';
import slugify from 'slugify';

function toSlug(str: string) {
  return slugify(str).toLowerCase();
}

export type Post = {
  slug: string,
  date: string,
  title: string,
  summary: string,
  tags: string[],
  content: string,
};

export async function getPosts(): Promise<Post[]> {
  const octokit = new Octokit();
  const issues = await octokit.rest.issues.listForRepo({
    owner: 'maffin-io',
    repo: 'maffin-blog',
    creator: 'argaen',
    headers: {
      accept: 'application/vnd.github+json',
    },
  });

  return issues.data.map((issue) => ({
    slug: toSlug(issue.title),
    date: DateTime.fromISO(issue.created_at).toLocaleString(DateTime.DATE_MED),
    title: issue.title,
    summary: 'Blog post summary TODO',
    tags: issue.labels.map((label) => label.name),
    content: issue.body || 'Post without content',
  }));
}

export async function getPost(slug: string): Promise<null | Post> {
  const octokit = new Octokit();
  const issues = await octokit.rest.issues.listForRepo({
    owner: 'maffin-io',
    repo: 'maffin-blog',
    creator: 'argaen',
    headers: {
      accept: 'application/vnd.github.html+json',
    },
  });

  let post: Post | null = null;
  issues.data.forEach((issue) => {
    if (toSlug(issue.title) === decodeURIComponent(slug)) {
      post = {
        slug: toSlug(issue.title),
        date: DateTime.fromISO(issue.created_at).toLocaleString(DateTime.DATE_MED),
        title: issue.title,
        summary: 'Blog post summary TODO',
        tags: issue.labels.map((label) => label.name),
        content: issue.body_html || 'Post without content',
      };
    }
  });

  return post;
}
