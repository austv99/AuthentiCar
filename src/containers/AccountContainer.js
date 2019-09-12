import React, {useContext} from 'react';
import SavedContext from '../contexts/SavedContext';
import SavedCarComponent from '../components/SavedCarComponent';
import data from '../constants/car-items.json'
import Grid from '@material-ui/core/Grid';
// import hondaNsx from '../assets/honda.jpg';
import { makeStyles } from '@material-ui/core/styles';
import AccountTopBar from '../components/AccountTopBar';
import SavedNoItems from '../components/SavedNoItems';


const useStyles = makeStyles(theme => ({
    itemGrid: {
        marginTop: 64,
    }

}))

const getItemFromId = id => data.items.filter(x => x.id === id)[0];

const AccountContainer = (props) => {
    const classes = useStyles();
    const savedContext = useContext(SavedContext);
    const savedFrom = savedContext.saved;
    return (
    <>
        <AccountTopBar />
        <Grid 
            container 
            spacing={2} 
            justify='center' 
            className={classes.itemGrid}
        >
            {savedContext.count > 0 ? (
            Object.keys(savedFrom).map(id => (
                <Grid item>
                    <SavedCarComponent 
                        key = {id}
                        id = {id}
                        title={getItemFromId(id).title}
                        image={getItemFromId(id).image}
                        description={getItemFromId(id).description}

                    />
                </Grid>
            ))
            ) : (
                <SavedNoItems />
            )}
            
         </Grid>
    </>

    )
}

export default AccountContainer;