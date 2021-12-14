import React from 'react';
import Home from './Home';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CreateRoom from './CreateRoom';
import RoomJoin from './RoomJoin';
import Room from './Room';

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/create' component={CreateRoom} />
          <Route path='/join' component={RoomJoin} />
          <Route path='/room/:roomCode' component={Room} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
ReactDOM.render(<App />, document.getElementById('app'));
