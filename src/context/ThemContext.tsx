import React, { createContext, useContext, useState, useEffect } from "react";

type ThemeContextType = {
  Theme: boolean;
  toggleTheme: () => void;
  color: string;
  setColor: (color: string) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const useColor = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useColor must be used within a ThemeProvider");
  }
  return { color: context.color, setColor: context.setColor };
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const storedTheme = localStorage.getItem("theme") === "dark";
  const storedColor = localStorage.getItem("color") || "#1677ff";
  const [Theme, setTheme] = useState<boolean>(storedTheme);
  const [color, setColor] = useState<string>(storedColor);

  useEffect(() => {
    localStorage.setItem("theme", Theme ? "dark" : "light");
    document.body.setAttribute("data-theme", Theme ? "dark" : "light");
  }, [Theme]);

  useEffect(() => {
    localStorage.setItem("color", color);
    document.body.style.setProperty("--selected-color", color);
  }, [color]);

  const toggleTheme = () => setTheme((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ Theme, toggleTheme, color, setColor }}>
      {children}
    </ThemeContext.Provider>
  );
};
