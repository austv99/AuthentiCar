import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// import hondaNsx from '../assets/honda.jpg'
import SavedContext from '../contexts/SavedContext';
import { Link } from 'react-router-dom';
import PropsContext from '../contexts/PropsContext';
// import SnackBarComponent from '../components/SnackBarComponent'

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 300,
    // padding: theme.spacing(2)
  },
  media: {
    height: 100,
  },
}));

function CarComponent(props) {
  const classes = useStyles();
  const savedContext = useContext(SavedContext);

  const savedPropsContext = useContext(PropsContext);

  function handleClick() {
    
  }
  return (
    <Card className={classes.card}>
      
        <CardMedia
          className={classes.media}
          image={`assets/${props.carImage}`}
          title=""
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.carName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            VIN: {props.carVin}
          </Typography>
        </CardContent>
      
      <CardActions>
        <Button 
          size="small" 
          color="primary"
          onClick={() => {
            savedContext.addToSaved(props.carVin);
          }}
        >
          Save
        </Button>
        <Button 
          size="small" 
          color="primary"
          component={Link}
          to="/car"
          onClick={() => {
            savedPropsContext.addToSavedProps(props.carVin);
          }}
          >
          Learn More
        </Button>




      </CardActions>
    </Card>
  );
}
export default CarComponent;