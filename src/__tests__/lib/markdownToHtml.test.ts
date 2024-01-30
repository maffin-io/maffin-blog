import markdownToHtml from '@/lib/markdownToHtml';

describe('markdownToHtml', () => {
  it('works for simple html', async () => {
    const parsed = await markdownToHtml('# hello world');

    expect(parsed).toEqual({
      content: '<h1 id="hello-world">hello world</h1>',
      metadata: {},
    });
  });

  it('highlights code', async () => {
    const parsed = await markdownToHtml(
      '```js:myfile.js {1} showLineNumbers\n'
      + '1 + 1;\n'
      + '```\n',
    );

    expect(parsed.content).toEqual((
      '<div class="rehype-code-title">myfile.js</div>'
      + '<pre class="language-js">'
      + '<code class="language-js code-highlight">'
      + '<span class="code-line line-number highlight-line" line="1">'
      + '<span class="token number">1</span>'
      + ' <span class="token operator">+</span>'
      + ' <span class="token number">1</span>'
      + '<span class="token punctuation">;</span>\n'
      + '</span>'
      + '</code>'
      + '</pre>'
    ));
  });

  it('parses raw <img> tags', async () => {
    const parsed = await markdownToHtml('<img width="418" alt="Screenshot 2023-04-26 at 10 38 37" src="src">');

    expect(parsed.content).toEqual(
      '<img width="418" alt="Screenshot 2023-04-26 at 10 38 37" src="src">',
    );
  });

  it('parses frontmatter metadata in toml', async () => {
    const parsed = await markdownToHtml(
      '+++\n'
      + 'slug = "my-slug"\n'
      + '+++\n'
      + '# hello world',
    );

    expect(parsed).toEqual({
      content: '<h1 id="hello-world">hello world</h1>',
      metadata: {
        slug: 'my-slug',
      },
    });
  });
});
