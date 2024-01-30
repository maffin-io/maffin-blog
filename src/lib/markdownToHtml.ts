import toml from 'toml';
import { remark } from 'remark';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import remarkFrontMatter from 'remark-frontmatter';
import remarkExtractFrontMatter from 'remark-extract-frontmatter';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypePrismPlus from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';

type Metadata = {
  slug: string,
  reading_time: string,
  summary: string,
};

export default async function markdownToHtml(
  markdown: string,
): Promise<{ content: string, metadata: Metadata }> {
  const result = await remark()
    .use(remarkParse)
    .use(remarkFrontMatter, ['toml'])
    .use(remarkExtractFrontMatter, { toml: toml.parse })
    .use(remarkGfm) // Github flavored markdown
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeCodeTitles)
    .use(rehypeSlug)
    .use(rehypePrismPlus)
    // This is so we can parse <img> tags coming from Github markdown
    // keep it here! rehypeprismplus code lines don't work if they are after
    // this plugin
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(markdown);

  return {
    content: result.toString(),
    metadata: result.data as Metadata,
  };
}
