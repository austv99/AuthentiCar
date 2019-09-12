import React, {useState} from 'react';
import LoginTopbar from '../components/LoginTopBar'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
//import { Button } from '@material-ui/core';
//import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
// import Logo from '../assets/69746894_1826895420789016_7438798866075353088_n.png';
import ErrorWithStack from 'jest-util/build/ErrorWithStack';
import { ERROR } from 'jest-validate/build/utils';


// const ranges = [
//   {
//     value: '0-20',
//     label: '0 to 20',
//   },
//   {
//     value: '21-50',
//     label: '21 to 50',
//   },
//   {
//     value: '51-100',
//     label: '51 to 100',
//   },
// ];

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(2),
  },
  textField: {
    flexBasis: 200,
  },
  itemGrid: {
      marginTop: 150,
  },
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));


export default function OutlinedInputAdornments() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    //amount: '',
    nameError: null,
    passwordError: null,
    password: '',
    //weight: '',
    //weightRange: '',
    showPassword: false,
  });

//   const [name, setName] = useState("");
    
//   const handleSubmit = (evt) => {
//     evt.preventDefault();
//     alert(`Submitting Name ${name}`);
    
//   }

  const handleSubmit = () => {
    let nameError = null;
    let passwordError = null;
    let password = values.password
    let name = values.name;
    let valid = true;
    if (name == null || name.trim() === '') {
      nameError = 'name cannot be empty';
      valid = false;
    } else if (name.length > 32) {
      nameError = 'name cannot be longer than 32 chars';
      valid = false;
    } else if (name.length < 6) {
      nameError = 'name cannot be shorter than 6 chars';
      valid = false;
    }

    if (password == null || password.trim() === '') {
        passwordError = 'password cannot be empty'
        valid = false;
    }

   
    
    setValues({ ...values, nameError, passwordError });
    return valid;
  }

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
    console.log(values.prop)
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };


  
//   onSubmit = () => {
//       const errors 
//   }

  return (

    <div className={classes.root}>
    <LoginTopbar />
    <Grid 
        container
        spacing={2}
        justify='center'
        className={classes.itemGrid}
    > 
    <img src={`assets/69746894_1826895420789016_7438798866075353088_n.png`}></img>
      <form> 
      
          
          
      <Grid item>

          
      <TextField
        id="outlined-simple-start-adornment"
        className={clsx(classes.margin, classes.textField)}
        variant="outlined"
        label="Username"
        error={values.nameError}
        helperText={values.nameError}
        placeholder="make it interesting"
        onChange={handleChange('name')}
        value={values.prop}
        // value={name}
        // onChange={e => setName(e.target.value)}
        // InputProps={{
        //   startAdornment: <InputAdornment position="start">Email/Name</InputAdornment>,
        // }}
        //ref="myField"

      />
      </Grid>
      {/* <TextField
        select
        className={clsx(classes.margin, classes.textField)}
        variant="outlined"
        label="With Select"
        value={values.weightRange}
        onChange={handleChange('weightRange')}
        InputProps={{
          startAdornment: <InputAdornment position="start">Kg</InputAdornment>,
        }}
      >
        {ranges.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField> */}
      {/* <TextField
        id="outlined-adornment-amount"
        className={clsx(classes.margin, classes.textField)}
        variant="outlined"
        label="Amount"
        value={values.amount}
        onChange={handleChange('amount')}
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
      /> */}
      {/* <TextField
        id="outlined-adornment-weight"
        className={clsx(classes.margin, classes.textField)}
        variant="outlined"
        label="Weight"
        value={values.weight}
        onChange={handleChange('weight')}
        helperText="Weight"
        InputProps={{
          endAdornment: <InputAdornment position="end">Kg</InputAdornment>,
        }}
      /> */}
      <Grid item>

      
      <TextField
        id="outlined-adornment-password"
        className={clsx(classes.margin, classes.textField)}
        variant="outlined"
        type={values.showPassword ? 'text' : 'password'}
        label="Password"
        error={values.passwordError}
        helperText={values.passwordError}
        value={values.password}

        placeholder="make it secure"

        onChange={handleChange('password')}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                edge="end"
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {values.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      </Grid>
      {/* <Grid item> */}
      <Button variant="contained" color="primary"
        className={classes.button} style={{margin:15}}
        onClick={handleSubmit}
        component={Link}
        to='/'
        >
        Login
      </Button>
      {/* </Grid> */}
    </form>
    </Grid>
    </div>
  );
}


// import React, {useState} from 'react';
// import LoginTopbar from '../components/LoginTopBar'
// import clsx from 'clsx';
// import { makeStyles } from '@material-ui/core/styles';
// import IconButton from '@material-ui/core/IconButton';
// import InputAdornment from '@material-ui/core/InputAdornment';
// import TextField from '@material-ui/core/TextField';
// import MenuItem from '@material-ui/core/MenuItem';
// import Visibility from '@material-ui/icons/Visibility';
// import VisibilityOff from '@material-ui/icons/VisibilityOff';
// import Grid from '@material-ui/core/Grid';
// //import { Button } from '@material-ui/core';
// //import { makeStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
// import Logo from '../assets/69746894_1826895420789016_7438798866075353088_n.png';
// import ErrorWithStack from 'jest-util/build/ErrorWithStack';
// import { ERROR } from 'jest-validate/build/utils';


// // const ranges = [
// //   {
// //     value: '0-20',
// //     label: '0 to 20',
// //   },
// //   {
// //     value: '21-50',
// //     label: '21 to 50',
// //   },
// //   {
// //     value: '51-100',
// //     label: '51 to 100',
// //   },
// // ];

// const useStyles = makeStyles(theme => ({
//   root: {
//     display: 'flex',
//     flexWrap: 'wrap',
//   },
//   margin: {
//     margin: theme.spacing(2),
//   },
//   textField: {
//     flexBasis: 200,
//   },
//   itemGrid: {
//       marginTop: 150,
//   },
//   button: {
//     margin: theme.spacing(1),
//   },
//   input: {
//     display: 'none',
//   },
// }));


// export default function OutlinedInputAdornments() {
//   const classes = useStyles();
//   const [values, setValues] = React.useState({
//     //amount: '',
//     nameError: null,
//     password: '',
//     //weight: '',
//     //weightRange: '',
//     showPassword: false,
//   });

// //   const [name, setName] = useState("");
    
// //   const handleSubmit = (evt) => {
// //     evt.preventDefault();
// //     alert(`Submitting Name ${name}`);
    
// //   }

//   const handleSubmit = () => {
//     let nameError = null;
//     let name = values.name;
//     if (name == null || name.trim() === '') {
//       nameError = 'name cannot be empty';
//     } else if (name.length > 32) {
//       nameError = 'name cannot be longer than 32 chars';
//     } else if (name.length < 6) {
//       nameError = 'name cannot be shorter than 6 chars';
//     }
//     setValues({ ...values, nameError });
//   }

//   const handleChange = prop => event => {
//     setValues({ ...values, [prop]: event.target.value });
//     console.log(values.prop)
//   };

//   const handleClickShowPassword = () => {
//     setValues({ ...values, showPassword: !values.showPassword });
//   };

//   const handleMouseDownPassword = event => {
//     event.preventDefault();
//   };


  
// //   onSubmit = () => {
// //       const errors 
// //   }

//   return (

//     <div className={classes.root}>
//     <LoginTopbar />
//     <Grid 
//         container
//         spacing={2}
//         justify='center'
//         className={classes.itemGrid}
//     > 
//     <img src={Logo}></img>
//       <form> 
      
          
          
//       <Grid item>

          
//       <TextField
//         id="outlined-simple-start-adornment"
//         className={clsx(classes.margin, classes.textField)}
//         variant="outlined"
//         label="Username"
//         placeholder="make it interesting"
//         onChange={handleChange('name')}
//         value={values.prop}
//         // value={name}
//         // onChange={e => setName(e.target.value)}
//         // InputProps={{
//         //   startAdornment: <InputAdornment position="start">Email/Name</InputAdornment>,
//         // }}
//         //ref="myField"

//       />
//       {values.nameError ? <p>{values.nameError}</p> : ''}
//       </Grid>
//       {/* <TextField
//         select
//         className={clsx(classes.margin, classes.textField)}
//         variant="outlined"
//         label="With Select"
//         value={values.weightRange}
//         onChange={handleChange('weightRange')}
//         InputProps={{
//           startAdornment: <InputAdornment position="start">Kg</InputAdornment>,
//         }}
//       >
//         {ranges.map(option => (
//           <MenuItem key={option.value} value={option.value}>
//             {option.label}
//           </MenuItem>
//         ))}
//       </TextField> */}
//       {/* <TextField
//         id="outlined-adornment-amount"
//         className={clsx(classes.margin, classes.textField)}
//         variant="outlined"
//         label="Amount"
//         value={values.amount}
//         onChange={handleChange('amount')}
//         InputProps={{
//           startAdornment: <InputAdornment position="start">$</InputAdornment>,
//         }}
//       /> */}
//       {/* <TextField
//         id="outlined-adornment-weight"
//         className={clsx(classes.margin, classes.textField)}
//         variant="outlined"
//         label="Weight"
//         value={values.weight}
//         onChange={handleChange('weight')}
//         helperText="Weight"
//         InputProps={{
//           endAdornment: <InputAdornment position="end">Kg</InputAdornment>,
//         }}
//       /> */}
//       <Grid item>

      
//       <TextField
//         id="outlined-adornment-password"
//         className={clsx(classes.margin, classes.textField)}
//         variant="outlined"
//         type={values.showPassword ? 'text' : 'password'}
//         label="Password"
//         value={values.password}

//         placeholder="make it secure"

//         onChange={handleChange('password')}
//         InputProps={{
//           endAdornment: (
//             <InputAdornment position="end">
//               <IconButton
//                 edge="end"
//                 aria-label="toggle password visibility"
//                 onClick={handleClickShowPassword}
//                 onMouseDown={handleMouseDownPassword}
//               >
//                 {values.showPassword ? <VisibilityOff /> : <Visibility />}
//               </IconButton>
//             </InputAdornment>
//           ),
//         }}
//       />
//       </Grid>
//       {/* <Grid item> */}
//       <Button variant="contained" color="primary"
//         className={classes.button} style={{margin:15}}
//         onClick={handleSubmit}>
//         Login
//       </Button>
//       {/* </Grid> */}
//     </form>
//     </Grid>
//     </div>
//   );
// }


// // import React, {useState} from 'react';
// // import LoginTopbar from '../components/LoginTopBar'
// // import clsx from 'clsx';
// // import { makeStyles } from '@material-ui/core/styles';
// // import IconButton from '@material-ui/core/IconButton';
// // import InputAdornment from '@material-ui/core/InputAdornment';
// // import TextField from '@material-ui/core/TextField';
// // import MenuItem from '@material-ui/core/MenuItem';
// // import Visibility from '@material-ui/icons/Visibility';
// // import VisibilityOff from '@material-ui/icons/VisibilityOff';
// // import Grid from '@material-ui/core/Grid';
// // //import { Button } from '@material-ui/core';
// // //import { makeStyles } from '@material-ui/core/styles';
// // import Button from '@material-ui/core/Button';
// // import Logo from '../assets/69746894_1826895420789016_7438798866075353088_n.png';
// // import ErrorWithStack from 'jest-util/build/ErrorWithStack';
// // import { ERROR } from 'jest-validate/build/utils';


// // // const ranges = [
// // //   {
// // //     value: '0-20',
// // //     label: '0 to 20',
// // //   },
// // //   {
// // //     value: '21-50',
// // //     label: '21 to 50',
// // //   },
// // //   {
// // //     value: '51-100',
// // //     label: '51 to 100',
// // //   },
// // // ];

// // const useStyles = makeStyles(theme => ({
// //   root: {
// //     display: 'flex',
// //     flexWrap: 'wrap',
// //   },
// //   margin: {
// //     margin: theme.spacing(2),
// //   },
// //   textField: {
// //     flexBasis: 200,
// //   },
// //   itemGrid: {
// //       marginTop: 150,
// //   },
// //   button: {
// //     margin: theme.spacing(1),
// //   },
// //   input: {
// //     display: 'none',
// //   },
// // }));


// // export default function OutlinedInputAdornments() {
// //   const classes = useStyles();
// //   const [values, setValues] = React.useState({
// //     //amount: '',
// //     password: '',
// //     //weight: '',
// //     //weightRange: '',
// //     showPassword: false,
// //   });

// // //   const [name, setName] = useState("");
    
// // //   const handleSubmit = (evt) => {
// // //     evt.preventDefault();
// // //     alert(`Submitting Name ${name}`);
    
// // //   }

// //   const handleChange = prop => event => {
// //     setValues({ ...values, [prop]: event.target.value });
// //     console.log(values.prop)
// //   };

// //   const handleClickShowPassword = () => {
// //     setValues({ ...values, showPassword: !values.showPassword });
// //   };

// //   const handleMouseDownPassword = event => {
// //     event.preventDefault();
// //   };


  
// // //   onSubmit = () => {
// // //       const errors 
// // //   }

// //   return (

// //     <div className={classes.root}>
// //     <LoginTopbar />
// //     <Grid 
// //         container
// //         spacing={2}
// //         justify='center'
// //         className={classes.itemGrid}
// //     > 
// //     <img src={Logo}></img>
// //       <form> 
      
          
          
// //       <Grid item>

          
// //       <TextField
// //         id="outlined-simple-start-adornment"
// //         className={clsx(classes.margin, classes.textField)}
// //         variant="outlined"
// //         label="Username"
// //         placeholder="make it interesting"
// //         onChange={handleChange('name')}
// //         value={values.prop}
// //         // value={name}
// //         // onChange={e => setName(e.target.value)}
// //         // InputProps={{
// //         //   startAdornment: <InputAdornment position="start">Email/Name</InputAdornment>,
// //         // }}
// //         //ref="myField"

// //       />
// //       </Grid>
// //       {/* <TextField
// //         select
// //         className={clsx(classes.margin, classes.textField)}
// //         variant="outlined"
// //         label="With Select"
// //         value={values.weightRange}
// //         onChange={handleChange('weightRange')}
// //         InputProps={{
// //           startAdornment: <InputAdornment position="start">Kg</InputAdornment>,
// //         }}
// //       >
// //         {ranges.map(option => (
// //           <MenuItem key={option.value} value={option.value}>
// //             {option.label}
// //           </MenuItem>
// //         ))}
// //       </TextField> */}
// //       {/* <TextField
// //         id="outlined-adornment-amount"
// //         className={clsx(classes.margin, classes.textField)}
// //         variant="outlined"
// //         label="Amount"
// //         value={values.amount}
// //         onChange={handleChange('amount')}
// //         InputProps={{
// //           startAdornment: <InputAdornment position="start">$</InputAdornment>,
// //         }}
// //       /> */}
// //       {/* <TextField
// //         id="outlined-adornment-weight"
// //         className={clsx(classes.margin, classes.textField)}
// //         variant="outlined"
// //         label="Weight"
// //         value={values.weight}
// //         onChange={handleChange('weight')}
// //         helperText="Weight"
// //         InputProps={{
// //           endAdornment: <InputAdornment position="end">Kg</InputAdornment>,
// //         }}
// //       /> */}
// //       <Grid item>

      
// //       <TextField
// //         id="outlined-adornment-password"
// //         className={clsx(classes.margin, classes.textField)}
// //         variant="outlined"
// //         type={values.showPassword ? 'text' : 'password'}
// //         label="Password"
// //         value={values.password}

// //         placeholder="make it secure"

// //         onChange={handleChange('password')}
// //         InputProps={{
// //           endAdornment: (
// //             <InputAdornment position="end">
// //               <IconButton
// //                 edge="end"
// //                 aria-label="toggle password visibility"
// //                 onClick={handleClickShowPassword}
// //                 onMouseDown={handleMouseDownPassword}
// //               >
// //                 {values.showPassword ? <VisibilityOff /> : <Visibility />}
// //               </IconButton>
// //             </InputAdornment>
// //           ),
// //         }}
// //       />
// //       </Grid>
// //       {/* <Grid item> */}
// //       <Button variant="contained" color="primary" className={classes.button} style={{margin:15}}>
// //         Login
// //       </Button>
// //       {/* </Grid> */}
// //     </form>
// //     </Grid>
// //     </div>
// //   );
// // }