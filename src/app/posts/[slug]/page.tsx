export default function Page(
  { params: { slug }}: { params: { slug: string }},
) {
  return <div>My {slug} Post</div>;
}
