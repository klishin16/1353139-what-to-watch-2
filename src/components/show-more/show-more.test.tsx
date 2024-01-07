import { describe, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { withStore } from '../../utils/mock-component.tsx';
import { makeFakeStore } from '../../utils/mocks.ts';
import { ShowMore } from './show-more.tsx';

describe('Component Show more', () => {
  it('Should render correctly', () => {
    const expectedText = 'Show more';
    const { withStoreComponent } = withStore(<ShowMore />, makeFakeStore());

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
