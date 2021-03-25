import React, {useState} from 'react';
import ContactForm from './ContactForm';
import {Paper, Typography} from '@material-ui/core';
import useStyles from './styles'
import 'react-calendar/dist/Calendar.css';


const Checkout = ({handleSubmitUser}) => {
    // debugger;
    const classes = useStyles();

    return (
        <>
          <div className={classes.toolbar}/> 
          <main className={classes.layout}>
            <Paper className={classes.paper}>                
                <Typography variant="h4" align="center">Checkout</Typography>
                <div>
                <ContactForm handleSubmitUser={handleSubmitUser} />
                </div>
            </Paper>
          </main> 
        </>
    )
}

export default Checkout;
