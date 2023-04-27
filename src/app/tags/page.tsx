import { getPosts } from '@/app/api/getPosts';
import Tag from '@/components/Tag';

export default async function TagsPage() {
  const posts = await getPosts();
  const tags: { [key: string]: number } = {};

  posts.forEach((post) => post.tags.forEach((tag) => {
    if (!(tag in tags)) {
      tags[tag] = 1;
    } else {
      tags[tag] += 1;
    }
  }));

  return (
    <div className="divide-y divide-gray-200">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Tags
        </h1>
      </div>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {Object.keys(tags).map((tag) => (
          <li key={tag} className="py-12">
            <Tag key={tag} text={tag} />
            {tags[tag]}
            {' '}
            posts
          </li>
        ))}
      </ul>
    </div>
  );
}
