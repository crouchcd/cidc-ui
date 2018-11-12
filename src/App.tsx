import * as React from 'react';
import './App.css';

import logo from './logo.svg';
import {StatusTable} from './StatusTable';
import DangerButton from './Test';


const data = [
  {
    file_name: 'file_one', id: '213'
  },
  {
    file_name: 'zebra', id: '456'
  }
]

const proper = {
  rows: data
}

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <DangerButton />
        <StatusTable {...proper}/>
      </div>
    );
  }
}

export default App;
