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
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
// import StreamContext from '../contexts/StreamContext';
// import { descriptions } from 'jest-config';
const BigInt = JSBI.BigInt;



const useStyles = makeStyles(theme => ({
    itemGrid: {
        marginTop: 64,
    },
    progress: {
        margin: theme.spacing(2),
      },

}))

const MainContainer = props => {
    const classes = useStyles();
    const propsContext = useContext(PropsContext);
    const savedContext = useContext(SavedContext);
    // const streamContext = useContext(StreamContext);

    const [client, node, clientErr] = useWavelet('https://testnet.perlin.net');
    const [account, accountErr] = useAccount(client, '315f62c8f44fb6bf8351c9051b466ea93bf204706cc76a3878196caf253205f2d2b782d908775508aa65ecbc3327f78b200518623282bd75b617d72b07bc8612');
    const [carLogs, setCarLogs] = useState([]);
    let conn = true;
    const onUpdate = useCallback((contract) => {
      const wallet = Wavelet.loadWalletFromPrivateKey('315f62c8f44fb6bf8351c9051b466ea93bf204706cc76a3878196caf253205f2d2b782d908775508aa65ecbc3327f78b200518623282bd75b617d72b07bc8612');
      setCarLogs(contract.test(wallet, 'get_cars', BigInt(0)).logs);
      if (carLogs.length === 0) {
        conn = false;
      }
    }, []);
  
    const onLoad = useCallback((contract) => {
      const wallet = Wavelet.loadWalletFromPrivateKey('315f62c8f44fb6bf8351c9051b466ea93bf204706cc76a3878196caf253205f2d2b782d908775508aa65ecbc3327f78b200518623282bd75b617d72b07bc8612');
      setCarLogs(contract.test(wallet,'get_cars', BigInt(0)).logs);
      if (carLogs.length === 0) {
          conn = false;
      }
    }, []);
  
    const [contract] = useContract(client, '437696d7c018e635c98823856b4d83f0787084396431c42b8331c34ef88406d7', onUpdate, onLoad);
    // let resA = [];
    // let resF = [];
    
    console.log(carLogs);
    let entryRes = [];
    let objRes =[];
    // let objSave = [];
    // let add = false;
    let tempVin = [];
    // let result = new Object();
    let carLogsLength = carLogs.length;
    let load = []
    // console.log(conn);
    if (carLogs.length === 0 && conn) {
        load.push(
            <Grid item>
                <CircularProgress className={classes.progress} />
            </Grid>

        )
    }
    
        
        for (var i = 0; i < carLogsLength; i++) {
            entryRes = carLogs[i].split('\n');
        }
        // let entryLengthReserve = 0;
        let entryResLength = entryRes.length;
        // console.log(entryResLength);
        
        // console.log(streamContext.stream)

        for (var j = 0; j < entryResLength; j++) {
            let stringRes = entryRes[j].split('|');
            // resF.push(stringRes);
            // console.log(stringRes[0])
            // let object = {
            //     carName: stringRes[0],
            //     carVin: stringRes[1],
            //     carOwner: stringRes[2],
            //     carOdometer: stringRes[3]

            // }
            // objSave.push(object);
            let carName = stringRes[0];
            let carVin = stringRes[1];
            // console.log(stringRes[1]);
            // streamContext.addToStream(stringRes[1]);
            let carOwner = stringRes[2];
            let carOdometer = stringRes[3];
            let carImage = '';
            carName = carName.toUpperCase();
            if (carName === 'HONDA NSX') {
                carImage = 'honda_nsx.jpg'

            }
            if (carVin) {
                objRes.push(<Grid item>
                <CarComponent 
                carName={carName}
                carVin={carVin}
                carOwner={carOwner}
                carOdometer={carOdometer}
                carImage={carImage}
                />
                </Grid>
                )
            }

        }
        // let emp = []
        // if (objRes.length == 0) {
        //     load = []
        //     load.push(
        //     <Grid item>
        //         <Typography gutterBottom variant="h5" component="h2">
        //         No Cars Saved in Log
        //         </Typography>

        //     </Grid>)
        // }

        // for ( var i = 0; i < tempVin.length; i++) {
        //     streamContext.addToStream(tempVin[i]);
        // }
        // console.log(tempVin);
        // console.log(streamContext.streamCount)
        // if (tempVin.length >= streamContext.streamCount) {
        //     // let diff = tempVin.length - streamContext.streamCount;
        //     // console.log(tempVin.length);
        //     // console.log(streamContext.streamCount);
        //     // console.log(diff);
        //     for (var a = 0; a < tempVin.length; a++) {
        //         if (streamContext.stream.hasOwnProperty(tempVin[a])) {
        //             streamContext.removeFromStream(tempVin[a]);
        //         }
        //     }
        //     for (var z = 0; z < tempVin.length; z++) {
        //         streamContext.addToStream(tempVin[z]);
        //     }
        //     // streamContext.addToStream(tempVin[0]);
        // }
        // console.log(streamContext.stream);
        // let vinCopy = [];
        // let objCopy = [];
        // // console.log(objSave);
        // if (tempVin.length > streamContext.streamCount) {
        //     vinCopy = [...tempVin];
        //     objCopy = [...objSave];
            
        //     tempVin.shift();
        //     objSave.shift();
        // }

        // for (var b = 0; b < tempVin.length; b++) {
        //     streamContext.removeFromStream(objSave[b]);
            
        // }
        // for (var c = 0; c < vinCopy.length; c++) {
        //     streamContext.addToStream(objCopy[c]);
        //     console.log(streamContext.stream);
        // }

        
        
    
    useEffect(() => {
        
    },[carLogs])
    

    useEffect(() => {
        // console.log("here");
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
        {/* {data.items.map(x => (
            <Grid item key={x.vin}>
                <CarComponent {...x}/>
            </Grid>
        ))} */}
        {load}
        {objRes}

        

        
        





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