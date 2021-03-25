import React, {useState} from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton} from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { AddShoppingCart } from '@material-ui/icons';

import useStyles from './style';

const Product = ({product, cart, onAddToCart}) => {
    const classes = useStyles();

    const [quantity, setQuantity] = useState('');

    var subtotal_price = quantity * product.unit_price

    return (
        <div>
            <Card className={classes.root}>
                <CardMedia className={classes.media} image={product.image} title={product.name}/>
                <CardContent>
                    <div className={classes.cardContent}>
                        <Typography variant="h5" gutterBottom>
                            {product.name}
                        </Typography>
                        <Typography variant="h5">
                            ${product.unit_price}/ea.
                        </Typography>
                    </div>
                    
                </CardContent> 
                <CardActions disableSpacing className={classes.cardActions}>
                    <FormControl className={classes.formControl}>
                        <label style={{marginTop:'5px', fontSize:'15px'}}>Quantity</label>
                        <Select style={{margin: '0 10px', width: '60px', textAlign: 'center'}}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={quantity}
                        onChange={(e)=>setQuantity(e.target.value)}
                        >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={6}>6</MenuItem>
                        </Select>
                    </FormControl>
                    <IconButton aria-label="Add to Cart" onClick={() => onAddToCart(product.id, quantity, subtotal_price, cart.cart.id)}>
                        <AddShoppingCart />
                    </IconButton>

                </CardActions>

            </Card>
        </div>
    )
}
// , cart.cart.id
export default Product
