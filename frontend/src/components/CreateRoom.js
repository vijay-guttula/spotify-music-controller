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
import Link from 'react-router-dom';
import { useState } from 'react';

const CreateRoom = () => {
  const [defaultVotes, setdefaultVotes] = useState(2);

  const handleGuestCanPauseChange = () => {
    return;
  };

  const handleVotesChange = () => {
    return;
  };

  const handleRoomButtonPressed = () => {
    return;
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
              onChange={() => handleGuestCanPauseChange()}
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
              onChange={() => handleVotesChange()}
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
