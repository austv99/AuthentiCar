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
// import { descriptions } from 'jest-config';
const BigInt = JSBI.BigInt;





function App() {
  // const [client, node, clientErr] = useWavelet('http://localhost:3000/');
  // const [account, accountErr] = useAccount(client, '315f62c8f44fb6bf8351c9051b466ea93bf204706cc76a3878196caf253205f2d2b782d908775508aa65ecbc3327f78b200518623282bd75b617d72b07bc8612');
  // const [carLogs, setCarLogs] = useState([]);

  // const onUpdate = useCallback((contract) => {
  //   const wallet = Wavelet.loadWalletFromPrivateKey('315f62c8f44fb6bf8351c9051b466ea93bf204706cc76a3878196caf253205f2d2b782d908775508aa65ecbc3327f78b200518623282bd75b617d72b07bc8612');
  //   setCarLogs(contract.test(wallet, 'get_cars', BigInt(0)).logs);
  // }, []);

  // const onLoad = useCallback((contract) => {
  //   const wallet = Wavelet.loadWalletFromPrivateKey('315f62c8f44fb6bf8351c9051b466ea93bf204706cc76a3878196caf253205f2d2b782d908775508aa65ecbc3327f78b200518623282bd75b617d72b07bc8612');
  //   setCarLogs(contract.test(wallet,'get_cars', BigInt(0)).logs);
  // }, []);

  // const [contract] = useContract(client, '50d01c281137478cf52a3aa712bb079b7a661b85ed821c4d6c895a14f3fa09be', onUpdate, onLoad);

  // const logCar = (car) => {
  //   const wallet = Wavelet.loadWalletFromPrivateKey('315f62c8f44fb6bf8351c9051b466ea93bf204706cc76a3878196caf253205f2d2b782d908775508aa65ecbc3327f78b200518623282bd75b617d72b07bc8612');
  //   contract && contract.call(wallet, 'log_car', BigInt(0), BigInt(25000), BigInt(0), {
  //     type: 'string',
  //     value: owner
  //   }, {
  //     type: 'string',
  //     value: vin
  //   }, {
  //     type: 'string',
  //     value: description
  //   }, {
  //     type: 'u32',
  //     value: odometer
  //   }, {
  //     type: 'u32',
  //     value: id
  //   });
  // };










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
      const newSaved = {...saved};
      delete newSaved[itemId];
      setSaved(newSaved);
    }
  };

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

  const countProps = Object.keys(savedProps).reduce((a,c) => a + savedProps[c], 0);
  return (
    <ThemeProvider theme={theme}>
      <PropsContext.Provider value={{savedProps, addToSavedProps, removeFromSavedProps, countProps}}>
        <SavedContext.Provider value={{saved, addToSaved, removeFromSaved, count}}>
          <Router>
            <Route exact path="/" component={Main} />
            <Route path="/search" component={Search} />
            <Route path="/account" component={Account} />
            <Route path="/car" component={Car} />
            <Route path="/log" component={Log} />
            <Route path="/login" component={Login} />

          </Router>
        </SavedContext.Provider>
      </PropsContext.Provider>
    </ThemeProvider>
    
  );
}

export default App;
