import React, { useEffect, useState } from 'react';

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

  return (
    <div>
      <h3>{roomCode}</h3>
      <p>Votes: {state.votesToSkip}</p>
      <p>Guest Can Pause: {state.guestCanPause.toString()}</p>
      <p>Host: {state.isHost.toString()}</p>
    </div>
  );
};

export default Room;
