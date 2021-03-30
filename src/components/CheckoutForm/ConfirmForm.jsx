import React, {useState} from 'react';
import {Paper, Button, Typography, Input, FormControl, Select, MenuItem, Grid} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CheckIcon from '@material-ui/icons/Check';
import useStyles from './styles'
import {Link} from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'

const ConfirmForm = ({cart, user, orders, addToCart, orderconfirmed}) => {
    // debugger;
    console.log(cart)
    console.log(user)

    const classes = useStyles();
    const [calDate, setCalDate] = useState(new Date())
    const [time, setTime] = useState('');

    function onChange(calDate){
        setCalDate(calDate)
    };
    // debugger;
    var FilteredOrders = orders.filter((order, id)=> order.cartId === cart.cart.id) 
    console.log(FilteredOrders)
    const subtotalcal =() =>(FilteredOrders.length>0 && FilteredOrders.reduce((a,v)=>a = a + (v.subtotal_price*1), 0));
    const taxcal =()=>(Math.round((((FilteredOrders.length>0 && FilteredOrders.reduce((a,v)=>a = a + (v.subtotal_price*1), 0)) * 0.07) + Number.EPSILON)*100)/100);
    const totalcal = subtotalcal()+taxcal();

    return (
        <>
        <div className={classes.toolbar}/> 
          <main className={classes.layout}>
            <Paper className={classes.paper}>                
                <Typography variant="h4" align="center">Checkout</Typography>
                <div className={classes.toolbar}/> 
                <Typography variant="h6" gutterBottom>Please confirm order details.</Typography>
                <div style={{display: 'flex', flexDirection: 'column', textAlign: 'center', margin: '0 2vw'}}>
                    <div style={{displey: 'flex', flexDirection: 'column', justifyContent:'center'}}>
                        <p className={classes.detailtitle}>Contact information</p>
                        <div style={{display:'flex'}} >
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">First Name</TableCell>
                                        <TableCell align="center">Last Name</TableCell>
                                        <TableCell align="center">Mobile</TableCell>
                                        <TableCell align="center">E-mail</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableCell>{user.firstname}</TableCell>
                                    <TableCell>{user.lastname}</TableCell>
                                    <TableCell>{user.mobile}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                    <br/>
                    <div>
                        <p className={classes.detailtitle}>Order items</p>
                        <Table >
                            <TableHead>
                                <TableRow>
                                    <TableCell>Order No.</TableCell>
                                    <TableCell>Item name</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Subtotal($)</TableCell>
                            
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {FilteredOrders && FilteredOrders.sort(({orderId: previousID}, {orderId: currentID}) => previousID - currentID ).map((order, id)=>(
                            <TableRow key={id}>                          
                                <div style={{textAlign:'center', marginTop: '2vh'}}>{order.orderId}</div>
                                <TableCell align="left">{order.product.name}</TableCell>
                                <TableCell align="center">{order.qty}</TableCell>
                                <TableCell align="center">{order.subtotal_price}</TableCell>
                                <div>
                                <Button style={{minWidth:'5%', margin: '2vh 2vw', backgroundColor: 'pink'}} type="button" variant="contained"><CheckIcon onClick={()=>orderconfirmed(order.orderId, true)}/></Button>
                                </div>                           
                            </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </div>
                    <br/>
                    <div>
                        <p className={classes.detailtitle}>Payment</p>
                        <div style={{textAlign:'right'}}>
                            <p>Subtotal: ${subtotalcal()}</p><p>Tax: ${taxcal()}</p><p>Total: ${totalcal}</p>
                        </div>
                    </div>

                </div>
                <div className={classes.toolbar}/> 
                <Typography variant="h6" gutterBottom>Pick-up date & time</Typography>
                    <div style={{display:'flex', flexDirection: 'column'}}>
                        <div style={{margin: '2vh auto'}}>
                        <Calendar onChange={onChange} value={calDate} />
                        </div>
                        <br/>
                        <div style={{display: 'flex', justifyContent:'space-around'}}>
                            <FormControl>
                                <label style={{marginTop:'5px', fontSize:'15px'}}>Pick-up date</label>
                                <Input style={{margin: '0 10px', width: '200px', textAlign: 'center'}} required value={moment(calDate).format("MMM Do YY")} onChange={e=>setCalDate(e.target.value)} name='Date'/>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <label style={{marginTop:'5px', fontSize:'15px'}}>Estimated Time</label>
                                <Select style={{margin: '0 10px', width: '200px', textAlign: 'center'}}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={time}
                                onChange={(e)=>setTime(e.target.value)}
                                >
                                    <MenuItem value={1}>1: 10:00AM-12:00PM</MenuItem>
                                    <MenuItem value={2}>2: 12:00PM-2:00PM</MenuItem>
                                    <MenuItem value={3}>3: 2:00PM-4:00PM</MenuItem>
                                    <MenuItem value={4}>4: 4:00PM-6:00PM</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <br/>
                    <br/>
                    <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                        <Button component={Link} to="/order" variant="outlined">Back to Cart</Button>
                        <Button component={Link} to="/checkout" variant="outlined">BACK TO CONTACT FORM</Button>
                        
                        <Button component={Link} to="/orderdetails" type="submit" variant="contained" color="primary" onClick={()=>addToCart(cart.cart.id, subtotalcal(), taxcal(), totalcal, calDate, time, user.id )}>Checkout</Button>
                    </div>
            </Paper>
         </main>
        </>
    )
}
// orderId, (Math.random()) onSubmit={()=>fetchOrderbyCartId(cartId)}
export default ConfirmForm
