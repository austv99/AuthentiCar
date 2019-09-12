import React from 'react';
// import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
// import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(11),
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

const ManufacturerFieldComponent = props =>  {
  const classes = useStyles();
  if (props.manValid) {
      return (
        <TextField 
        id="outlined-error"
        label="Manufacturer"
        className={classes.textField}
        onChange={props.handleChange('name')}
        value={props.values.name}
        
        margin="normal"
        variant="outlined"
      />
      );

  } else {
    return (
        <>
        <TextField error
            id="outlined-error"
            label="Manufacturer"
            className={classes.textField}
            onChange={props.handleChange('name')}
            value={props.values.name}
            
            margin="normal"
            variant="outlined"
        />
        </>
    );
  }
}

export default ManufacturerFieldComponent;