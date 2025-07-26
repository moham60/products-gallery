import axios from "axios";
import { createContext, useEffect, useState } from "react"
import toast from "react-hot-toast";

export const cartContext = createContext();
export default function CartProvider({children}) {
  const [numberOfItemsInCart, setnumberOfItemsInCart] = useState(0);
  const [cartItems, setcartItems] = useState([]);
   
  async function addToCart(productId, quantity = 1) {
    try {
      const res = await axios.get(
        `https://fakestoreapi.com/products/${productId}`
      );
      const productData = res.data;

      setcartItems((prev) => {
        const existing = prev.find((item) => item.product.id === productId);
        let updatedCart;

        if (existing) {
          updatedCart = prev.map((item) =>
            item.product.id === productId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
          toast.success("Already exists, quantity updated!");
        } else {
          updatedCart = [...prev, { product: productData, quantity }];
          toast.success("Added to cart!");
        }

        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
        setnumberOfItemsInCart(
          updatedCart.reduce((sum, item) => sum + item.quantity, 0)
        );
        return updatedCart;
      });

      await axios.post("https://fakestoreapi.com/carts", {
        userId: 1,
        date: new Date().toISOString().split("T")[0],
        products: [{ productId, quantity }],
      });
    } catch (error) {
      console.error("❌ Error adding to cart:", error);
      toast.error("Something went wrong!");
    }
  }

  

function removeFromCart(productId) {
  const updatedCart = cartItems.filter((item) => item.product.id !== productId);
  setcartItems(updatedCart);
  localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  setnumberOfItemsInCart(
    updatedCart.reduce((sum, item) => sum + item.quantity, 0)
  );
toast.success("✅ deleted from cart!");
}    


  function getUserCartItem() {
    const storedCart = JSON.parse(localStorage.getItem("cartItems"));
    if (storedCart?.length > 0) {
      setcartItems(storedCart);
     setnumberOfItemsInCart(
       storedCart.reduce((sum, item) => sum + item.quantity, 0)
     );
    }
   
  }
  useEffect(() => {
    getUserCartItem();
  }, []);



    useEffect(() => {
      console.log("📦 numberOfItemsInCart:", numberOfItemsInCart);
    }, [numberOfItemsInCart]);
     useEffect(() => {
       console.log("📦 cartItems:", cartItems);
     }, [cartItems]);
  return (
    <cartContext.Provider
      value={{
        addToCart,
        numberOfItemsInCart,
        cartItems,
        removeFromCart,
        setnumberOfItemsInCart,
      }}>
      {children}
    </cartContext.Provider>
  );
}

