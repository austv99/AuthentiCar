import React, { useState, useEffect, useCallback } from 'react';
import Main from './containers/MainContainer';
import Search from './containers/SearchContainer';
import Account from './containers/AccountContainer';
import './App.css';
import {ThemeProvider} from '@material-ui/styles';
import theme from './theme';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import SavedContext from './contexts/SavedContext';
import Car from './containers/CarContainer';
import Log from './containers/LogContainer';
import Login from './containers/LoginContainer';
import PropsContext from './contexts/PropsContext';
// import { useWavelet, useAccount, useContract } from 'react-use-wavelet';
// import { Wavelet } from 'wavelet-client';
// import JSBI from "jsbi";
// const BigInt = JSBI.BigInt;
import { useWavelet, useAccount, useContract } from 'react-use-wavelet';
import { Wavelet } from 'wavelet-client';
import JSBI from "jsbi";
import StreamContext from './contexts/StreamContext'
// import { descriptions } from 'jest-config';
const BigInt = JSBI.BigInt;






function App() {
  const [stream, setStream] = useState({});
  useEffect(() => {
    console.log(stream);
  }, [stream]);

  const addToStream = streamId => {
    const oldAmount = stream[streamId] || 0;
    const newStream = {...stream};
    newStream[streamId] = oldAmount + 1;
    setStream(newStream);
  }

  const removeFromStream = streamId => {
    if (stream.hasOwnProperty(streamId)) {
      const newStream = {...stream};
      delete newStream[streamId];
      setStream(newStream);
    }
  };

  const streamCount = Object.keys(stream).reduce((a,c) => a + stream[c], 0);

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

  const removeFromSaved = itemId => {
    if (saved.hasOwnProperty(itemId)) {
      console.log('here'+ ' '+itemId);
      const newSaved = {...saved};
      // console.log('key:'+ ' '+ Object.keys(newSaved)[itemId])
      delete newSaved[itemId];
      setSaved(newSaved);
    }
  };

  const clearSaved = () => {
    const clear = {};
    setSaved(clear);


  }

  const count = Object.keys(saved).reduce((a,c) => a + saved[c], 0);

  const[savedProps, setSavedProps] = useState({});
  useEffect(() => {
    // console.log(savedProps);
  }, [savedProps]);

  const addToSavedProps = carId => {
    const oldQuan = savedProps[carId] || 0;
    const newSavedProps = {...savedProps};
    newSavedProps[carId] = oldQuan + 1;
    setSavedProps(newSavedProps);
  };

  const removeFromSavedProps = carId => {
    if (savedProps.hasOwnProperty(carId)) {
      const newSavedProps = {...savedProps};
      delete newSavedProps[carId];
      setSavedProps(newSavedProps);
    }
  };

  const clearProps = () => {
    const clear = {};
    setSavedProps(clear);
  }

  const countProps = Object.keys(savedProps).reduce((a,c) => a + savedProps[c], 0);
  return (
    <ThemeProvider theme={theme}>
      <PropsContext.Provider value={{savedProps, addToSavedProps, removeFromSavedProps, countProps, clearProps}}>
        <SavedContext.Provider value={{saved, addToSaved, removeFromSaved, count, clearSaved}}>
          <StreamContext.Provider value={{stream, addToStream, removeFromStream, streamCount}}>
            <Router>
              <Route exact path="/" component={Main} />
              <Route path="/search" component={Search} />
              <Route path="/account" component={Account} />
              <Route path="/car" component={Car} />
              <Route path="/log" component={Log} />
              <Route path="/login" component={Login} />

            </Router>
          </StreamContext.Provider>
        </SavedContext.Provider>
      </PropsContext.Provider>
    </ThemeProvider>
    
  );
}

export default App;
