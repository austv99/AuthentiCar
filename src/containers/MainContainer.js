import React from 'react';
import TopBar from '../components/TopBar';
import CarComponent from '../components/CarComponent';
import Grid from '@material-ui/core/Grid';
import hondaNsx from '../assets/honda.jpg';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(them => ({
    itemGrid: {
        marginTop: 64,
    }

}))

const MainContainer = props => {
    const classes = useStyles();
    return (
    <>
    <TopBar />
    <Grid container spacing={2} justify='center' className={classes.itemGrid}>
        <Grid item>
            <CarComponent
                title="Honda NSX"
                description="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                across all continents except Antarctica"
                image={hondaNsx}
            />
        </Grid>
        <Grid item>
            <CarComponent
                title="Honda NSX"
                description="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                across all continents except Antarctica"
                image={hondaNsx}
            />
        </Grid>
        <Grid item>
            <CarComponent
                title="Honda NSX"
                description="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                across all continents except Antarctica"
                image={hondaNsx}
            />
        </Grid>
        <Grid item>
            <CarComponent
                title="Honda NSX"
                description="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                across all continents except Antarctica"
                image={hondaNsx}
            />
        </Grid>
        <Grid item>
            <CarComponent
                title="Honda NSX"
                description="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                across all continents except Antarctica"
                image={hondaNsx}
            />
        </Grid>
        <Grid item>
            <CarComponent
                title="Honda NSX"
                description="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                across all continents except Antarctica"
                image={hondaNsx}
            />
        </Grid>
        
     </Grid>
     </>
    )
};

export default MainContainer; 