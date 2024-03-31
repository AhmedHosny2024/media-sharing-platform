import React from 'react';
import './App.css';
import Navbar from './Components/Navbar/navbar';
import Mainpage from './Components/Mainpage/main';
import { SnackbarProvider } from 'notistack';

function App() {
  return (
    <div className="App">
      <SnackbarProvider maxSnack={1}>
        <React.Fragment>
          <Navbar />
          <Mainpage />
          <footer className="footer"/>
        </React.Fragment>
      </SnackbarProvider>
      
    </div>
  );
}

export default App;
