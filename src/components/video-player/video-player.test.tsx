import { describe, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import VideoPlayer from './video-player.tsx';

describe('Component Video player', () => {
  it('Should render correctly', () => {
    const expectedVideoTestId = 'video';

    render(<VideoPlayer width={10} height={10} muted={false} src={''} poster={''} playPreview={false} />);

    expect(screen.getByTestId(expectedVideoTestId)).toBeInTheDocument();
  });
});
