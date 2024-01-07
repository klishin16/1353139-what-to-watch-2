import { describe, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component.tsx';
import { makeFakeStore } from '../../utils/mocks.ts';
import MainPage from './main-page.tsx';

describe('Page Main', () => {
  it('Should render correctly', async () => {
    const expectedText = 'Fantastic Beasts: The Crimes of Grindelwald';
    const componentWithHistory = withHistory(<MainPage />);
    const { withStoreComponent } = withStore(componentWithHistory, makeFakeStore());

    render(withStoreComponent);
    await screen.findByText(expectedText);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
