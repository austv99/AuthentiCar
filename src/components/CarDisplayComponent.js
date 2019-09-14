import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// import hondaNsx from '../assets/honda.jpg'
// import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 300,
    // padding: theme.spacing(2)
  },
  media: {
    height: 100,
  },
}));

function CarDisplayComponent(props) {
  const classes = useStyles();


//   if (title === 'Honda NSX') {
//     pic = hondaNsx;
//   }
  return (
    <>
    <Grid container spacing={2} justify='center' className={classes.itemGrid}>
        <Grid item>
        <Typography gutterBottom variant="h5" component="h2">
            {props.carName}
          </Typography>
        </Grid>
        <Grid item>
            <img src={`assets/${props.carImage}`} className={classes.media}/>
        </Grid>

        <Grid item>
        <Typography gutterBottom variant="h5" component="h2">
            {props.carVin}
          </Typography>
        </Grid>
        <Grid item>
        <Typography gutterBottom variant="h5" component="h2">
            {props.carOwner}
          </Typography>
        </Grid>
        <Grid item>
        <Typography gutterBottom variant="h5" component="h2">
            {props.carOdometer}
          </Typography>
        </Grid>
        
     </Grid>
     </>
    
  );
}
export default CarDisplayComponent;