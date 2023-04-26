import { render } from '@testing-library/react';

import AboutPage from '@/app/about/page';

describe('AboutPage', () => {
  it('renders as expected', () => {
    const { container } = render(<AboutPage />);

    expect(container).toMatchSnapshot();
  });
});
