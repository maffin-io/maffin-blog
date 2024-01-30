import { render } from '@testing-library/react';

import Tag from '@/components/Tag';
import TagsWidget from '@/components/TagsWidget';

jest.mock('@/components/Tag', () => jest.fn(
  () => <div data-testid="Tag" />,
));

describe('TagsWidget', () => {
  it('is empty when no tags', () => {
    render(<TagsWidget tags={[]} />);
    expect(Tag).toBeCalledTimes(0);
  });

  it('is empty when "docs" in the tags', () => {
    render(<TagsWidget tags={['a', 'b', 'docs']} />);
    expect(Tag).toBeCalledTimes(0);
  });

  it('renders as expected when valid tags', () => {
    const { container } = render(<TagsWidget tags={['a', 'b']} />);
    expect(Tag).toBeCalledTimes(2);
    expect(container).toMatchSnapshot();
  });
});
