import { renderHook, act } from '@testing-library/react';
import { useVideoPlayer } from './use-video-player.tsx';
import { useRef } from 'react';

describe('Hook: useVideoPlayer', () => {
  it('should return player state', () => {
    const { result: { current: videoElementRef } } = renderHook(() => useRef(null));
    const { result: { current: playerElementRef } } = renderHook(() => useRef(null));

    const { result } = renderHook(() => useVideoPlayer(videoElementRef, playerElementRef));
    const { playerState, togglePlay, toggleFullscreen } = result.current;

    expect(playerState).toEqual({
      isPlaying: false,
      isWaiting: false,
      progress: 0,
      speed: 1,
      isMuted: false,
      isFullscreen: false,
      timeLeft: 0,
    });
    expect(typeof togglePlay).toBe('function');
    expect(typeof toggleFullscreen).toBe('function');
  });

  it('should be correctly toggle play', () => {
    const { result: { current: videoElementRef } } = renderHook(() => useRef(null));
    const { result: { current: playerElementRef } } = renderHook(() => useRef(null));

    const { result } = renderHook(() => useVideoPlayer(videoElementRef, playerElementRef));
    const { togglePlay } = result.current;
    act(() => togglePlay());
    const { playerState } = result.current;

    expect(playerState).toEqual({
      isPlaying: true,
      isWaiting: false,
      progress: 0,
      speed: 1,
      isMuted: false,
      isFullscreen: false,
      timeLeft: 0,
    });
  });

  it('should be correctly toggle fullscreen', () => {
    const { result: { current: videoElementRef } } = renderHook(() => useRef(null));
    const { result: { current: playerElementRef } } = renderHook(() => useRef(null));

    const { result } = renderHook(() => useVideoPlayer(videoElementRef, playerElementRef));
    const { toggleFullscreen } = result.current;
    act(() => toggleFullscreen());
    const { playerState } = result.current;

    expect(playerState).toEqual({
      isPlaying: false,
      isWaiting: false,
      progress: 0,
      speed: 1,
      isMuted: false,
      isFullscreen: true,
      timeLeft: 0,
    });
  });
});
