import React, {useEffect, useContext, useState, useCallback} from 'react';
import TopBar from '../components/TopBar';
import data from '../constants/car-items.json'
import CarComponent from '../components/CarComponent';
import Grid from '@material-ui/core/Grid';
// import hondaNsx from '../assets/honda.jpg';
import { makeStyles } from '@material-ui/core/styles';
import PropsContext from '../contexts/PropsContext';
import SavedContext from '../contexts/SavedContext';
// import SavedContext from '../contexts/SavedContext';
// import SnackBarComponent from '../components/SnackBarComponent'
import SnackBarComponent from '../components/SnackBarComponent';
import EndList from '../components/EndListComponent';
import { useWavelet, useAccount, useContract } from 'react-use-wavelet';
import { Wavelet } from 'wavelet-client';
import JSBI from "jsbi";
// import { descriptions } from 'jest-config';
const BigInt = JSBI.BigInt;



const useStyles = makeStyles(them => ({
    itemGrid: {
        marginTop: 64,
    }

}))

const MainContainer = props => {
    const classes = useStyles();
    const propsContext = useContext(PropsContext);
    const savedContext = useContext(SavedContext);
    const [client, node, clientErr] = useWavelet('http://localhost:3000/');
    const [account, accountErr] = useAccount(client, '315f62c8f44fb6bf8351c9051b466ea93bf204706cc76a3878196caf253205f2d2b782d908775508aa65ecbc3327f78b200518623282bd75b617d72b07bc8612');
    const [carLogs, setCarLogs] = useState([]);
  
    const onUpdate = useCallback((contract) => {
      const wallet = Wavelet.loadWalletFromPrivateKey('315f62c8f44fb6bf8351c9051b466ea93bf204706cc76a3878196caf253205f2d2b782d908775508aa65ecbc3327f78b200518623282bd75b617d72b07bc8612');
      setCarLogs(contract.test(wallet, 'get_cars', BigInt(0)).logs);
    }, []);
  
    const onLoad = useCallback((contract) => {
      const wallet = Wavelet.loadWalletFromPrivateKey('315f62c8f44fb6bf8351c9051b466ea93bf204706cc76a3878196caf253205f2d2b782d908775508aa65ecbc3327f78b200518623282bd75b617d72b07bc8612');
      setCarLogs(contract.test(wallet,'get_cars', BigInt(0)).logs);
    }, []);
  
    const [contract] = useContract(client, '2a2a720997b8451b590668f0f76ff38a45d6cf77a605c61e7815fe521f391530', onUpdate, onLoad);

    console.log(carLogs);
    console.log('test');




    useEffect(() => {
        console.log("here");
        Object.keys(propsContext.savedProps).map(x => (
            propsContext.removeFromSavedProps(x)
        ))
    })
    // const valid = true;
    return (
    <>
    <TopBar />
    <Grid 
        container 
        spacing={2} 
        justify='center' 
        className={classes.itemGrid}
    >
        {data.items.map(x => (
            <Grid item key={x.id}>
                <CarComponent {...x}/>
            </Grid>
        ))}
        {savedContext.count > 0 ? (
            Object.keys(savedContext.saved).map(id => (
                <Grid item>
                    <SnackBarComponent />
                </Grid>
            )))
             : (
                <EndList />
            )
            }
        
     </Grid>
     </>
    )
};

export default MainContainer; 