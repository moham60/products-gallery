
import { createHashRouter, RouterProvider } from 'react-router'
import './App.css'
import Layout from './Components/Layout/Layout'
import Products from './Pages/Products';
import ProductDetails from './Pages/ProductDetails';
import Cart from './Pages/Cart';
import HeroPage from './Pages/HeroPage/HeroPage';
import NotFound from './Pages/NotFound';
import { Toaster } from 'react-hot-toast';
const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HeroPage/>,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/products/:id",
        element: <ProductDetails />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "*",
        element:<NotFound/>
      }
    ],
  },
]);
function App() {

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
      <Toaster position="top-right" autoClose={2000} />
    </>
  );
}

export default App
