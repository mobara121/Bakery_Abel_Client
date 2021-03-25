import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, List } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'; 
import useStyles from './styles';


const Cart = ({ cart, orders, filterdOrders, subtotal, tax, total, handleUpdateOrder, handleDeleteOrder, handleDeleteAllOrder, orderconfirmed }) => {
    // debugger;
    const classes = useStyles();
    // console.log(cart)
    // console.log(cart.cart.id)

    if(!cart && cart){
    console.log(cart.cart.id)
    var cartId = cart.cart.id
    console.log(cartId)
    return cartId
    }

    const EmptyCart = () => (
        <Typography style={{display: 'flex', flexDirection: 'column'}}>You have no item in your shopping cart.
            <Link to="/" className={classes.link}>Restart order.</Link>
        </Typography>
    );
// debugger;
    const FilledCart = () => (
        <>
            <List className={classes.list}>                
                {filterdOrders && filterdOrders.sort(({productId: previousID}, {productId: currentID}) => previousID - currentID ).map((order, id) => (
                    
                    <div key={id} className={classes.item}>
                        <div>{order.orderId}</div>
                        <div>
                            <img  className={classes.image} src={order.product.image} alt="/"></img>
                        </div>
                        <div className={classes.detail}>
                            <div className={classes.name_qty}>                        
                                <div>{order.product.name}</div>
                                <div>${order.product.unit_price} /ea.</div>
                                <div style={{display:'flex', justifyContent:'space-between', margin: '10px 0 0 0'}}>
                                    <Button type="button" size="small" onClick={()=> handleUpdateOrder(order.orderId, order.product.id, order.qty - 1, order.product.unit_price*(order.qty -1))}><span style={{position: 'relative', backgroundColor:'pink', padding: '0 4px', borderRadius: '50%'}}><ExpandMoreIcon style={{margin: '2px', paddingTop: '3px'}}/></span></Button>                                   
                                    <Typography>{order.qty}</Typography>
                                    <Button type="button" size="small" onClick={()=> handleUpdateOrder(order.orderId, order.product.id, (order.qty + 1), order.product.unit_price*(order.qty +1))}><span style={{position: 'relative', backgroundColor:'pink', padding: '0 4px', borderRadius: '50%'}}><ExpandLessIcon style={{margin: '2px', paddingTop: '3px'}}/></span></Button>
                                </div>
                            </div>
                            <div className={classes.subtotal}>subtotal price: ${order.subtotal_price}</div>
                        </div>
                        <div className={classes.itemIcons}>

                            {/* <div>
                                <Button style={{minWidth:'10%', margin: '2px 5px', padding: '1px 10px', backgroundColor: 'pink'}} type="button" variant="contained"><CheckIcon onClick={()=>orderconfirmed(order.orderId, true)}/></Button>
                            </div> */}
                            

                            <div className={classes.icons}>
                                <Button style={{minWidth:'10%', margin: '2px 5px', padding: '1px 10px', backgroundColor: 'pink'}} type="button" variant="contained"><DeleteForeverIcon onClick={() => handleDeleteOrder(order.orderId)}/></Button>
                            </div>
                        </div>                        
                    </div>                       
                ))}
                
            </List>
            <div className={classes.cardDetails}>
                <form>
                <Typography htmlFor="subtotal" style={{textAlign:'right', margin: '0 3vw'}} variant="h6">
                    Subtotal: $ {subtotal}
                </Typography>
                <Typography htmlFor="tax" style={{textAlign:'right', margin: '0 3vw'}} variant="h6">
                    Tax: $ {tax}
                </Typography>
                <Typography style={{textAlign:'right', margin: '0 3vw 6vh 0'}} variant="h5">
                    Total: $ {total}
                </Typography>
             </form>   
            </div>

            <div style={{textAlign: 'center'}}>
                <Button component={Link} to="/"  className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={()=>handleDeleteAllOrder()}>Empty Cart</Button>
                <Button component={Link} to="/checkout" className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary" >Checkout</Button>
            </div>
        </>
    );

//  if(!orders.length) return 'Loading...';
if(!cart) return 'Loading...';

    return (
        <Container>
            <div className={classes.toolbar}/>
            <Typography className={classes.title} variant="h4">Your Shopping Cart</Typography>
            <div className={classes.toolbar}/>
            { !orders.length ? <div>{EmptyCart()}</div> : <div>{FilledCart()}</div>}
            {/* <div className={classes.toolbar}/> */}           


        </Container>
    )
}
// onClick={()=>addToCart(subtotal, tax, total)}
export default Cart
