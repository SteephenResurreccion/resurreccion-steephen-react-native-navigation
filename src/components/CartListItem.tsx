import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { CartItem } from "../types";
import { formatCurrency } from "../utils/formatCurrency";
import { useTheme } from "../context/ThemeContext";

type Props = {
  item: CartItem;
  onPlus: () => void;
  onMinus: () => void;
};

export default function CartListItem({ item, onPlus, onMinus }: Props) {
  const { colors } = useTheme();

  const lineTotal = item.product.price * item.quantity;

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={styles.left}>
        <Text style={[styles.name, { color: colors.text }]}>{item.product.name}</Text>
        <Text style={[styles.sub, { color: colors.mutedText }]}>
          {formatCurrency(item.product.price)} each
        </Text>
        <Text style={[styles.total, { color: colors.text }]}>
          Item Total: {formatCurrency(lineTotal)}
        </Text>
      </View>

      <View style={styles.controls}>
        <Pressable
          onPress={onMinus}
          style={({ pressed }) => [
            styles.qtyBtn,
            { borderColor: colors.border, opacity: pressed ? 0.7 : 1 },
          ]}
        >
          <Text style={[styles.qtyBtnText, { color: colors.text }]}>-</Text>
        </Pressable>

        <Text style={[styles.qty, { color: colors.text }]}>{item.quantity}</Text>

        <Pressable
          onPress={onPlus}
          style={({ pressed }) => [
            styles.qtyBtn,
            { borderColor: colors.border, opacity: pressed ? 0.7 : 1 },
          ]}
        >
          <Text style={[styles.qtyBtnText, { color: colors.text }]}>+</Text>
        </Pressable>
      </View>
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
  sub: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 6,
  },
  total: {
    fontSize: 13,
    fontWeight: "700",
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  qtyBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  qtyBtnText: {
    fontSize: 18,
    fontWeight: "800",
  },
  qty: {
    minWidth: 22,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "800",
  },
});
