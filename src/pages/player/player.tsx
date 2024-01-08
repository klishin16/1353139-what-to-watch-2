import { useNavigate, useParams } from 'react-router-dom';
import { ApiRoute, AppRoute } from '../../constants.ts';
import { useEffect, useRef, useState } from 'react';
import { useVideoPlayer } from '../../hooks/use-video-player.tsx';
import { api } from '../../store';
import { MovieDetail } from '../../types';
import { Loader } from '../../components';
import './player.css';
import { getTimeLeft } from '../../utils/get-time-left.ts';

const PlayerPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [movie, setMovie] = useState<MovieDetail>();
  const videoElementRef = useRef(null);
  const playerElementRef = useRef(null);
  const {
    playerState,
    togglePlay: handleTogglePlay,
    handleOnTimeUpdate,
    handleVideoProgress,
    toggleFullscreen: handleToggleFullscreen
  } = useVideoPlayer(videoElementRef, playerElementRef);

  useEffect(() => {
    if (id && navigate) {
      api.get<MovieDetail>(`${ApiRoute.MOVIES}/${id}`)
        .then(({ data }) => {
          setMovie(data);
        })
        .catch(() => {
          navigate(AppRoute.NOTFOUND);
        });
    }
  }, [id, navigate]);

  const handleExit = () => {
    if (id) {
      navigate(`${AppRoute.FILMS }/${id}`);
    } else {
      navigate(AppRoute.MAIN);
    }
  };

  if (!movie) {
    return <Loader />;
  }

  return (
    <div className="player" ref={playerElementRef}>
      { playerState.isWaiting && <div className='loader'></div> }

      <video
        className="player__video"
        ref={videoElementRef}
        src={movie?.videoLink}
        poster={movie.posterImage}
        onTimeUpdate={handleOnTimeUpdate}
        autoPlay
      >
      </video>

      <button type="button" className="player__exit" onClick={handleExit}>Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <input type='range' className="player__progress" value={ playerState.progress } min='0' max="100" onChange={handleVideoProgress}></input>
            <div className="player__toggler" style={ {left: `${playerState.progress}%`} }>Toggler</div>
          </div>
          <div className="player__time-value">- { getTimeLeft(playerState.timeLeft) }</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play" onClick={handleTogglePlay}>
            { playerState.isPlaying ?
              <svg viewBox="0 0 19 19" width="19" height="19"><use xlinkHref="#pause"></use></svg>
              : <svg viewBox="0 0 19 19" width="19" height="19"><use xlinkHref="#play-s"></use></svg>}
            <span>Play</span>
          </button>
          <div className="player__name">{ movie.name }</div>

          <button type="button" className="player__full-screen" onClick={handleToggleFullscreen}>
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerPage;
