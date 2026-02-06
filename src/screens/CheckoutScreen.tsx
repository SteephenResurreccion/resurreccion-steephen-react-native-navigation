import React from "react";
import { Alert, FlatList, SafeAreaView, StyleSheet, Text, View, Pressable } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import { formatCurrency } from "../utils/formatCurrency";

type Props = NativeStackScreenProps<RootStackParamList, "Checkout">;

export default function CheckoutScreen({ navigation }: Props) {
  const { items, totalPrice, clearCart } = useCart();
  const { colors } = useTheme();

  const handleCheckout = () => {
    // Checkout flow is mocked (per requirement): show alert, then redirect Home.
    Alert.alert("Success", "Checkout successful", [
      {
        text: "OK",
        onPress: () => {
          // Clear cart after successful checkout
          clearCart();

          // Reset stack so user can’t go “Back” to checkout/cart after success
          navigation.reset({
            index: 0,
            routes: [{ name: "Home" }],
          });
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>Review Order</Text>

        <FlatList
          data={items}
          keyExtractor={(x) => x.product.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const lineTotal = item.product.price * item.quantity;
            return (
              <View style={[styles.rowCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <View style={{ flex: 1, paddingRight: 12 }}>
                  <Text style={[styles.name, { color: colors.text }]}>{item.product.name}</Text>
                  <Text style={[styles.meta, { color: colors.mutedText }]}>
                    Qty: {item.quantity} • {formatCurrency(item.product.price)} each
                  </Text>
                </View>

                <Text style={[styles.lineTotal, { color: colors.text }]}>
                  {formatCurrency(lineTotal)}
                </Text>
              </View>
            );
          }}
          ListFooterComponent={
            <View style={[styles.footer, { borderColor: colors.border, backgroundColor: colors.card }]}>
              <View style={styles.totalRow}>
                <Text style={[styles.totalLabel, { color: colors.mutedText }]}>Total</Text>
                <Text style={[styles.totalValue, { color: colors.text }]}>
                  {formatCurrency(totalPrice)}
                </Text>
              </View>

              <Pressable
                onPress={handleCheckout}
                style={({ pressed }) => [
                  styles.checkoutBtn,
                  { backgroundColor: colors.primary, opacity: pressed ? 0.85 : 1 },
                ]}
              >
                <Text style={styles.checkoutBtnText}>Checkout</Text>
              </Pressable>
            </View>
          }
          contentContainerStyle={{ paddingBottom: 18 }}
        />
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
  title: {
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 10,
  },
  rowCard: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 4,
  },
  meta: {
    fontSize: 12,
    fontWeight: "700",
  },
  lineTotal: {
    fontSize: 13,
    fontWeight: "900",
  },
  footer: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    marginTop: 6,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  totalLabel: {
    fontSize: 13,
    fontWeight: "800",
  },
  totalValue: {
    fontSize: 15,
    fontWeight: "900",
  },
  checkoutBtn: {
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",
  },
  checkoutBtnText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "900",
  },
});
