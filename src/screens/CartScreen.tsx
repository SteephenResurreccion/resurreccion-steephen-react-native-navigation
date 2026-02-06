import React from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View, Pressable } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import CartListItem from "../components/CartListItem";
import { formatCurrency } from "../utils/formatCurrency";

type Props = NativeStackScreenProps<RootStackParamList, "Cart">;

export default function CartScreen({ navigation }: Props) {
  const { items, increaseQty, decreaseQty, totalPrice, totalItems } = useCart();
  const { colors } = useTheme();

  const isEmpty = items.length === 0;

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        {isEmpty ? (
          <View style={[styles.emptyBox, { borderColor: colors.border, backgroundColor: colors.card }]}>
            <Text style={[styles.emptyTitle, { color: colors.text }]}>Your cart is empty</Text>
            <Text style={[styles.emptySub, { color: colors.mutedText }]}>
              Add items on the Home screen to get started.
            </Text>
          </View>
        ) : (
          <>
            <FlatList
              data={items}
              keyExtractor={(x) => x.product.id}
              renderItem={({ item }) => (
                <CartListItem
                  item={item}
                  onPlus={() => increaseQty(item.product.id)}
                  onMinus={() => decreaseQty(item.product.id)}
                />
              )}
              contentContainerStyle={{ paddingBottom: 12 }}
              showsVerticalScrollIndicator={false}
            />

            <View style={[styles.summary, { borderColor: colors.border, backgroundColor: colors.card }]}>
              <View style={styles.summaryRow}>
                <Text style={[styles.summaryLabel, { color: colors.mutedText }]}>Items</Text>
                <Text style={[styles.summaryValue, { color: colors.text }]}>{totalItems}</Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={[styles.summaryLabel, { color: colors.mutedText }]}>Total</Text>
                <Text style={[styles.summaryValue, { color: colors.text }]}>
                  {formatCurrency(totalPrice)}
                </Text>
              </View>

              <Pressable
                onPress={() => navigation.navigate("Checkout")}
                style={({ pressed }) => [
                  styles.checkoutBtn,
                  { backgroundColor: colors.primary, opacity: pressed ? 0.85 : 1 },
                ]}
              >
                <Text style={styles.checkoutBtnText}>Proceed to Checkout</Text>
              </Pressable>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  emptyBox: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 16,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 6,
  },
  emptySub: {
    fontSize: 13,
    fontWeight: "600",
    lineHeight: 18,
  },
  summary: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    marginTop: 6,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 13,
    fontWeight: "700",
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: "900",
  },
  checkoutBtn: {
    marginTop: 10,
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",
  },
  checkoutBtnText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },
});
