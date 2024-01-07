import { describe, expect } from 'vitest';
import { render } from '@testing-library/react';
import ScrollToTop from './scroll-to-top.tsx';
import { withHistory } from '../../utils/mock-component.tsx';

describe('Component Scroll to top', () => {
  it('Should render correctly', () => {
    const componentWithHistory = withHistory(<ScrollToTop />);

    const { container } = render(componentWithHistory);

    expect(container).toBeEmptyDOMElement();
  });
});
