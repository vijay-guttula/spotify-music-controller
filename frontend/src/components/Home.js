import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CreateRoom from './CreateRoom';
import RoomJoin from './RoomJoin';
import Room from './Room';

const Home = () => {
  return (
    <Router>
      <Switch>
        <Route path='/create' component={CreateRoom} />
        <Route path='/join' component={RoomJoin} />
        <Route path='/room/:roomCode' component={Room} />
      </Switch>
    </Router>
  );
};

export default Home;
