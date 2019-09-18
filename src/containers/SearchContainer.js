import React, {useState, useCallback} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useWavelet, useAccount, useContract } from 'react-use-wavelet';
import { Wavelet } from 'wavelet-client';
import CarComponent from '../components/CarComponent';
import Typography from '@material-ui/core/Typography';
import JSBI from "jsbi";
const BigInt = JSBI.BigInt;
const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    toolbar: {
        justifyContent: 'space-between',
    },
    title: {
      flexGrow: 1,
    },
    searchIcon: {
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: 200,
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(0),
    },
    progress: {
        margin: theme.spacing(2),
      },
      itemGrid: {
        marginTop: 64,
    },
  }));
  

let search = "";

const SearchContainer = (props) => {
    const classes = useStyles();
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
    // let load = [];
    function loading () {
        if (carLogs.length === 0) {
            return(
                <Grid item>
                    <CircularProgress className={classes.progress} />
                </Grid>
            );
        } else {
          return (
            <Grid item> 
            <Typography gutterBottom variant="h5" component="h2">
            Search using a VIN
          </Typography>
            </Grid>
          )
        }
    }
    const [contract] = useContract(client, '28e0ea3defced9bac9d3dcc60d2d58d57bf3cb4d874b89e5ea2943e47bead49f', onUpdate, onLoad);
    console.log(carLogs);
    
    function compareVin () {
      let res = []
      for (var i = 0; i < carLogs.length; i++) {
        res = carLogs[i].split('\n');
      }
      for (var i = 0; i < res.length; i++) {
        let carOb = JSON.parse(res[i]);
        let carName = '';
        carName = carOb.carName;
        carName = carName.toUpperCase();
        let carImage = '';
        if (carName === 'HONDA NSX') {
            carImage = 'honda_nsx.jpg';
        }
        if (carName === 'TOYOTA CAMRY') {
          carImage = 'toyota_camry.jpg';
        }
        if (carName === 'CADILLAC ESCALADE') {
          carImage = 'cadillac_escalade.jpg';
        }
        if (carName === 'AUDI A8') {
          carImage = 'audi_a8.jpg';
      }
      if (carName === 'AUDI A4') {
        carImage = 'audi_a4.png';
    }
        if (carOb.carVin === search) {
        return(
            <Grid item>
                <CarComponent
                carName={carName}
                carVin={carOb.carVin}
                carOwner={carOb.carOwner}
                carOdometer={carOb.carOdometer}
                carYear = {carOb.carYear}
                carGearbox = {carOb.carGearbox}
                carAccidents = {carOb.carAccidents}
                carMaintenance = {carOb.carMaintenance}
                carImage={carImage}
                />
            </Grid>
        );
        }
      }





    // let objRes =[];
    // let entryRes = [];
    //     let carLogsLength = carLogs.length;
    //     for (var i = 0; i < carLogsLength; i++) {
    //         entryRes = carLogs[i].split('\n');
    //     }
    //     // let entryLengthReserve = 0;
    //     let entryResLength = entryRes.length;
    //     // console.log(entryResLength);
        
    //     // console.log(streamContext.stream)

    //     for (var j = 0; j < entryResLength; j++) {
    //         let stringRes = entryRes[j].split('|');
    //         // resF.push(stringRes);
    //         // console.log(stringRes[0])
    //         // let object = {
    //         //     carName: stringRes[0],
    //         //     carVin: stringRes[1],
    //         //     carOwner: stringRes[2],
    //         //     carOdometer: stringRes[3]

    //         // }
    //         // objSave.push(object);
    //         let carName = stringRes[0];
    //         let carVin = stringRes[1];
    //         // console.log(stringRes[1]);
    //         // streamContext.addToStream(stringRes[1]);
    //         let carOwner = stringRes[2];
    //         let carOdometer = stringRes[3];
    //         let carImage = '';
    //         carName = carName.toUpperCase();
    //         if (carName === 'HONDA NSX') {
    //             carImage = 'honda_nsx.jpg'

    //         }
    //         if (carVin === search) {
    //             return(<Grid item>
    //             <CarComponent 
    //             carName={carName}
    //             carVin={carVin}
    //             carOwner={carOwner}
    //             carOdometer={carOdometer}
    //             carImage={carImage}
    //             />
    //             </Grid>
    //             );
    //         }

    //     }
}

    
    

    // let load = [];
    // console.log(carLogs)
    return (
        <>
        <Search />
        <Grid 
        container 
        spacing={2} 
        justify='center' 
        className={classes.itemGrid}
    >
        {loading()}
        {compareVin()}
        </Grid>
        
        
        
        </>
      );
    
        

    }



    


const Search = (props) => {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        search: ''
      });
    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };
    // const handleKeyPress = (event) => {
    //   if(event.key === 'Enter'){
    //     console.log('enter press here! ');

    //   }
    // };
    
    const handleSubmit = (event) => {
        console.log(values.search);
        search = values.search;
    }
        return (
            <div className={classes.root}>
          <AppBar position="fixed">
            <Toolbar className={classes.toolbar}>
                <Grid item>
              <Button 
                color="inherit"
                component={Link}
                to="/"
              >
                AuthentiCar
              </Button>
              </Grid>

            <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              value={values.search}
              onChange={handleChange('search')}
              onKeyPress={handleSubmit}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
              <Grid item>
                <Button 
                  color="inherit"
                  component={Link}
                  to="/account"
                  >
                  Account
                </Button>
              </Grid>
            </Toolbar>
          </AppBar>
        </div>

        );

}








export default SearchContainer;