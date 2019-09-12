



import React, {useCallback, useState} from 'react';
// import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
// import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import AccountTopBar from '../components/AccountTopBar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { useWavelet, useAccount, useContract } from 'react-use-wavelet';
import { Wavelet } from 'wavelet-client';
import JSBI from "jsbi";
// import { descriptions } from 'jest-config';
const BigInt = JSBI.BigInt;

const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(12),
    marginRight: theme.spacing(0),
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 200,
  },
  itemGrid: {
      marginTop: 64,
  }
}));

const LogContainer = props =>  {
  const classes = useStyles();
  const [client, node, clientErr] = useWavelet('http://localhost:3000/');
  // const [carLogs, setCarLogs] = useState([]);
  // const onUpdate = useCallback((contract) => {
  //   const wallet = Wavelet.loadWalletFromPrivateKey('315f62c8f44fb6bf8351c9051b466ea93bf204706cc76a3878196caf253205f2d2b782d908775508aa65ecbc3327f78b200518623282bd75b617d72b07bc8612');
  //   setCarLogs(contract.test(wallet, 'get_cars', BigInt(0)).logs);
  // }, []);


  // const onLoad = useCallback((contract) => {
  //   const wallet = Wavelet.loadWalletFromPrivateKey('315f62c8f44fb6bf8351c9051b466ea93bf204706cc76a3878196caf253205f2d2b782d908775508aa65ecbc3327f78b200518623282bd75b617d72b07bc8612');
  //   setCarLogs(contract.test(wallet,'get_cars', BigInt(0)).logs);
  // }, []);
  const [contract] = useContract(client, '2a2a720997b8451b590668f0f76ff38a45d6cf77a605c61e7815fe521f391530');
  const logCar = (car) => {
      console.log('test');
      const wallet = Wavelet.loadWalletFromPrivateKey('315f62c8f44fb6bf8351c9051b466ea93bf204706cc76a3878196caf253205f2d2b782d908775508aa65ecbc3327f78b200518623282bd75b617d72b07bc8612');
      contract && contract.call(wallet, 'log_car', BigInt(0), BigInt(25000), BigInt(0), {
        type: 'String',
        value: car
      }
      // }, {
      //   type: 'string',
      //   value: values.vin
      // }, {
      //   type: 'string',
      //   value: values.description
      // }, {
      //   type: 'u32',
      //   value: values.odometer
      // }, {
      //   type: 'u32',
      //   value: values.id
      // });
      );
    };
  



  const [values, setValues] = React.useState({
    description: '',
    vin: '',
    owner: '',
    odometer: '',
    id: '',
  });
  const manValid = false;
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
    // if (values.name.length === 1) {
    //     // console.log(values.name);
    //     console.log('wrong');
    //     values.name=""
    // }

    console.log(values.description);
        
    
  };

  return (
      <>
      <AccountTopBar/>
      <Grid 
        container 
        spacing={4} 
        justify='center' 
        className={classes.itemGrid}
    >
        <Grid item>
        <Typography variant="h4" gutterBottom>
            Car Log Form
        </Typography>
      </Grid>
      <Grid item>
    <form className={classes.container} noValidate autoComplete="off">
    <TextField
        id="outlined-error"
        label="Car Name"
        className={classes.textField}
        onChange={handleChange('description')}
        value={values.description}
        
        margin="normal"
        variant="outlined"
      />
      <TextField
        id="outlined-error"
        label="VIN"
        className={classes.textField}
        onChange={handleChange('vin')}
        value={values.vin}
        margin="normal"
        variant="outlined"
      />
      <TextField
        id="outlined-error"
        label="Owner"
        className={classes.textField}
        onChange={handleChange('owner')}
        value={values.owner}
        margin="normal"
        variant="outlined"
      />
      <TextField
        id="outlined-error"
        label="Odometer"
        className={classes.textField}
        onChange={handleChange('odometer')}
        value={values.odometer}
        
        margin="normal"
        variant="outlined"
      />
      <TextField
        id="outlined-error"
        label="ID"
        className={classes.textField}
        onChange={handleChange('id')}
        value={values.id}
        margin="normal"
        variant="outlined"
      />



    </form>
    </Grid>
    <Grid item>
    <Button 
          size="small" 
          color="primary"
          // component={Link}
          // to="/"
          onClick={() => logCar('yo')}
          >
          Save Car
        </Button>
    </Grid>
    </Grid>
    </>
  );
}

export default LogContainer;