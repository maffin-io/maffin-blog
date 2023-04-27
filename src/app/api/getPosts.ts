import { DateTime } from 'luxon';
import { Octokit } from 'octokit';

import markdownToHtml from '@/lib/markdownToHtml';

export type Post = {
  slug: string,
  date: DateTime,
  title: string,
  summary: string,
  reading_time: string,
  tags: string[],
  content: string,
  author: {
    name?: string,
    avatar?: string,
  },
};

export async function getPosts(): Promise<Post[]> {
  const octokit = new Octokit();
  const issues = (await octokit.rest.issues.listForRepo({
    owner: 'maffin-io',
    repo: 'maffin-blog',
    creator: 'argaen',
    headers: {
      accept: 'application/vnd.github+json',
    },
  })).data.filter(issue => !issue.pull_request && !issue.title.includes('[draft]'));

  return Promise.all(issues.map(async (issue) => {
    if (!issue.body) {
      throw new Error(`Missing body in issue ${issue.title}`);
    }

    const { content: htmlContent, metadata } = await markdownToHtml(issue.body);
    return {
      slug: metadata.slug,
      date: DateTime.fromISO(issue.created_at),
      title: issue.title,
      summary: metadata.summary,
      reading_time: metadata.reading_time,
      // @ts-ignore
      tags: issue.labels.map(label => label.name),
      content: htmlContent,
      author: {
        name: issue.user?.name || issue.user?.login,
        avatar: issue.user?.avatar_url,
      },
    };
  }));
}

export async function getPost(slug: string): Promise<null | Post> {
  const posts = await getPosts();
  return posts.find(post => post.slug === slug) || null;
}

export async function getPostsByTag(tag: string): Promise<Post[]> {
  const posts = await getPosts();
  return posts.filter(post => post.tags.includes(tag));
}
