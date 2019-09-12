import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';




const SavedNoItems = (props) => {
    return (
    <>
        <Grid 
            container 
            spacing={2} 
            justify='center' 
        >
            <Grid item>
            {/* <Typography gutterBottom variant="h5" component="h2">
            No saved cars!
          </Typography> */}
          <Button 
                color="inherit"
                component={Link}
                to="/"
              >
                No Saved Cars!  
                Click me to go back
              </Button>
            </Grid>
            
         </Grid>
    </>

    )
}

export default SavedNoItems;