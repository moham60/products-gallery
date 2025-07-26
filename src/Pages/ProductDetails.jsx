import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router"
import Skeleton from "../Components/Skeleton/Skeleton";
import  { cartContext } from "../Contexts/Cart/CartProvider";

export default function ProductDetails() {
  const { id } = useParams();
  const [isloading, setisloading] = useState(false);
  const [productDetails, setproductDetails] = useState(null)
  function getProductDetails() {
    setisloading(true);
    axios.get(`https://fakestoreapi.com/products/${id}`).then((res) => {
      console.log(res);
      setTimeout(() => {
        setisloading(false)
      }, 2000);
      setproductDetails(res.data)
    }).catch((error) => {
      console.log(error);
        setTimeout(() => {
          setisloading(false);
        }, 2000);
    });
  }
  useEffect(() => {
    getProductDetails();
  }, []);
   const { addToCart } = useContext(cartContext);
  return (
    <div className="bg-white p-18 dark:bg-gray-900 ">
      {isloading ? (
        <div className="bg-white dark:bg-gray-700 rounded-2xl p-3">
          <Skeleton page={"details"} />
        </div>
      ) : (
        productDetails && (
          <div
            className="flex bg-white shadow-2xl dark:bg-gray-800 rounded-lg p-4  flex-col justify-center dark:text-white items-center gap-4 md:flex-row md:justify-between
         ">
            <div className="left m-2  w-full md:w-[50%]">
              <img
                className="rounded w-full"
                src={productDetails.image}
                alt={productDetails.title}
              />
            </div>
            <div className="right">
              <h2 className="font-bold text-2xl ">{productDetails.title}</h2>
              <p className="text-gray-500 my-2 dark:text-gray-600">
                {productDetails.description}
              </p>
              <h3>
                Category : {" "}
                <span className="dark:text-emerald-300 text-emerald-600 ">
                  {productDetails.category}
                </span>
              </h3>
              <div className="flex my-2 items-center justify-between">
                <span>{productDetails.price}EGP</span>
                <span>{productDetails.rating.rate}</span>
              </div>
              <div className="addToCart mt-3">
                  <button
                    onClick={() => {
                       addToCart(productDetails.id);
                    }}
                    className="w-full cursor-pointer text-center rounded p-4 border border-emerald-600 hover:bg-emerald-600 dark:border-emerald-700 hover:text-white dark:hover:text-black dark:hover:bg-emerald-700">
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}
