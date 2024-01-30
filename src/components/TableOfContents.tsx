import React from 'react';
import Link from 'next/link';
import { Post } from '@/app/api/getPosts';

export type TableOfContentsProps = {
  post: Post;
};

export default function TableOfContents({ post }: TableOfContentsProps) {
  const { content } = post;
  const headers = collectHeadings(content);

  return (
    <ul className="list-none pl-0">
      {headers.map(h => {
        const href = `#${h.id}`;

        return (
          <li
            key={h.title}
            className={`pl-${3 * (h.level - 1)}`}
          >
            <Link
              href={href}
            >
              {h.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

type Heading = {
  title: string;
  level: number;
  id: string | null;
};

function collectHeadings(content: string): Heading[] {
  const headingsRegex = /<h([1-6])(?:\s+[^>]*)*>(.*?)<\/h[1-6]>/g;
  const headings = [];
  let match;

  while ((match = headingsRegex.exec(content)) !== null) {
    const headingObject = {
      title: match[2],
      level: parseInt(match[1], 10),
      id: getAttributeValue('id', match[0]),
    };
    headings.push(headingObject);
  }

  return headings;
}

// Function to extract attribute value from a string
function getAttributeValue(attribute: string, text: string): string {
  const regex = new RegExp(`${attribute}=['"]([^'"]+)['"]`);
  const match = regex.exec(text);
  return match ? match[1] : '';
}
