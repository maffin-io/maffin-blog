import PostsList from '@/components/PostsList';
import Typing from '@/components/Typing';
import { getPosts } from '@/app/api/getPosts';

export default async function HomePage(): Promise<JSX.Element> {
  const posts = await getPosts();

  return (
    <div className="divide-y divide-gray-200">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          A bit of
        </h1>
        <Typing />
      </div>
      <PostsList posts={posts} />
    </div>
  );
}
