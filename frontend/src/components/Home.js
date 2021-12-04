import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CreateRoom from './CreateRoom';
import RoomJoin from './RoomJoin';

const Home = () => {
  return (
    <Router>
      <Switch>
        <Route path='/create' component={CreateRoom} />
        <Route path='/join' component={RoomJoin} />
      </Switch>
    </Router>
  );
};

export default Home;
