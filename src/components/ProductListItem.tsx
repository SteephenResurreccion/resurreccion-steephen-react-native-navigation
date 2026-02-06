import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Product } from "../types";
import { formatCurrency } from "../utils/formatCurrency";
import { useTheme } from "../context/ThemeContext";

type Props = {
  product: Product;
  onAdd: () => void;
};

export default function ProductListItem({ product, onAdd }: Props) {
  const { colors } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={styles.left}>
        <Text style={[styles.name, { color: colors.text }]}>{product.name}</Text>
        <Text style={[styles.price, { color: colors.mutedText }]}>
          {formatCurrency(product.price)}
        </Text>
      </View>

      <Pressable
        onPress={onAdd}
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: colors.primary, opacity: pressed ? 0.85 : 1 },
        ]}
      >
        <Text style={styles.buttonText}>Add</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  left: {
    flex: 1,
    paddingRight: 12,
  },
  name: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 4,
  },
  price: {
    fontSize: 13,
    fontWeight: "600",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 13,
  },
});
