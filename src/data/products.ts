import { Product } from "../types";

export type ProductCategory = "Desserts" | "Drinks" | "Light Meals";

export const PRODUCTS: Product[] = [
  // ======================
  // DESSERTS
  // ======================
  {
    id: "des-1",
    name: "Ube Ice Cream Cup",
    price: 99,
    category: "Desserts",
  },
  {
    id: "des-2",
    name: "Chocolate Lava Cake",
    price: 189,
    category: "Desserts",
  },
  {
    id: "des-3",
    name: "Strawberry Cheesecake Slice",
    price: 179,
    category: "Desserts",
  },
  {
    id: "des-4",
    name: "Classic Brownie",
    price: 89,
    category: "Desserts",
  },
  {
    id: "des-5",
    name: "Vanilla Cupcake",
    price: 75,
    category: "Desserts",
  },
  {
    id: "des-6",
    name: "Banoffee Pie Slice",
    price: 169,
    category: "Desserts",
  },
  {
    id: "des-7",
    name: "Mango Graham Cup",
    price: 119,
    category: "Desserts",
  },

  // ======================
  // DRINKS
  // ======================
  {
    id: "drk-1",
    name: "Iced Caramel Latte",
    price: 149,
    category: "Drinks",
  },
  {
    id: "drk-2",
    name: "Matcha Milk Tea",
    price: 159,
    category: "Drinks",
  },
  {
    id: "drk-3",
    name: "Fresh Lemonade",
    price: 89,
    category: "Drinks",
  },
  {
    id: "drk-4",
    name: "Iced Chocolate",
    price: 139,
    category: "Drinks",
  },
  {
    id: "drk-5",
    name: "Cold Brew Coffee",
    price: 149,
    category: "Drinks",
  },
  {
    id: "drk-6",
    name: "Strawberry Milkshake",
    price: 169,
    category: "Drinks",
  },
  {
    id: "drk-7",
    name: "Bottled Water",
    price: 39,
    category: "Drinks",
  },

  // ======================
  // LIGHT MEALS
  // ======================
  {
    id: "mea-1",
    name: "Chicken Wrap",
    price: 169,
    category: "Light Meals",
  },
  {
    id: "mea-2",
    name: "Caesar Salad Bowl",
    price: 179,
    category: "Light Meals",
  },
  {
    id: "mea-3",
    name: "Grilled Cheese Sandwich",
    price: 149,
    category: "Light Meals",
  },
  {
    id: "mea-4",
    name: "Ham & Cheese Panini",
    price: 189,
    category: "Light Meals",
  },
  {
    id: "mea-5",
    name: "Tuna Sandwich",
    price: 159,
    category: "Light Meals",
  },
  {
    id: "mea-6",
    name: "Pasta Alfredo (Small)",
    price: 199,
    category: "Light Meals",
  },
];
