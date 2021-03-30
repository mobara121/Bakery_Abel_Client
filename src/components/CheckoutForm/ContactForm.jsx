import React, {useState} from 'react';
// import ConfirmForm from './ConfirmForm';
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

    const contactValidation=(firstname, lastname, mobile, email)=>{
        if(firstname>0 && lastname>0 && mobile>8 && email>0 ){
            <Button component={Link} to="/confirm">
            </Button>
            console.log('OK')
        }
        else{
            <Button component={Link} to="/checkout">
            </Button>
            console.log('No')
        }
    }

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
                        <Input required value={lastname} onChange={e=>setLastname(e.target.value)} name='lastname'/>
                    </FormGroup>
                    <br />
                    <FormGroup>
                        <label htmlFor="First Name">Mobile number</label>
                        <Input required  placeholder="XXX-XXX-XXXX" value={mobile} onChange={e=>setMobile(e.target.value)} name='mobile'/>
                    </FormGroup>
                    <br />
                    <FormGroup>
                        <label htmlFor="Email">Email</label>
                        <Input required placeholder="aaa@aaa.com" value={email} onChange={e=>setEmail(e.target.value)} name='email'/>
                    </FormGroup>                   
                    <br />                    
                    <br/>
                    <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                        <Button component={Link} to="/order" variant="outlined">Back to Cart</Button>
                        
                        {/* <Button onClick={() => handleSubmitUser(firstname, lastname, mobile, email)} type="submit" variant="contained" color="primary" ><div >Confirm Order</div></Button> */}
                        {/* <Button type="submit" variant="contained" color="primary" >Confirm Order</Button> */}{contactValidation}
                        <Button onClick={() => handleSubmitUser(firstname, lastname, mobile, email)} component={Link} to="/confirm"                         
                        type="submit" variant="contained" color="primary" >
                        Confirm Order</Button>
                    </div>                
                </form>
            </div>          
        </>
    )
}
//    
export default ContactForm
