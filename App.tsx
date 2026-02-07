import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider, useTheme } from "./src/context/ThemeContext";
import { CartProvider } from "./src/context/CartContext";
import AppNavigator from "./src/navigation/AppNavigator";

function AppWithNav() {
  const { navTheme } = useTheme();
  return (
    <NavigationContainer theme={navTheme}>
      <AppNavigator />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <AppWithNav />
      </CartProvider>
    </ThemeProvider>
  );
}
