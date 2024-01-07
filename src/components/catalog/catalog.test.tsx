import { describe, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component.tsx';
import Catalog from './catalog.tsx';
import { makeFakeStore } from '../../utils/mocks.ts';

describe('Component Catalog', () => {
  it('Should render correctly', () => {
    const expectedText = 'Catalog';
    const componentWithHistory = withHistory(<Catalog />);
    const { withStoreComponent } = withStore(componentWithHistory, makeFakeStore());

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
