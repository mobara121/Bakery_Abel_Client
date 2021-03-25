import React, { useState, useEffect } from 'react';
import { Home, Products, Navbar, Cart, Checkout, OrderDetails } from './components';
import ConfirmForm from './components/CheckoutForm/ConfirmForm.jsx';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState('');
  const [cart, setCart] = useState('');
  const [confirmedOrder, setConfirmedOrder] = useState([])
  const [confirmedCart, setConfirmedCart] = useState([])

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
      //方法２　isConfirmedが取得されていないもののみをreturnする方法
      // let filterdOrders = orders.filter((order, id)=> order.isConfirmed === null) 
      // console.log(filterdOrders)
      // return setOrders(filterdOrders)
    })
    .catch((error)=> {
      console.log(error)
    })
  }

  // const handleSubmitCart = (cartId, subtotal, tax, total, pickup_date, estimated_time, userId, orderId, isConfirmed) => {
  //   debugger;
  //   addToCart(cartId, subtotal, tax, total, pickup_date, estimated_time, userId);
  //   orderconfirmed(orderId, isConfirmed);
  // };

  const fetchOrderbyCartId = (cartId) =>{
    // debugger;
    fetch(`http://localhost:3000/order/getallbycart/${cartId}`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'sessionToken'
      })
      
    }).then((res)=>res.json())
    
    .then((confirmedOrder)=>{
      console.log(confirmedOrder)
      return setConfirmedOrder(confirmedOrder)
    })
    .catch((error)=>{
      console.log(error)
    })
  }

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
      // debugger;
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
  // debugger;
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
    // debugger;             
}

const handleDeleteAllOrder = () =>{
  // debugger;
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


//*USER*//
const handleSubmitUser = (firstname, lastname, mobile, email) => {
  userRegister(firstname, lastname, mobile, email);
  getUserByMobile(firstname, mobile);
};

    
  const userRegister=(firstname, lastname, mobile, email)=>{
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
        // debugger;         
      console.log(user);
      setUser(user)
        
      return setUser(user)
    })
    .catch((error) => {
      console.log(error)
    }) 
  }  

  const getUserByMobile = (firstname, mobile)=>{
      
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
      // debugger;       
      console.log(user)
      setUser(user)
      return setUser(user)      
    })
    .catch((error) => {
      console.log(error)
    })
  }

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
    // console.log(cart.cart.id)
    var cartId = JSON.parse(JSON.stringify(cart.cart.id))
    setCart(cart)
    console.log(cartId)
    return cartId
  })
  .catch((error)=>{
    console.log(error)
  })
}

const handleEmptyCart = (cartId) => {
  // debugger;
  fetch(`http://localhost:3000/cart/delete/${cartId}`, {
    method: 'DELETE',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'sessionToken'
    })
  })     
  .then(()=> {
    fetchCart();
    return fetchCart()}) 
              
}

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
  
  if(!cart.id && cart.id){
  console.log(cart)
  var cartid = cart.cart.id
    console.log(cart.cart.id)
    
    var cartId = JSON.stringify(cartid)
    console.log(cartId)
    return cartId
  }


    var filterdOrders =  orders.filter((order, id)=> order.isConfirmed === null) 
    console.log(filterdOrders)



  var userId = JSON.stringify(user.id);
  var userfname = JSON.stringify(user.firstname);
  var userlname = JSON.stringify(user.lastname);
  var usermobile = JSON.stringify(user.mobile);
  var useremail = JSON.stringify(user.email);

  const subtotalcal =() =>(orders.length>0 && orders.reduce((a,v)=>a = a + (v.subtotal_price*1), 0));
  const taxcal =()=>(Math.round((((orders.length>0 && orders.reduce((a,v)=>a = a + (v.subtotal_price*1), 0)) * 0.07) + Number.EPSILON)*100)/100);
  const totalcal = subtotalcal()+taxcal();

  //  if(!cart.length) return 'cart Loading...'; 
  //  if(!orders.length) return 'order Loading...';
  // debugger;
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
                      cartId={cartId}
                      orders={orders}
                      filterdOrders={filterdOrders}
                      subtotal={subtotalcal()}
                      tax={taxcal()}
                      total={totalcal}
                      fetchOrder={fetchOrder}
                      handleUpdateOrder={handleUpdateOrder}
                      handleDeleteOrder={handleDeleteOrder}
                      handleDeleteAllOrder={handleDeleteAllOrder}
                      
                      />                
            </Route>
            <Route exact path="/checkout">
              <Checkout handleSubmitUser={handleSubmitUser} />
            </Route>
            <Route exact path="/confirm">
              <ConfirmForm cart={cart} cartId={cartId} user={user} userId={userId} userfname={userfname} userlname={userlname} usermobile={usermobile} useremail={useremail} orders={orders} subtotal={subtotalcal()} tax={taxcal()} total={totalcal}  addToCart={addToCart} orderconfirmed={orderconfirmed}/>
            </Route>
            <Route exact path="/orderdetails">
                  <OrderDetails cart={cart} orders={orders} filterdOrders={filterdOrders} confirmedCart={confirmedCart}/>
            </Route>
          </Switch>
      </div>
    </Router>
  )
}
// handleSubmitCart={handleSubmitCart} 
export default App;
