import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const Context = createContext();

function AppContext({ children }) {
  const [categories, setCategories] = useState();
  const [products, setProducts] = useState();
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartSubTotal, setCartSubTotal] = useState(0);
  const location = useLocation()

  useEffect(()=>{
    window.scrollTo(0, 0)
  },[location])

  useEffect(()=>{
    let count = 0
    let subtotal = 0;
    cartItems.map(item => (
      subtotal += item.attributes.price * item.attributes.quantity,
      count += item.attributes.quantity
    ))
    setCartSubTotal(subtotal)
    setCartCount(count)
  }, [cartItems])

  const handleAddToCart = (product, quantity)=>{
    let items = [...cartItems];
    let index = items.findIndex(item => item.id === product.id);
    if(index !== -1){
      items[index].attributes.quantity += quantity;
    }
    else{
      product.attributes.quantity = quantity
      items = [...items, product]
    }

    setCartItems(items);

  }
  const handleRemoveFromCart = (product)=>{
    let items = [...cartItems]
    items = items.filter((item) => item.id !== product.id)
    setCartItems(items)
  }
  const handleCartProductQuantity = (type, product)=>{
    let items = [...cartItems];
    let index = items.findIndex((item)=>item.id === product.id)
    if(type === 'inc'){
      items[index].attributes.quantity += 1
    }else if (type === 'dec') {
      if (items[index].attributes.quantity === 1) return ;
      items[index].attributes.quantity -= 1
    }
    setCartItems(items)
  }

  return (
    <Context.Provider
      value={{
        categories,
        setCategories,
        products,
        setProducts,
        cartItems, 
        setCartItems,
        cartCount, 
        setCartCount,
        cartSubTotal, 
        setCartSubTotal,
        handleAddToCart,
        handleRemoveFromCart,
        handleCartProductQuantity
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default AppContext;
