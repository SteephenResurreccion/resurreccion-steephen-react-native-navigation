export type Product = {
  id: string;
  name: string;
  price: number; // store as number; format only at UI level
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type RootStackParamList = {
  Home: undefined;
  Cart: undefined;
  Checkout: undefined;
};
