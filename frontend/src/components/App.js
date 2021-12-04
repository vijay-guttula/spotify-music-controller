import React from 'react';
import HomePage from './Home';
import ReactDOM from 'react-dom';

const App = () => {
  return (
    <div>
      <HomePage />
    </div>
  );
};

export default App;
ReactDOM.render(<App />, document.getElementById('app'));
