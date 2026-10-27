import { useState,createContext, useEffect } from "react";
export const ContextManage=createContext();
function ContextThrow({children}){
     const [cartItems,setItems]=useState(()=>{
       const saved_data= localStorage.getItem("cartItems");
       return ((saved_data)?JSON.parse(saved_data):[]);
        });
        useEffect(()=>{
            localStorage.setItem("cartItems",JSON.stringify(cartItems));
        }
       ,[cartItems] );
    
    return(
       
        <ContextManage.Provider value={{cartItems,setItems}}> 
            {children}
        </ContextManage.Provider>
    );
}
export default ContextThrow;