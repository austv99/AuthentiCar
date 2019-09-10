import React, {useState, useCallback} from 'react';
// import logo from './logo.svg';
import Main from './containers/MainContainer';
import Search from './containers/SearchContainer';
import './App.css';
import {ThemeProvider} from '@material-ui/styles';
import theme from './theme';
import {BrowserRouter as Router, Route} from 'react-router-dom';
// import { useWavelet, useAccount, useContract } from 'react-use-wavelet';
// import { Wavelet } from 'wavelet-client';
// import JSBI from "jsbi";
// const BigInt = JSBI.BigInt;




function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Route exact path="/" component={Main} />
        <Route path="/search" component={Search} />
      </Router>
    </ThemeProvider>
    
  );
}

export default App;
