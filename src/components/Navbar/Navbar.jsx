import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography} from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import logo from '../../asset/—Pngtree—dim sum cake bakery billboard_5320634.png';
import useStyles from './styles';

const Navbar = ({totalOrders}) => {
    // debugger;
    const classes = useStyles();
    const location = useLocation();
    
    return (
        <>
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit">
                        <img src={logo} alt="Bakery Abel" height="25px" className={classes.image}/>
                        Bakery Abel
                    </Typography>
                    <div className={classes.grow} />
                    {location.pathname === '/product' && (
                    <div className={classes.button}>
                        <IconButton component={Link} to="/order" aria-label="Show cart items" color="inherit">
                            <Badge badgeContent={totalOrders} color="secondary">
                                <ShoppingCartIcon/>
                            </Badge>
                        </IconButton>
                    </div>)}
                </Toolbar>
            </AppBar>
            
        </>
    )
}

export default Navbar
