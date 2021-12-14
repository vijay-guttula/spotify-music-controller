import React from 'react';
import {
  Grid,
  Button,
  Typography,
  TextField,
  FormHelperText,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
  Box,
} from '@material-ui/core';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const CreateRoom = () => {
  const [defaultVotes, setdefaultVotes] = useState(2);
  const [state, setState] = useState({
    guestCanPause: true,
    votesToSkip: defaultVotes,
  });
  let history = useHistory();
  console.log(history);

  const handleGuestCanPauseChange = (e) => {
    let tempState = {
      ...state,
      guestCanPause: e.target.value == 'true' ? true : false,
    };
    setState(tempState);
    console.log(state);
  };

  const handleVotesChange = (e) => {
    let tempState = {
      ...state,
      votesToSkip: e.target.value,
    };
    setState(tempState);
    console.log(state);
  };

  const handleRoomButtonPressed = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        votes_to_skip: state.votesToSkip,
        guest_can_pause: state.guestCanPause,
      }),
    };

    let response = await fetch('/api/create-room', requestOptions);
    let responseJson = await response.json();
    console.log(responseJson);
    if (response.ok) history.push('/room/' + responseJson.code);
  };

  return (
    <Box mt={10} mx='auto'>
      <Grid container spacing={1}>
        <Grid item xs={12} align='center'>
          <Typography component='h4' variant='h4'>
            Create A Room
          </Typography>
        </Grid>
        <Grid item xs={12} align='center'>
          <FormControl component='fieldset'>
            <FormHelperText>
              <div align='center'>Guest Control of Playback State</div>
            </FormHelperText>
            <RadioGroup
              row
              defaultValue='true'
              onChange={(e) => handleGuestCanPauseChange(e)}
            >
              <FormControlLabel
                value='true'
                control={<Radio color='primary' />}
                label='Play/Pause'
                labelPlacement='bottom'
              />
              <FormControlLabel
                value='false'
                control={<Radio color='secondary' />}
                label='No Control'
                labelPlacement='bottom'
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} align='center'>
          <FormControl>
            <TextField
              required={true}
              type='number'
              onChange={(e) => handleVotesChange(e)}
              defaultValue={defaultVotes}
              inputProps={{
                min: 1,
                style: { textAlign: 'center' },
              }}
            />
            <FormHelperText>
              <div align='center'>Votes Required To Skip Song</div>
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} align='center'>
          <Button
            color='primary'
            variant='contained'
            onClick={() => handleRoomButtonPressed()}
          >
            Create A Room
          </Button>
        </Grid>
        <Grid item xs={12} align='center'>
          <Button color='secondary' variant='contained' to='/' component={Link}>
            Back
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreateRoom;
