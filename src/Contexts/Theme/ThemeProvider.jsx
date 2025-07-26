import { createContext, useEffect, useState } from "react"

export const themeContext = createContext();
export default function ThemeProvider({ children }) {
     const [theme, settheme] = useState("light");
    const [isInilized, setisInilized] = useState(false);
    const toggoleTheme = () => {
        if (theme == "light") {
            settheme("dark");
        }
        else {
            settheme("light")
        }
    }
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        const intialTheme = savedTheme || "light";
        settheme(intialTheme);
        setisInilized(true);
    }, [])
    useEffect(() => {
        if (isInilized) {
            localStorage.setItem("theme", theme);
            if (theme == "dark") {
                document.documentElement.classList.add("dark")
            }
            else {
                   document.documentElement.classList.remove("dark");
            }
        }
    },[isInilized,theme])
   
  return (
    <themeContext.Provider value={{ theme, toggoleTheme }}>
      {children}
    </themeContext.Provider>
  );
}
