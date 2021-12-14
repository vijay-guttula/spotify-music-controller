import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Box } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';

const RoomJoin = () => {
  let history = useHistory();
  let [state, setState] = useState({
    roomCode: '',
    error: '',
  });

  const handleTextFieldChange = (e) => {
    let tempState = {
      roomCode: e.target.value,
    };
    setState(tempState);
  };

  const handleRoomButtonClick = async (e) => {
    let responseData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: state.roomCode,
      }),
    };
    let response = await fetch('/api/join-room', responseData);
    let responseJson = await response.json();
    console.log(responseJson);
    if (response.ok) {
      history.push('/room/' + state.roomCode);
    }
  };

  return (
    <Box mt={20} mx='auto'>
      <Grid container spacing={1}>
        <Grid item xs={12} align='center'>
          <Typography variant='h4' component='h4'>
            Join a Room
          </Typography>
        </Grid>
        <Grid item xs={12} align='center'>
          <TextField
            error={state.error}
            label='Code'
            placeholder='Enter a Room Code'
            value={state.roomCode}
            helperText={state.error}
            variant='outlined'
            onChange={(e) => handleTextFieldChange(e)}
          />
        </Grid>
        <Grid item xs={12} align='center'>
          <Button
            variant='contained'
            color='primary'
            onClick={(e) => handleRoomButtonClick(e)}
          >
            Enter Room
          </Button>
        </Grid>
        <Grid item xs={12} align='center'>
          <Button variant='contained' color='secondary' to='/' component={Link}>
            Back
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RoomJoin;
