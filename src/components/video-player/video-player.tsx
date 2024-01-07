import { useEffect, useRef } from 'react';

interface IVideoPlayerProps {
  src: string;
  poster: string;
  muted: boolean;
  playPreview: boolean;
  height: number;
  width: number;
}

const VideoPlayer = ({ src, poster, muted, playPreview, height, width }: IVideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (playPreview) {
      videoRef.current?.play();
    } else {
      videoRef.current?.load();
    }
  }, [playPreview]);

  return (
    <video ref={videoRef} src={src} poster={poster} muted={muted} height={height} width={width} autoPlay={false} data-testid={'video'}></video>
  );
};

export default VideoPlayer;
