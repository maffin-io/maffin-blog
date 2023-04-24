import { render } from '@testing-library/react';

import Typing from '@/components/Typing';

describe('Typing', () => {
  it('renders as expected', () => {
    const { container } = render(<Typing />);
    expect(container).toMatchSnapshot();
  });
});
