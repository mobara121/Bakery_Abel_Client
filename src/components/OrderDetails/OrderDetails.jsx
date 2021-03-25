import React from 'react';
import useStyles from './styles';
import {Paper, Typography, Input} from '@material-ui/core';

const OrderDetails = ({cart, orders }) => {
// debugger;
  console.log(cart)
  console.log(cart.cartId)
  console.log(orders)
  const classes = useStyles();

  // var cartid = JSON.stringify(cart.cart.id)

  // if(!cart.cartId && cart.cartId){
  //   var cartid = JSON.stringify(cart.cartId)
  //   console.log(cartid)
  //   return cartid
  // };
  // var pickup_date = JSON.parse(JSON.stringify(cart.pickup_date))
  // console.log(pickup_date)
  // var totalprice = JSON.parse(JSON.stringify(cart.total_price))
  // console.log(totalprice)
  // var cart_total_price = JSON.parse(JSON.stringify(cart.cart.total_price))
  // console.log(cart_total_price)

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
