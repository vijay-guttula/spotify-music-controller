import React, { useEffect, useState } from 'react';
import { Grid, Button, Typography, Box } from '@material-ui/core';

const Room = (props) => {
  let [state, setState] = useState({
    votesToSkip: 0,
    guestCanPause: true,
    isHost: true,
  });
  let roomCode = props.match.params.roomCode;

  useEffect(() => {
    const getRoomDetails = async () => {
      let response = await fetch('/api/get-room' + '?code=' + roomCode);
      let responseJson = await response.json();
      let tempState = {
        votesToSkip: responseJson.votes_to_skip,
        guestCanPause: responseJson.guest_can_pause,
        isHost: responseJson.is_host,
      };
      setState(tempState);
    };
    getRoomDetails();
    console.log(state);
  }, []);

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
      window.location.href = '/';
    }
  };

  return (
    <Box mt={40} mx='auto'>
      <Grid container spacing={1}>
        <Grid item xs={12} align='center'>
          <Typography variant='h4' component='h4'>
            Code: {roomCode}
          </Typography>
        </Grid>
        <Grid item xs={12} align='center'>
          <Typography variant='h6' component='h6'>
            Votes: {state.votesToSkip}
          </Typography>
        </Grid>
        <Grid item xs={12} align='center'>
          <Typography variant='h6' component='h6'>
            Guest Can Pause: {state.guestCanPause.toString()}
          </Typography>
        </Grid>
        <Grid item xs={12} align='center'>
          <Typography variant='h6' component='h6'>
            Host: {state.isHost.toString()}
          </Typography>
        </Grid>
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
    </Box>
  );
};

export default Room;
