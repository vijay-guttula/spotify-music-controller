import React, { useEffect, useState } from 'react';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SkipNextIcon from '@material-ui/icons/SkipNext';

const Player = (props) => {
  const [player, setPlayer] = useState(undefined);
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [current_track, setTrack] = useState({
    name: '',
    album: {
      images: [{ url: '' }],
    },
    artists: [{ name: '' }],
  });

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: 'Web Playback SDK',
        getOAuthToken: (cb) => {
          cb(props.token);
        },
        volume: 0.5,
      });

      setPlayer(player);

      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
      });

      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });

      player.addListener('player_state_changed', (state) => {
        if (!state) {
          return;
        }

        setTrack(state.track_window.current_track);
        setPaused(state.paused);

        player.getCurrentState().then((state) => {
          !state ? setActive(false) : setActive(true);
        });
      });

      player.connect();
    };
  }, []);

  if (!is_active) {
    return (
      <>
        <div className='main-wrapper'>
          <b>
            {' '}
            Instance not active. Transfer your playback using your Spotify app{' '}
          </b>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className='main-wrapper'>
          <img
            src={current_track.album.images[0].url}
            className='now-playing__cover'
            alt=''
          />
          <div className='nowPlayingComp'>
            <div className='now-playing__side'>
              <div className='now-playing__name'>{current_track.name}</div>
              <div className='now-playing__artist'>
                {current_track.artists[0].name}
              </div>
            </div>
            <div className='playbackBtns'>
              <div
                className='spotify-btn'
                onClick={() => {
                  player.previousTrack();
                }}
              >
                <SkipPreviousIcon />
              </div>

              <div
                className='spotify-btn'
                onClick={() => {
                  player.togglePlay();
                }}
              >
                {is_paused ? <PlayArrowIcon /> : <PauseIcon />}
              </div>

              <div
                className='spotify-btn'
                onClick={() => {
                  player.nextTrack();
                }}
              >
                <SkipNextIcon />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Player;
