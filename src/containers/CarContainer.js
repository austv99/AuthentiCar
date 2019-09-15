import React, {useContext, useState, useCallback} from 'react';
import TopBar from '../components/TopBar';
// import CarComponent from '../components/CarComponent';
import Grid from '@material-ui/core/Grid';
// import hondaNsx from '../assets/honda.jpg';
import { makeStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
import data from '../constants/car-items.json'
import PropsContext from '../contexts/PropsContext';
import CarDisplayComponent from '../components/CarDisplayComponent';
import SavedNoItems from '../components/SavedNoItems';
// import PropsContext from '../contexts/PropsContext';
import { useWavelet, useAccount, useContract } from 'react-use-wavelet';
import { Wavelet } from 'wavelet-client';
import JSBI from "jsbi";
// import StreamContext from '../contexts/StreamContext';
// import { descriptions } from 'jest-config';
import CircularProgress from '@material-ui/core/CircularProgress';
const BigInt = JSBI.BigInt;



const useStyles = makeStyles(theme => ({
    itemGrid: {
        marginTop: 64,
    },
    media: {
        height: 245,
    }

}))

const getItemFromId = id => data.items.filter(x => x.id === id)[0];


const CarContainer = props => {
    // const propsContext = useContext(PropsContext);
    
    const classes = useStyles();
    const propsContext = useContext(PropsContext);
    const index = Object.keys(propsContext.savedProps);
    console.log(index);
    const key = index[0]
    // console.log(propsContext.savedProps);

    const [client, node, clientErr] = useWavelet('https://testnet.perlin.net');
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
  
    const [contract] = useContract(client, '437696d7c018e635c98823856b4d83f0787084396431c42b8331c34ef88406d7', onUpdate, onLoad);

    let entryRes = []
    let comp = []
    let carLogsLength = carLogs.length;
        for (var i = 0; i < carLogsLength; i++) {
            entryRes = carLogs[i].split('\n');
        }
        let entryResLength = entryRes.length;
        for (var j = 0; j < entryResLength; j++) {
            let stringRes = entryRes[j].split('|');
            // console.log('whatwhatwhat');
            // console.log(key);
            if (stringRes[1] === key) {
                console.log('yo');
                let carName = stringRes[0];
                let carVin = stringRes[1];
                // streamContext.addToStream(stringRes[1]);
                let carOwner = stringRes[2];
                let carOdometer = stringRes[3];
                let carImage = '';
                carName = carName.toUpperCase();
                if (carName === 'HONDA NSX') {
                    carImage = 'honda_nsx.jpg'
                }
                comp.push(<Grid item> 
                <CarDisplayComponent
                    carName={carName}
                    carVin={carVin}
                    carOwner={carOwner}
                    carOdometer={carOdometer}
                    carImage={carImage} />
                </Grid>
                )

            }
        }
        let load = []
        if (comp.length === 0) {
            load.push(
                <Grid item>
                    <CircularProgress className={classes.progress} />
                </Grid>

            )
        }
        

    // useEffect(() => {
    //     console.log("here");
    //     {Object.keys(propsContext.savedProps).map(x => (
    //         propsContext.removeFromSavedProps(x)
    //     ))}
    // })
    return (
    <>
    <TopBar />
    <Grid 
            container 
            spacing={2} 
            justify='center' 
            className={classes.itemGrid}
        >
            {/* {propsContext.countProps > 0 ? (
            Object.keys(propsContext.savedProps).map(id => (
                <Grid item>
                    <CarDisplayComponent
                        key = {id}
                        id = {id}
                        title={getItemFromId(id).title}
                        image={getItemFromId(id).image}
                        description={getItemFromId(id).description}

                    />
                </Grid>
            )))
             : (
                <SavedNoItems />
            )
            } */}
            
            {load}
            {comp}
            
            
            


            
         </Grid>
     </>
    )
};

export default CarContainer; 