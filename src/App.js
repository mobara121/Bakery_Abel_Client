import React, { useState, useEffect } from 'react';
import { Home, Products, Navbar, Cart, Checkout, OrderDetails } from './components';
import ConfirmForm from './components/CheckoutForm/ConfirmForm.jsx';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


function App() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState([]);
  const [cart, setCart] = useState('');
  const [confirmedCart, setConfirmedCart] = useState([])

//*CART*//
  const fetchCart = ()=>{
    // debugger;
    fetch('http://localhost:3000/cart/getall', {
        method: 'GET',
        headers: new Headers({
            "Content-Type": 'application/json',
            'Authorization': 'sessionToken'
        })
    }).then((res)=>res.json())
    .then((carts)=>{
      console.log(carts)
      return setCart(carts)
    })
    .catch((error)=>{
        console.log(error)
    })
  }

//*PRODUCTS*//
  const fetchProducts = () => {
    fetch("http://localhost:3000/product/get", {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'sessionToken'
      })
    }).then((res)=> res.json())
    .catch((error) => {
      console.log(error)
    })
    .then((products) => {      
      console.log(products)
      return setProducts(products)      
    })
    .catch((error) => {
      console.log(error)
    })
  }

//*ORDER*//
  const fetchOrder = () => {
    // debugger;
    fetch("http://localhost:3000/order/getall", {
      method: 'GET',
      headers: new Headers({
        "Content-Type": 'application/json',
        'Authorization': 'sessionToken'
      })
    }).then((res)=>res.json())
    .catch((error) => {
      console.log(error)
    })
    .then((orders)=>{      
      console.log(orders)
      return setOrders(orders)

    })
    .catch((error)=> {
      console.log(error)
    })
  }

  /*Home*/
const createCart=()=> {
  // debugger;
  fetch(`http://localhost:3000/cart/create`, {
    method: 'POST',
    headers: new Headers({
      "Content-Type": 'application.json',
      'Authorization': 'sessionToken'
    })
  }).then((res)=>res.json())
  .then((cart)=>{
    // console.log(cart)
    var cartId = JSON.parse(JSON.stringify(cart.cart.id))
    console.log(cartId)
    setCart(cart)
    return cartId
  })
  .catch((error)=>{
    console.log(error)
  })
}

/*Products*/
  const handleAddToOrder = (productId, qty, subtotal_price, cartId) => {
      // debugger;
      fetch(`http://localhost:3000/order/create/${productId}/${qty}/${subtotal_price}/${cartId}`, {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': 'sessionToken'
        })
      })     
      .then((res)=> res.json())         
      .then((order) => {                
        console.log(order);
        return fetchOrder(order);        
      })
      .catch((error) => {
        console.log(error)
      })          
  }

/*Cart*/
  const handleUpdateOrder = (orderId, productId, qty, subtotal_price) => {
    // debugger;
    fetch(`http://localhost:3000/order/update/${orderId}/${productId}/${qty}/${subtotal_price}`, {
      method: 'PUT',
      body:JSON.stringify({orderId, productId, qty, subtotal_price}),
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'sessionToken'
      })
    })
    .then((res)=> res.json())         
    .then((orders) => {        
      console.log(orders);
      // setOrders(orders)
      return fetchOrder(orders);      
    })
    .catch((error) => {
      console.log(error)
    })
    // debugger;           
}

const handleDeleteOrder = (orderId) => {
  fetch(`http://localhost:3000/order/delete/${orderId}`, {
    method: 'DELETE',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'sessionToken'
    })
  })  
  .then(()=> {
    fetchOrder();
    return fetchOrder()})             
}

const handleDeleteAllOrder = () =>{
  fetch('http://localhost:3000/order/deleteall',{
    method: 'DELETE',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'sessionToken'
    })
  })
  .then(()=>{
    fetchOrder();
    return fetchOrder()
  })
  }


//*Checkout-ContactForm*//
const handleSubmitUser = (firstname, lastname, mobile, email) => {
  userRegister(firstname, lastname, mobile, email);
  getUserByMobile(firstname, mobile);
};
   
  const userRegister=(firstname, lastname, mobile, email)=>{
    // debugger;
    fetch(`http://localhost:3000/user/customer_create/${firstname}/${lastname}/${mobile}/${email}`, {
        method: 'POST',
        body: JSON.stringify({user: {firstname: firstname, lastname: lastname, mobile: mobile, email: email}}),
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': 'sessionToken'
        })
    })     
    .then((res)=> res.json(firstname, lastname, mobile, email))         
    .then((user) => {         
      console.log(user);
      setUser(user)
        
      return setUser(user)
    })
    .catch((error) => {
      console.log(error)
    })
     
  }  

  const getUserByMobile = (firstname, mobile)=>{
    // debugger;
    if(firstname && mobile){  
    fetch(`http://localhost:3000/user/getbymobile/${firstname}/${mobile}`, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': 'sessionToken'
      })
    })
    .then((res)=> res.json())
    .catch((error) => {
      console.log(error)
    })
    .then((user) => {       
      console.log(user)
      setUser(user)
      return user     
    })
    .catch((error) => {
      console.log(error)
    })
  }
  }

/*ConfirmForm*/
const orderconfirmed = (orderId, isConfirmed) =>{
// debugger;
  fetch(`http://localhost:3000/order/orderconfirmed/${orderId}/${isConfirmed}`, {
    method: 'PUT',
    body:JSON.stringify({orderId, isConfirmed}),
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'sessionToken'
      })
    })
    .then((res)=> res.json())         
    .then((orders) => {        
      // debugger;
      console.log(orders);
      // return setOrders(orders)
      return fetchOrder(orders);      
    })
    .catch((error) => {
      console.log(error)
    })
    // debugger;           
}

const addToCart = (cartId, subtotal, tax, total, pickup_date, estimated_time, userId) =>{
  // debugger;
  fetch(`http://localhost:3000/cart/update/${cartId}/${subtotal}/${tax}/${total}/${pickup_date}/${estimated_time}/${userId}`,{
      method: 'PUT',
      body:JSON.stringify({cartId, subtotal, tax, total, pickup_date, estimated_time, userId}),
      headers: new Headers({
          "Content-Type": 'application/json',
          'Authorization': 'sessionToken'
      })
  }).then((res)=>res.json())
  .then((cart)=>{      
      console.log(cart)
      var cartId = JSON.parse(JSON.stringify(cart.cartId))
      fetchCartbyCartId(cartId);
      // setCart(cart)
      // addCartNumberToOrder()
      return setCart(cart)
  })
  .catch((error)=>{
      console.log(error)
  })
}

const fetchCartbyCartId = (cartId) =>{
  // debugger;
  fetch(`http://localhost:3000/cart/get/${cartId}`, {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'sessionToken'
    })
    
  }).then((res)=>res.json())
  
  .then((confirmedCart)=>{
    console.log(confirmedCart)
    return setConfirmedCart(confirmedCart)
  })
  .catch((error)=>{
    console.log(error)
  })
}

  useEffect(()=>{
    fetchProducts();
    fetchOrder();
    fetchCart();
  }, []);

  /*Navbar: データベースの中の全orderリストの中で、isConfirmedがnullのorderのみフィルター*/
  var filterdOrders =  orders.filter((order, id)=> order.isConfirmed === null) 
  console.log(filterdOrders)

  /*Cart*/
  const subtotalcal =() =>(filterdOrders.length>0 && filterdOrders.reduce((a,v)=>a = a + (v.subtotal_price*1), 0));
  const taxcal =()=>(Math.round((((filterdOrders.length>0 && filterdOrders.reduce((a,v)=>a = a + (v.subtotal_price*1), 0)) * 0.07) + Number.EPSILON)*100)/100);
  const totalcal = subtotalcal()+taxcal();

  return (
    
    <Router>
      <div className="App">
          <Navbar totalOrders={filterdOrders.length}/>
          <Switch>
            <Route exact path="/">
              <Home createCart={createCart}/>
            </Route>
            <Route exact path="/product">

              <Products products={products} cart={cart} onAddToCart={handleAddToOrder}/>
            </Route>
            <Route exact path="/order">
                <Cart               
                      cart={cart}                          
                      orders={orders}
                      filterdOrders={filterdOrders}
                      subtotal={subtotalcal()}
                      tax={taxcal()}
                      total={totalcal}
                      handleUpdateOrder={handleUpdateOrder}
                      handleDeleteOrder={handleDeleteOrder}
                      handleDeleteAllOrder={handleDeleteAllOrder}                    
                      />                
            </Route>
            <Route exact path="/checkout">
              <Checkout handleSubmitUser={handleSubmitUser} />
            </Route>
            <Route exact path="/confirm">
              <ConfirmForm cart={cart} user={user} orders={orders} addToCart={addToCart} orderconfirmed={orderconfirmed}/>
            </Route>
            <Route exact path="/orderdetails">
                  <OrderDetails cart={cart} orders={orders}/>
            </Route>
          </Switch>
      </div>
    </Router>
  )
}
 
export default App;
