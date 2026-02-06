import React, { useLayoutEffect } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View, Pressable } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { PRODUCTS } from "../data/products";
import ProductListItem from "../components/ProductListItem";
import ThemeToggleButton from "../components/ThemeToggleButton";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  const { addToCart, totalItems } = useCart();
  const { colors } = useTheme();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ minWidth: 80, alignItems: "flex-end" }}>
          <Text style={{ color: colors.mutedText, fontWeight: "700" }}>
            Cart: {totalItems}
          </Text>
        </View>
      ),
    });
  }, [navigation, totalItems, colors.mutedText]);

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <View style={styles.headerArea}>
        <ThemeToggleButton />

        <Pressable
          onPress={() => navigation.navigate("Cart")}
          style={({ pressed }) => [
            styles.cartButton,
            { backgroundColor: colors.primary, opacity: pressed ? 0.85 : 1 },
          ]}
        >
          <Text style={styles.cartButtonText}>Go to Cart</Text>
        </Pressable>
      </View>

      <Text style={[styles.title, { color: colors.text }]}>Available Products</Text>

      <FlatList
        data={PRODUCTS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <ProductListItem product={item} onAdd={() => addToCart(item)} />
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  headerArea: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 12,
    gap: 10,
  },
  cartButton: {
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
  },
  cartButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },
  title: {
    paddingHorizontal: 16,
    fontSize: 18,
    fontWeight: "800",
    marginTop: 4,
    marginBottom: 10,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
});
