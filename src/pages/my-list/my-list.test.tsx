import { describe, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component.tsx';
import { makeFakeStore } from '../../utils/mocks.ts';
import MyListPage from './my-list.tsx';

describe('Page My list', () => {
  it('Should render correctly', () => {
    const expectedText = 'My list';
    const componentWithHistory = withHistory(<MyListPage />);
    const { withStoreComponent } = withStore(componentWithHistory, makeFakeStore());

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
