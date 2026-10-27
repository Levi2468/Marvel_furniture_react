import { ContextManage } from "./context";
import { useContext  } from "react";
import './css/cart.css'
function Cart(){
    const {cartItems,setItems}=useContext(ContextManage);
    const images = import.meta.glob(
                "./assets/*.jpeg",
                { eager: true ,import:"default"},
                );
    const getImage = (name) => images[`./assets/${name}.jpeg`];
    const days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    const today = new Date().getDay();
    const show_day=days[today+1]  
    
    const totalProducts = cartItems.reduce(
        (total, items) => total + Number(items.count || 0), 0
    );

    const totalPrice = cartItems.reduce(
        (total, items) => total + Number(items.Old.replace(/,/g, '')) * Number(items.count || 0), 0
    );

    const totalAmount = cartItems.reduce(
        (total, items) => total + Number(items.New.replace(/,/g, '')) * Number(items.count || 0), 0
    );

    const totalDiscount = totalPrice - totalAmount;
    const deliveryCharge = 0;

    const formatPrice = (price) =>
        price.toLocaleString('en-IN');
      
    if (cartItems.length === 0)
        { 
            return <div className="emt-cart">
                <div>
                <div className="cart-message">
                    <i  className="fa-solid fa-cart-shopping"/>
                    <span>Your cart is Empty</span>
                </div> 
                <div style={{
                    fontSize:'1em',
                    textAlign:'center',
                    color:'gold'
                }}>Add items to checkout</div>
                </div>
            </div>
        }
return(
<>  
    <div className="cart-container">
    <main className="cart-shelves">
    {cartItems.map((cart_prod,index)=>
    <div className="cart-card" key={index}>
        <div className="cart-image">
            <img src={getImage(cart_prod.Image)} alt={cart_prod.Product} />
        </div>
        <div className="prod-details">
           <div className="cart-card-head"><span className="prod-title">{cart_prod.Product}</span><span className="delv">Delivered by Tomorrow,{show_day}</span></div>
           <div className="prod-pricing">Price: <del>Rs{cart_prod.Old}/-</del>
            <b>{cart_prod.New}/-</b>
            <mark>- {cart_prod.dis}%</mark><span style={{color:'green',cursor:'pointer'}} title="Discount on First order">Offer applied <i class="fa-solid fa-circle-info"></i></span></div>
             <div className="add-remove">
                <label>Quantity:
                    <input
                        type="number"
                        min={1}
                        max={10}
                        value={cart_prod.count}
                        onChange={
                            (e)=>{
                             const qty=Number(e.target.value);
                             setItems(cartItems.map((items)=>
                             { 
                                return ( items.Product === cart_prod.Product)?({...items,count:qty}):items;
                             }));} }
                    />
                </label>
            <button onClick={()=>{
                setItems(cartItems.filter(
                    (items)=> items.Product!=cart_prod.Product
                )
            );}
            } className="remove-btn">Remove</button></div>
        </div>
        
        </div>)
        }
    </main>
    
    <aside className="billing">
        <div className="billing-card">

            <h3>PRICE DETAILS</h3>

            <div className="bill-row">
                <span>Price ({totalProducts} items)</span>
                <span>₹{formatPrice(totalPrice)}</span>
            </div>

            <div className="bill-row">
                <span>Discount</span>
                <span className="bill-discount">
                    - ₹{formatPrice(totalDiscount)}
                </span>
            </div>

            <div className="bill-row">
                <span>Delivery Charges</span>
                <span>
                    <del>₹{formatPrice(100)}</del>
                    <b className="free-delivery"> FREE</b>
                </span>
            </div>

            <div className="bill-total">
                <span>Total Amount</span>
                <span>₹{formatPrice(totalAmount + deliveryCharge)}</span>
            </div>

            <p className="savings">
                You will save ₹{formatPrice(totalDiscount)} on this order
            </p>

            <button
                className="checkout-btn"
                onClick={() => alert("Checkout")}
            >
                CHECKOUT
            </button>

        </div>
    </aside>

    </div>
    
</>
);
}
export default Cart;