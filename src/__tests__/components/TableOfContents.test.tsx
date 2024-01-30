import { render } from '@testing-library/react';

import TableOfContents from '@/components/TableOfContents';
import type { Post } from '@/app/api/getPosts';

describe('TableOfContents', () => {
  let post: Post;
  beforeEach(() => {
    post = {
      content: '<h1 id="id-1">H1</h1><h2 id="id-2">H2</h2>',
    } as Post;
  });

  it('collects headings and renders as expected', () => {
    const { container } = render(<TableOfContents post={post} />);

    expect(container).toMatchSnapshot();
  });

  it('works ok when no id', () => {
    post.content = '<h1>h</h1>';
    const { container } = render(<TableOfContents post={post} />);

    expect(container).toMatchSnapshot();
  });
});
