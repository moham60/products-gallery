import { Link, NavLink } from "react-router";
import logo from "../../assets/images/shopping.png";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { useContext } from "react";
import { themeContext } from './../../Contexts/Theme/ThemeProvider';
import { BsMoonStars } from "react-icons/bs";
import { IoCart } from "react-icons/io5";
import { cartContext } from "../../Contexts/Cart/CartProvider";
import { IoCartOutline } from "react-icons/io5";

export default function Navbar() {
  const { theme, toggoleTheme } = useContext(themeContext);
  const {numberOfItemsInCart}=useContext(cartContext)
  return (
    <div>
      <nav className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logo} className="h-8" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Gallery
            </span>
          </Link>
          <button
            data-collapse-toggle="navbar-solid-bg"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-solid-bg"
            aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className="hidden w-full md:block md:w-auto"
            id="navbar-solid-bg">
            <ul className="flex items-center flex-col font-medium mt-4 rounded-lg bg-gray-50 gap-3  md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
              <li>
                <NavLink
                  to="/products"
                  className="block p-2   rounded-sm md:bg-transparent  dark:text-white md:dark:bg-transparent"
                  aria-current="page"
                  end>
                  Products
                </NavLink>
                {/* end to become the link must end with the exact word to be active
                , not that contain the word */}
              </li>
              <li>
                <NavLink
                  to="/cart"
                  className="flex  items-center gap-2  p-2   text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                  Cart
                </NavLink>
              </li>
              <li>
                <div className="relative">
                  {theme == "dark" ? <IoCartOutline className="text-white" size={20} /> : <IoCart size={20} />}
                  <div className="absolute  right-1 top-[-20px]">
                    <span className="text-red-600  rounded-full">
                      {numberOfItemsInCart}
                    </span>
                  </div>
                </div>
              </li>
              <li className="block">
                <button onClick={toggoleTheme} className="cursor-pointer flex">
                  {theme == "light" ? (
                    <BsFillMoonStarsFill size={20} />
                  ) : (
                    <BsMoonStars className="text-white" size={20} />
                  )}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
