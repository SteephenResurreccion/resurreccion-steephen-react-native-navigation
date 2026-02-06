import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import { CartProvider } from "./src/context/CartContext";
import { ThemeProvider, useTheme } from "./src/context/ThemeContext";

/**
 * Keeps NavigationContainer theme in sync with our ThemeContext.
 * Split into a component so we can safely use the `useTheme()` hook.
 */
function AppWithNavigation() {
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
        <AppWithNavigation />
      </CartProvider>
    </ThemeProvider>
  );
}
