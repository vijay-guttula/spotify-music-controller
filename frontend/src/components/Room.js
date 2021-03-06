import React, { useEffect, useState } from 'react';
import { Grid, Button, Typography, Box, Avatar } from '@material-ui/core';
import CreateRoom from './CreateRoom';
import Player from './Player';

const Room = (props) => {
  let [state, setState] = useState({
    votesToSkip: 0,
    guestCanPause: true,
    isHost: true,
    spotifyAuthenticated: false,
    accessToken: '',
  });
  let [showSettings, setShowSettings] = useState(false);
  let roomCode = props.match.params.roomCode;
  // console.log(props);

  useEffect(() => {
    const authenticateSpotify = async () => {
      let response = await fetch('/spotify/is-authenticated');
      let data = await response.json();
      console.log(data);
      if (data.status) {
        setState({
          ...state,
          spotifyAuthenticated: true,
          accessToken: data.accessToken,
        });
      } else {
        let response = await fetch('/spotify/get-auth-url');
        let data = await response.json();
        console.log(data);
        window.location.replace(data.url);
      }
    };
    const getRoomDetails = async () => {
      let response = await fetch('/api/get-room' + '?code=' + roomCode);
      let responseJson = await response.json();
      console.log(responseJson);
      if (!response.ok) {
        window.alert(responseJson.message);
        window.location.href = '/';
      }
      let tempState = {
        votesToSkip: responseJson.votes_to_skip,
        guestCanPause: responseJson.guest_can_pause,
        isHost: responseJson.is_host,
      };
      setState(tempState);
    };

    const callerFunction = async () => {
      await getRoomDetails();
      await authenticateSpotify();
    };

    callerFunction();
  }, [showSettings]);

  const handleLeaveButtonClick = async (e) => {
    let requestData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    let response = await fetch('/api/leave-room', requestData);
    let data = await response.json();
    console.log(data);
    if (response.ok) {
      props.history.push('/');
    }
  };

  const handleUpdateSettingsClick = () => {
    setShowSettings(true);
  };

  const handleCloseUpdateClick = (e) => {
    setShowSettings(false);
  };

  const getCurrentSong = async () => {
    let response = await fetch('/spotify/get-playback-state');
    let data = await response.json();
    if (!response.ok) {
      return {};
    }
    let song = data.data;
    setState({ ...state, song: song });
  };

  return (
    <Box mt={20} mx='auto'>
      {showSettings ? (
        <>
          <CreateRoom update={true} state={state} roomCode={roomCode} />
          <Grid item xs={12} align='center'>
            <Button
              variant='contained'
              color='secondary'
              onClick={(e) => handleCloseUpdateClick(e)}
            >
              Close
            </Button>
          </Grid>
        </>
      ) : (
        <Grid container spacing={1}>
          <Grid item xs={12} align='center'>
            <Typography variant='h4' component='h4'>
              Code: {roomCode}
            </Typography>
          </Grid>

          {state.accessToken && <Player token={state.accessToken} />}

          {state.isHost && (
            <Grid item xs={12} align='center'>
              <Button
                variant='contained'
                color='primary'
                onClick={(e) => handleUpdateSettingsClick(e)}
              >
                Update Settings
              </Button>
            </Grid>
          )}

          <Grid item xs={12} align='center'>
            <Button
              variant='contained'
              color='secondary'
              onClick={(e) => handleLeaveButtonClick(e)}
            >
              Leave Room
            </Button>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Room;
