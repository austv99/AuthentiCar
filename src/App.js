import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
import Main from './containers/MainContainer';
import Search from './containers/SearchContainer';
import Account from './containers/AccountContainer';
import './App.css';
import {ThemeProvider} from '@material-ui/styles';
import theme from './theme';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import SavedContext from './contexts/SavedContext'
import Car from './containers/CarContainer'
// import { useWavelet, useAccount, useContract } from 'react-use-wavelet';
// import { Wavelet } from 'wavelet-client';
// import JSBI from "jsbi";
// const BigInt = JSBI.BigInt;




function App() {
  const[saved, setSaved] = useState({});
  useEffect(() => {
    console.log(saved);
  }, [saved]);

  const addToSaved = itemId => {
    const oldQty = saved[itemId] || 0;
    const newSaved = {...saved};
    newSaved[itemId] = oldQty + 1;
    setSaved(newSaved);
  };

  const removeFromSaved = itemId=> {
    if (saved.hasOwnProperty(itemId)) {
      const newSaved = {...saved};
      delete newSaved[itemId];
      setSaved(newSaved);
    }
  };

  const count = Object.keys(saved).reduce((a,c) => a + saved[c], 0);




  return (
    <ThemeProvider theme={theme}>
      <SavedContext.Provider value={{saved, addToSaved, removeFromSaved, count}}>
        <Router>
          <Route exact path="/" component={Main} />
          <Route path="/search" component={Search} />
          <Route path="/account" component={Account} />
          <Route path="/car" component={Car} />

        </Router>
      </SavedContext.Provider>
    </ThemeProvider>
    
  );
}

export default App;
