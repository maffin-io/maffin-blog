import React from 'react';
import { Octokit } from 'octokit';
import slugify from 'slugify';
import { notFound } from 'next/navigation';

async function getPost(slug: string): Promise<null | any> {
  const octokit = new Octokit();
  const issues = await octokit.rest.issues.listForRepo({
    owner: 'maffin-io',
    repo: 'maffin-blog',
    headers: {
      accept: 'application/vnd.github.html+json',
    },
  });

  let issue = null;
  issues.data.forEach(instance => {
    if (slugify(instance.title) === slug) {
      issue = instance;
    }
  });

  return issue;
}

export default async function BlogPage(
  { params: { slug }}: { params: { slug: string }},
): Promise<JSX.Element> {
  const issue = await getPost(decodeURIComponent(slug));
  if (issue === null) {
    notFound();
  }
  return (
    <>
      <h1>
        {issue.title}
      </h1>
      <div dangerouslySetInnerHTML={{ __html: issue.body_html }} />
    </>
  );
}
