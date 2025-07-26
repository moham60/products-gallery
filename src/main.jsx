import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'flowbite';
import App from './App.jsx'
import ThemeProvider from './Contexts/Theme/ThemeProvider.jsx';
import CartProvider from './Contexts/Cart/CartProvider';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </ThemeProvider>
  </StrictMode>
);
