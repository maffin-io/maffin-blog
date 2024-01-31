<img align="left" src="https://github.com/maffin-io/maffin-blog/blob/master/src/assets/images/logo.png" width="70" height="65">

# Maffin Blog

**Landing page**: <a href="https://maffin.io" target="_blank">https://maffin.io</a>

**Blog**: <a href="https://blog.maffin.io" target="_blank">https://blog.maffin.io</a>

**Our demo**: <a href="https://demo.maffin.io" target="_blank">https://demo.maffin.io</a>

---


This repo contains the source code that hosts <a href="https://blog.maffin.io" target="_blank">https://blog.maffin.io</a>

- :octocat: Uses github issues to host content.
- 🌳 Uses <a href="https://nextjs.org/" target="_blank">Next.js</a> static build to list all the issues and create dynamic routes.
- 🌍 Deployed in Github pages

## 🏖️ Summary

Our blog posts are written as <a href="https://github.com/maffin-io/maffin-blog/issues" target="_blank">github issues</a> in markdown syntax. This already gives us loads of useful features like author, labels, dates and even comments!

We use <a href="https://github.com/octokit" target="_blank">octokit</a> to download the issues' metadata and content. The content is then transformed using <a href="https://github.com/remarkjs" target="_blank">remark</a> and <a href="https://github.com/rehypejs/rehype" target="_blank">rehype</a> and the resulting HTML is injected to our components written in <a href="https://react.dev/" target="_blank">React</a> and styled in <a href="https://tailwindcss.com/" target="_blank">Tailwindcss</a>.

Do you want more details? Follow our two posts we wrote about how we implemented it:

- 🧰 <a href="https://blog.maffin.io/posts/github-issues-as-nextjs-blog-cms" target="_blank">Using github issues as a CMS for your blog</a>
- 🕸️ <a href="https://blog.maffin.io/posts/static-server-rendering-nextjs" target="_blank">Static server rendering with Next.js</a>

## 💻 Developing

If you want to customise, follow this steps:

- Clone the repo.
- Inside the folder, run `yarn` to install dependencies.
- Once done, run `yarn dev` and you can access the blog at http://localhost:3000/.

If you want to see the magic of server rendering, check it with `yarn build`. It will result with something like:

```
Route (app)                                    Size     First Load JS
┌ ○ /                                          180 B          91.3 kB
├ ○ /_not-found                                885 B          85.2 kB
├ ○ /docs                                      195 B          91.3 kB
├ ● /docs/[slug]                               195 B          91.3 kB
├   ├ /docs/commodities
├   ├ /docs/transactions
├   ├ /docs/overview
├   └ /docs/accounts
├ ● /posts/[slug]                              195 B          91.3 kB
├   ├ /posts/gapi-authentication-nextjs
├   ├ /posts/static-server-rendering-nextjs
├   └ /posts/github-issues-as-nextjs-blog-cms
├ ○ /tags                                      180 B          91.3 kB
└ ● /tags/[tag]                                181 B          91.3 kB
    ├ /tags/next.js
    ├ /tags/engineering
    └ /tags/octokit
+ First Load JS shared by all                  84.3 kB
  ├ chunks/69-c7efea4b65083e7f.js              29 kB
  ├ chunks/fd9d1056-cc48c28d170fddc2.js        53.4 kB
  └ other shared chunks (total)                1.91 kB
```

Note that you will be downloading the issues from this current repo. You probably want to update

https://github.com/maffin-io/maffin-blog/blob/09fd034d217c75e982eb240bd4b057721349400d/src/app/api/getPosts.ts#L42-L50

with the data from your repo.

## Helping out

If you find this useful, please remember to leave a star and/or share! 😸
