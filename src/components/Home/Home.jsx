import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Container, Typography, Button, List } from '@material-ui/core';
import useStyles from './styles';

const Home = ({createCart}) => {
    const classes = useStyles();
    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Container className={classes.container}>
                <div className={classes.content}>
                    <div className={classes.titleContainer}>
                        <span className={classes.title}>Bakery Abel</span>
                    </div>
                    <div className={classes.btnContainer}>
                        <Button component={Link} to="/product" size="large" type="button" variant="contained" color="secondary" onClick={()=>createCart()}>Order</Button>
                    </div>
                </div>
            </Container>
        </main>
    )
}

export default Home
