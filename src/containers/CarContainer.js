import React, {useContext} from 'react';
import TopBar from '../components/TopBar';
// import CarComponent from '../components/CarComponent';
import Grid from '@material-ui/core/Grid';
// import hondaNsx from '../assets/honda.jpg';
import { makeStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
import data from '../constants/car-items.json'
import PropsContext from '../contexts/PropsContext';
import CarDisplayComponent from '../components/CarDisplayComponent';
import SavedNoItems from '../components/SavedNoItems';



const useStyles = makeStyles(theme => ({
    itemGrid: {
        marginTop: 64,
    },
    media: {
        height: 245,
    }

}))

const getItemFromId = id => data.items.filter(x => x.id === id)[0];


const CarContainer = props => {
    
    const classes = useStyles();
    const propsContext = useContext(PropsContext);
    // useEffect(() => {
    //     console.log("here");
    //     {Object.keys(propsContext.savedProps).map(x => (
    //         propsContext.removeFromSavedProps(x)
    //     ))}
    // })
    return (
    <>
    <TopBar />
    <Grid 
            container 
            spacing={2} 
            justify='center' 
            className={classes.itemGrid}
        >
            {propsContext.countProps > 0 ? (
            Object.keys(propsContext.savedProps).map(id => (
                <Grid item>
                    <CarDisplayComponent
                        key = {id}
                        id = {id}
                        title={getItemFromId(id).title}
                        image={getItemFromId(id).image}
                        description={getItemFromId(id).description}

                    />
                </Grid>
            )))
             : (
                <SavedNoItems />
            )
            }
            
            
            


            
         </Grid>
     </>
    )
};

export default CarContainer; 