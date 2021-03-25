import React, {useState} from 'react';
import useStyles from './styles'
import {FormGroup, Button, Typography, Input} from '@material-ui/core';
import {Link} from 'react-router-dom';

const ContactForm = ({handleSubmitUser}) => {
    // debugger;
    const classes = useStyles();
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [mobile, setMobile] = useState('')
    const [email, setEmail] = useState('')

    return (
        <>
          <div className={classes.toolbar}/>            
                <div>
                <Typography variant="h6" gutterBottom>Contact information</Typography>
                <br/>
                <form>
                    <FormGroup>
                        <label htmlFor="First Name">First Name</label>
                        <Input required type="input" value={firstname} onChange={(e)=>setFirstname(e.target.value)} name='firstname'/>
                    </FormGroup>
                    <p>{alert}</p>
                    <br />
                    <FormGroup>
                    <label htmlFor="First Name">Last name</label>
                        <Input value={lastname} onChange={e=>setLastname(e.target.value)} name='lastname'/>
                    </FormGroup>
                    <br />
                    <FormGroup>
                        <label htmlFor="First Name">Mobile number</label>
                        <Input value={mobile} onChange={e=>setMobile(e.target.value)} name='mobile'/>
                    </FormGroup>
                    <br />
                    <FormGroup>
                        <label htmlFor="Email">Email</label>
                        <Input value={email} onChange={e=>setEmail(e.target.value)} name='email'/>
                    </FormGroup>                   
                    <br />                    
                    <br/>
                    <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                        <Button component={Link} to="/order" variant="outlined">Back to Cart</Button>
                        <Button onClick={() => handleSubmitUser(firstname, lastname, mobile, email)} component={Link} to="/confirm" type="submit" variant="contained" color="primary" >Confirm Order</Button>
                    </div>                
                </form>
            </div>          
        </>
    )
}
//   onClick={() => handleSubmitUser(firstname, lastname, mobile, email)} 
export default ContactForm
