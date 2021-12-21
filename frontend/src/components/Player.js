import React from 'react';
import {
  Grid,
  Typography,
  Card,
  IconButton,
  LinearProgress,
  Box,
} from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SkipNextIcon from '@material-ui/icons/SkipNext';

const Player = (props) => {
  return (
    <Card>
      <Grid container alignItems='center'>
        <Grid item align='center' xs={4}>
          <img src={props.song.image_url} height='100%' width='100%' />
        </Grid>

        <Grid item align='center' xs={8}>
          <Typography component='h5' variant='h5'>
            {props.song.title}
          </Typography>
          <Typography color='textSecondary' variant='subtitle1'>
            {props.song.artist}
          </Typography>
          <div>
            <IconButton>
              {props.song.is_playing ? <PauseIcon /> : <PlayArrowIcon />}
            </IconButton>
            <IconButton>
              <SkipNextIcon />
            </IconButton>
          </div>
        </Grid>
      </Grid>
      {/* <LinearProgress variant='determinate' value={songProgress} /> */}
    </Card>
  );
};

export default Player;
