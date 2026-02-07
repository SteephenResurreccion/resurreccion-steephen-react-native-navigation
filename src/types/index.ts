export type Product = {
  id: string;
  name: string;
  price: number;
  category: "Desserts" | "Drinks" | "Light Meals";
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  Cart: undefined;
  Checkout: undefined;
};
