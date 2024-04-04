import React from 'react';

import Tag from '@/components/Tag';

export type TagsWidgetProps = {
  tags: string[];
};

export default function TagsWidget({ tags }: TagsWidgetProps): JSX.Element {
  return (
    <div>
      {
        tags
        && (
          <div className="py-4 xl:py-8">
            <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Tags
            </h2>
            <div className="flex flex-wrap">
              {tags.map((tag) => (
                <Tag key={tag} text={tag} />
              ))}
            </div>
          </div>
        )
      }
    </div>
  );
}
