import { useContext, useEffect, useState } from "react";
import { cartContext } from "../Contexts/Cart/CartProvider";


export default function Cart() {
  const { cartItems, removeFromCart, setnumberOfItemsInCart } =
    useContext(cartContext);
 const [quantities, setQuantities] = useState({});

 useEffect(() => {
   if (cartItems) {
     const initialQuantities = {};
     cartItems.forEach((item) => {
       initialQuantities[item.product.id] = item.quantity;
     });
     setQuantities(initialQuantities);
   }
 }, [cartItems]);
const increaseQuantity = (productId) => {
  setQuantities((prev) => ({
    ...prev,
    [productId]: prev[productId] + 1,
  }));
  setnumberOfItemsInCart((prev)=>prev+=1);
};

const decreaseQuantity = (productId) => {
  setQuantities((prev) => ({
    ...prev,
    [productId]: prev[productId] > 1 ? prev[productId] - 1 : 1,
  }));
  setnumberOfItemsInCart((prev) => (prev -= 1));
};

 
  return (
    <div className="p-20">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th className="px-6 py-3">Product</th>
              <th className="px-6 py-3">Qty</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.length > 0 &&
              cartItems.map((item) => (
                <tr
                  key={item.product.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="px-6 py-4">
                    <img
                      src={item.product.image}
                      className="w-16 md:w-32 max-w-full max-h-full"
                      alt={item.product.title}
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {item.product.title}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <button
                      onClick={()=>decreaseQuantity(item.product.id)}
                        className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        type="button">
                        <span className="sr-only">Quantity button</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 2">
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M1 1h16"
                          />
                        </svg>
                      </button>
                      <div>
                        <input
                          type="number"
                          id="first_product"
                          className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={quantities[item.product.id]}
                          required
                        />
                      </div>
                      <button
                        onClick={()=>increaseQuantity(item.product.id)}
                        className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        type="button">
                        <span className="sr-only">Quantity button</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 18">
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 1v16M1 9h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>

                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    $
                    {(
                      item.product.price * (quantities[item.product.id] || 1)
                    ).toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => {
                        removeFromCart(item.product.id);
                      }}
                      className="font-medium cursor-pointer text-red-600 dark:text-red-500 ">
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

