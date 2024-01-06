import { describe, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MovieCard from './movie-card.tsx';
import { makeFakeMovie } from '../../utils/mocks.ts';
import { withHistory } from '../../utils/mock-component.tsx';

describe('Component Movie card', () => {
  it('Should render correctly', () => {
    const movie = makeFakeMovie();
    const expectedText = movie.name;
    const preparedComponent = withHistory(<MovieCard movie={movie} />);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
