import { DateTime } from 'luxon';
import Link from 'next/link';

import Tag from '@/components/Tag';
import type { Post } from '@/app/api/getPosts';

type PostsListProps = {
  posts: Post[],
};

export default function PostsList({ posts }: PostsListProps): JSX.Element {
  return (
    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
      {posts.map((post) => (
        <li key={post.slug} className="py-12">
          <article>
            <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
              <dl>
                <dt className="sr-only">Published on</dt>
                <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                  <time dateTime={post.date.toISODate() || undefined}>
                    {post.date.toLocaleString(DateTime.DATE_MED)}
                  </time>
                </dd>
              </dl>
              <div className="space-y-5 xl:col-span-3">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold leading-8 tracking-tight">
                      <Link
                        href={`/posts/${post.slug}`}
                        className="text-gray-900 dark:text-gray-100"
                      >
                        {post.title}
                      </Link>
                    </h2>
                    <div className="flex flex-wrap">
                      {post.tags.map((tag: string) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                  </div>
                  <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                    {post.summary}
                  </div>
                </div>
                <div className="text-base font-medium leading-6">
                  <Link
                    href={`/posts/${post.slug}`}
                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                    aria-label={`Read "${post.title}"`}
                  >
                    Read more (
                    {post.reading_time}
                    ) &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
