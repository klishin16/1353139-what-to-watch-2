import { describe, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component.tsx';
import { extractActionsTypes, makeFakeStore } from '../../utils/mocks.ts';
import { MyListButton } from './my-list-button.tsx';
import userEvent from '@testing-library/user-event';
import { changeMovieFavoriteStatusAction } from '../../store/api-actions/api-actions.ts';

describe('Component My list button', () => {
  it('Should render correctly', async () => {
    const expectedText = 'My list';
    const store = makeFakeStore();
    const movie = store.movies.allMovies[0];
    const { withStoreComponent, mockStore } = withStore(<MyListButton movieId={movie.id} />, store);

    const componentWithHistory = withHistory(withStoreComponent);

    render(componentWithHistory);
    await userEvent.click(screen.getByRole('button'));

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([
      changeMovieFavoriteStatusAction.pending.type,
      changeMovieFavoriteStatusAction.rejected.type,
    ]);
  });
});
