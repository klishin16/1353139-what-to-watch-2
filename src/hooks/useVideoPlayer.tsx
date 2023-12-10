import React, { useEffect, useState } from 'react';


interface IPlayerState {
  isPlaying: boolean;
  isWaiting: boolean;
  progress: number;
  speed: number;
  isMuted: boolean;
  isFullscreen: boolean;
  timeLeft: number;
}

const initialState: IPlayerState = {
  isPlaying: false,
  isWaiting: false,
  progress: 0,
  speed: 1,
  isMuted: false,
  isFullscreen: false,
  timeLeft: 0,
};

export const useVideoPlayer = (
  videoElementRef: React.RefObject<HTMLVideoElement>,
  playerElementRef: React.RefObject<HTMLDivElement>
) => {
  const [playerState, setPlayerState] = useState<IPlayerState>(initialState);

  const togglePlay = () => {
    setPlayerState((prevPlayerState) => ({
      ...prevPlayerState,
      isPlaying: !prevPlayerState.isPlaying
    }));
  };

  useEffect(() => {
    if (videoElementRef?.current) {
      if (playerState.isPlaying) {
        videoElementRef.current.play();
      } else {
        videoElementRef.current.pause();
      }
    }
  }, [playerState.isPlaying, videoElementRef]);

  const handleOnTimeUpdate = () => {
    if (videoElementRef?.current?.currentTime) {
      const progress = videoElementRef.current.currentTime / videoElementRef?.current.duration * 100;
      const timeLeft = videoElementRef.current.duration - videoElementRef.current.currentTime;
      setPlayerState((prevState) => ({
        ...prevState,
        progress,
        timeLeft
      }));
    }
  };

  const handleVideoProgress = (event: React.ChangeEvent<HTMLInputElement>) => {
    const manualChange = Number(event.target.value);
    if (videoElementRef?.current) {
      videoElementRef.current.currentTime = (videoElementRef.current.duration / 100) * manualChange;
      const timeLeft = videoElementRef.current.duration - videoElementRef.current.currentTime;
      setPlayerState({
        ...playerState,
        progress: manualChange,
        timeLeft
      });
    }
  };

  const handleVideoSpeed = (event: React.ChangeEvent<HTMLInputElement>) => {
    const speed = Number(event.target.value);
    if (videoElementRef?.current) {
      videoElementRef.current.playbackRate = speed;
      setPlayerState({
        ...playerState,
        speed,
      });
    }
  };

  const toggleMute = () => {
    setPlayerState((prevPlayerState) => ({
      ...prevPlayerState,
      isMuted: !prevPlayerState.isMuted,
    }));
  };

  useEffect(() => {
    if (videoElementRef?.current) {
      videoElementRef.current.muted = playerState.isMuted;
    }
  }, [playerState.isMuted, videoElementRef]);

  const toggleFullscreen = () => {
    setPlayerState((prevPlayerState) => ({
      ...prevPlayerState,
      isFullscreen: !prevPlayerState.isFullscreen
    }));
  };

  /** Обработчик fullscreen */
  useEffect(() => {
    if (playerElementRef?.current) {
      if (playerState.isFullscreen) {
        playerElementRef.current.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  }, [playerState.isFullscreen, playerElementRef]);

  useEffect(() => {
    if (videoElementRef?.current) {
      videoElementRef.current.addEventListener('fullscreenchange', () => {
        if (!document.fullscreenElement) {
          setPlayerState((prevPlayerState) => ({
            ...prevPlayerState,
            isFullscreen: false
          }));
        }
      });

      videoElementRef.current.addEventListener('waiting', () => {
        setPlayerState((prevPlayerState) => ({
          ...prevPlayerState,
          isWaiting: true
        }));
      });
      videoElementRef.current.addEventListener('playing', () => {
        setPlayerState((prevPlayerState) => ({
          ...prevPlayerState,
          isWaiting: false,
          isPlaying: true
        }));
      });
    }
  }, [videoElementRef, videoElementRef.current]);

  return {
    playerState,
    togglePlay,
    handleOnTimeUpdate,
    handleVideoProgress,
    handleVideoSpeed,
    toggleMute,
    toggleFullscreen,
  };
};
