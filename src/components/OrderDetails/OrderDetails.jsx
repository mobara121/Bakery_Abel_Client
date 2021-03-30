import React from 'react';
import useStyles from './styles';
import {Paper, Typography} from '@material-ui/core';

const OrderDetails = ({cart, orders}) => {
// debugger;
  console.log(cart)
  console.log(cart.cartId)
  console.log(orders)
  const classes = useStyles();

    var date = cart.pickup_date
    var newDate = new Date(date);
    var fd = newDate.toDateString();

    return (
        <>
          <div className={classes.toolbar}/> 
          <main className={classes.layout}>
            <Paper className={classes.paper}>                
                <Typography variant="h4" align="center">Thank you for shopping!</Typography>
                <div>
                  <p>Your confirmation number is <span className={classes.confirmedInfo}>{cart.cartId}</span>.</p>
                  <p>Your total payment is <span className={classes.confirmedInfo}>${cart.total_price}</span>.</p>
                  <p>We are looking forward to seeing you on <span className={classes.confirmedInfo}>{fd}</span>.</p>
                </div>
            </Paper>
          </main> 
        </>
    )
}

export default OrderDetails
