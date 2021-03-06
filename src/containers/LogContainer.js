



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
import MenuItem from '@material-ui/core/MenuItem';
// import { descriptions } from 'jest-config';
const BigInt = JSBI.BigInt;

const gearbox = [
  {
    value: 'automatic',
    label: 'Automatic',
  },
  {
    value: 'manual',
    label: 'Manual',
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
  // let id = 0;
  const [client, node, clientErr] = useWavelet('https://testnet.perlin.net');
  const [carLogs, setCarLogs] = useState([]);
  const onUpdate = useCallback((contract) => {
    const wallet = Wavelet.loadWalletFromPrivateKey('315f62c8f44fb6bf8351c9051b466ea93bf204706cc76a3878196caf253205f2d2b782d908775508aa65ecbc3327f78b200518623282bd75b617d72b07bc8612');
    setCarLogs(contract.test(wallet, 'get_cars', BigInt(0)).logs);
  }, []);


  const onLoad = useCallback((contract) => {
    const wallet = Wavelet.loadWalletFromPrivateKey('315f62c8f44fb6bf8351c9051b466ea93bf204706cc76a3878196caf253205f2d2b782d908775508aa65ecbc3327f78b200518623282bd75b617d72b07bc8612');
    setCarLogs(contract.test(wallet,'get_cars', BigInt(0)).logs);
  }, []);
  const [contract] = useContract(client, '28e0ea3defced9bac9d3dcc60d2d58d57bf3cb4d874b89e5ea2943e47bead49f', onUpdate, onLoad);
  // console.log(carLogs);
  const logCar = (name, vin, owner, odometer, year, type, gearbox, accidents, maintenance ) => {
    // const car = name + '|' + vin + '|' + owner + '|' + odometer;
    let car = {
      carName: name,
      carVin: vin,
      carOwner: owner,
      carOdometer: odometer,
      carYear: year,
      carType: type,
      carGearbox: gearbox,
      carAccidents: accidents,
      carMaintenance: maintenance,
    }
    // var carLogsLength = carLogs.length;
    // const carArray = car.split('|');
    var valid = true;

    let res = [];
    let empty = false;
      for (var i = 0; i <  carLogs.length; i++) {
        if (carLogs[i] === "") {
          empty = true;
        }
        res = carLogs[i].split('\n');
      }
    if (!empty) {
      for (var i = 0; i < res.length; i++) {
        let stringRes = JSON.parse(res[i]);
        if (stringRes.vin === vin) {
          valid = false;
        }
      }
    }
    car = JSON.stringify(car);
      
    
    
    // for (var i = 0; i < carLogsLength; i++) {
      
    //   let res = carLogs[i].split('\n');
    //   console.log(res);
    //   JSON.parse(carLogs[i])
    //   if (res[1] === carArray[1]) {
    //     console.log('passed here');
    //     valid = false;
    //   }
    // }
    console.log(typeof contract);
    if (valid) {
      console.log('test');
      JSON.stringify(car);
      const wallet = Wavelet.loadWalletFromPrivateKey('315f62c8f44fb6bf8351c9051b466ea93bf204706cc76a3878196caf253205f2d2b782d908775508aa65ecbc3327f78b200518623282bd75b617d72b07bc8612');
      contract && contract.call(wallet, 'log_car', BigInt(0), BigInt(25000), BigInt(0), {
        type: 'string',
        value: car
      }
      );
    }
      
  };
    


  const [values, setValues] = React.useState({
    name: '',
    vin: '',
    owner: '',
    odometer: '',
    year: '',
    type: '',
    gearbox: '',
    accidents: '',
    maintenance: '',
  });
  const manValid = false;
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
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
        onChange={handleChange('name')}
        value={values.name}
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
        label="Year"
        className={classes.textField}
        onChange={handleChange('year')}
        value={values.year}
        margin="normal"
        variant="outlined"
      />
      <TextField
        id="outlined-error"
        label="Type"
        className={classes.textField}
        onChange={handleChange('type')}
        value={values.type}
        margin="normal"
        variant="outlined"
      />
      <TextField
        id="outlined-select-currency"
        select
        label="Transmission"
        className={classes.textField}
        value={values.gearbox}
        onChange={handleChange('gearbox')}
        SelectProps={{
          MenuProps: {
            className: classes.menu,
          },
        }}
        helperText="Please select type"
        margin="normal"
        variant="outlined"
      >
        {gearbox.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}

      </TextField>
      <TextField
        id="outlined-multiline-flexible"
        label="Accidents"
        multiline
        rowsMax="4"
        value={values.accidents}
        onChange={handleChange('accidents')}
        className={classes.textField}
        margin="normal"
        helperText="Please describe in detail"
        variant="outlined"
      />
      <TextField
        id="outlined-multiline-flexible"
        label="Maintenance Report"
        multiline
        rowsMax="4"
        value={values.maintenance}
        onChange={handleChange('maintenance')}
        className={classes.textField}
        margin="normal"
        helperText="Please describe in detail"
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
          onClick={() => 
            // result=carLogs[0].split("|")
            // values.id=result[4]

            logCar(values.name, values.vin, values.owner, values.odometer, values.year, values.type, values.gearbox, values.accidents, values.maintenance)
          }
          >
          Save Car
        </Button>
    </Grid>
    </Grid>
    </>
  );
}

export default LogContainer;