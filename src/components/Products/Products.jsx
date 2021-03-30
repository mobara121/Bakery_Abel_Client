import React from 'react';
import {Grid} from '@material-ui/core';

import Product from './Product/Product';
import useStyles from './styles';


const Products = ({products, cart, onAddToCart}) => {
    // debugger;
    const classes = useStyles();
    // console.log(cart)
    // console.log(cart.cart.id)
    // if(cart){
    // var cartId = JSON.parse(JSON.stringify(cart.cart.id))
    // console.log(cartId)
    // return cartId
    // }
    
    return(
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Grid container justify="center" spacing={4}>
                {products && products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <Product product={product}  cart={cart}   onAddToCart={onAddToCart}/>
                    </Grid>
                ))}
            </Grid>
        </main>
    );
    
}
//
export default Products;