import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import hondaNsx from '../assets/honda.jpg'
import SavedContext from '../contexts/SavedContext';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 300,
    // padding: theme.spacing(2)
  },
  media: {
    height: 100,
  },
}));

function SavedCarComponent(props) {
  const classes = useStyles();
  const title = props.title;
  let pic = "";
  const savedContext = useContext(SavedContext);

  if (title === 'Honda NSX') {
    pic = hondaNsx;
  }
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={pic}
          title=""
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button 
          size="small" 
          color="primary"
        >
          Learn More
        </Button>
        <Button 
            size="small" 
            color="primary"
            onClick={() => {
                savedContext.removeFromSaved(props.id);
            }}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
export default SavedCarComponent;