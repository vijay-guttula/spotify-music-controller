import { Box, Button, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Box mt={10} mx='auto'>
      <Grid container spacing={1}>
        <Grid item xs={12} align='center'>
          <Typography variant='h4' component='h4'>
            Hi, welcome to spotify music control
          </Typography>
        </Grid>
        <Box mx='auto'>
          <Box mt={10} mx='auto'>
            <Grid item xs={12} align='center'>
              <Button
                variant='contained'
                color='success'
                to='/create'
                component={Link}
              >
                Create Room
              </Button>
            </Grid>
          </Box>
          <Box mt={5} mx='auto'>
            <Grid item xs={12} align='center'>
              <Button
                variant='contained'
                color='primary'
                to='/join'
                component={Link}
              >
                Join Room
              </Button>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};

export default Home;
