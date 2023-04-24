import { render } from '@testing-library/react';

import Tag from '@/components/Tag';

describe('Tag', () => {
  it('renders as expected', () => {
    const { container } = render(<Tag text='tag' />);
    expect(container).toMatchSnapshot();
  });
});
