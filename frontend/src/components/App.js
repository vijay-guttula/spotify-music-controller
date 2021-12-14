import React, { useEffect, useState } from 'react';
import Home from './Home';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import CreateRoom from './CreateRoom';
import RoomJoin from './RoomJoin';
import Room from './Room';

const App = () => {
  const [state, setstate] = useState({
    roomCode: null,
  });
  useEffect(() => {
    const checkUserInRoom = async () => {
      let response = await fetch('/api/user-in-room');
      let data = await response.json();
      console.log(data);
      setstate({
        roomCode: data.code,
      });
    };
    checkUserInRoom();
  }, []);

  return (
    <div>
      <Router>
        <Switch>
          <Route
            exact
            path='/'
            render={() => {
              return state.roomCode ? (
                <Redirect to={`/room/${state.roomCode}`} />
              ) : (
                <Home />
              );
            }}
          />
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
