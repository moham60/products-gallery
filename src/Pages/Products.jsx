import axios from "axios"
import { useContext, useEffect, useState } from "react";
import Skeleton from "../Components/Skeleton/Skeleton";
import {  NavLink } from "react-router";
import  { cartContext } from "../Contexts/Cart/CartProvider";
import RatingStars from "../Components/Rating/RatingStars";

export default function Products() {
  const [allProducts, setallProducts] = useState(null);
const [sortOption, setSortOption] = useState("");

  const [error, seterror] = useState("");
  const [displayedProducts, setdisplayedProducts] = useState(null)
  const [loading, setloading] = useState(false)
  function getAllProducts() {
    setloading(true);
    axios.get("https://fakestoreapi.com/products").then((res) => {
      console.log(res);
      setloading(false);
      setallProducts(res.data);
      setdisplayedProducts(res.data)
    }).catch((error) => {
      seterror(error);
       setloading(false);
    });
  }

useEffect(() => {
  if (!allProducts) return;
  let sorted = [...allProducts];
  if (sortOption === "price-asc") {
    sorted.sort((a, b) => a.price - b.price);
  } else if (sortOption === "price-desc") {
    sorted.sort((a, b) => b.price - a.price);
  } else if (sortOption === "name-asc") {
    sorted.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortOption === "name-desc") {
    sorted.sort((a, b) => b.title.localeCompare(a.title));
  }

  setdisplayedProducts(sorted);
}, [sortOption, allProducts]);

  useEffect(() => {
    getAllProducts();
  }, []);
  const handleChange = (e) => {
    const lowerCaseValue = e.target.value.toLowerCase();
    if (lowerCaseValue) {
      console.log(lowerCaseValue)
        setdisplayedProducts(allProducts.filter(el=>el.title.toLowerCase().includes(lowerCaseValue)))
    }
    else {
      setdisplayedProducts(allProducts)
    }

  }
  const { addToCart } = useContext(cartContext);
  return (
    <div>
      {loading ? (
        <div className="grid gap-3 py-10 justify-center md:grid-cols-4 lg:grid-cols-5">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton page={"products"} key={index} />
          ))}
        </div>
      ) : !error ? (
        <>
          <div className="filteration flex-wrap gap-4 flex items-center justify-between p-4">
            <div className="relative mt-2 w-full ">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 20">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
                  />
                </svg>
              </div>
              <input
                onChange={handleChange}
                type="text"
                id="simple-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search by product title..."
                required
              />
            </div>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="p-2 border w-full rounded-md dark:bg-gray-800 dark:text-white">
              <option value="">Sort By</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A–Z</option>
              <option value="name-desc">Name: Z–A</option>
            </select>
          </div>
          <div className="grid p-10 gap-4 justify-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {displayedProducts &&
              displayedProducts.map((product) => (
                <NavLink
                  to={`/products/${product.id}`}
                  key={product.id}
                  className="card relative overflow-hidden hover:translate-y-[-10px] transition-all duration-300 bg-white dark:bg-gray-950 dark:text-white  group shadow-2xl rounded-xl
            px-3 pb-10 pt-4 ">
                  <img
                    className="w-full"
                    style={{
                      objectFit: "cover",
                      objectPosition: "center",
                      height: "400px",
                    }}
                    src={product.image}
                    alt={product.title}
                  />
                  <h2 className="my-2 text-emerald-400 dark:text-emerald-600">
                    {product.title.split("", 10)}
                  </h2>
                  <h3 className="my-2">{product.category}</h3>
                  <div className="flex items-center justify-between ">
                    <span className="price">{product.price}EGP</span>
                    <span>
                      
                      <RatingStars rating={product.rating.rate} />
                    </span>
                  </div>
                  <div className="absolute z-40 w-full transition-all duration-500  left-[50%]  group-hover:translate-y-[0px]  translate-y-[50px] translate-x-[-50%] ">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        addToCart(product.id);
                      }}
                      className="bg-emerald-900 w-full cursor-pointer  rounded-lg block p-2  dark:text-white">
                      Add To Cart
                    </button>
                  </div>
                </NavLink>
              ))}
          </div>
        </>
      ) : (
        <div className="text-red-600 text-2xl">{error}</div>
      )}
    </div>
  );
}
