import { describe, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component.tsx';
import { makeFakeStore } from '../../utils/mocks.ts';
import PlayerPage from './player.tsx';

describe('Page Player', () => {
  it('Should render correctly', () => {
    const expectedLoaderTestId = 'loading-spinner';
    const componentWithHistory = withHistory(<PlayerPage />);
    const { withStoreComponent } = withStore(componentWithHistory, makeFakeStore());

    render(withStoreComponent);

    expect(screen.getByTestId(expectedLoaderTestId)).toBeInTheDocument();
  });
});
