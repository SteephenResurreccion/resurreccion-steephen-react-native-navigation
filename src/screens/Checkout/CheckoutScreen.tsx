import React from "react";
import {
  Alert,
  FlatList,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../types";
import { useCart } from "../../context/CartContext";
import { useTheme } from "../../context/ThemeContext";
import { formatCurrency } from "../../utils/formatCurrency";
import { styles } from "./CheckoutScreen.styles";

type Props = NativeStackScreenProps<RootStackParamList, "Checkout">;

export default function CheckoutScreen({ navigation }: Props) {
  const { items, totalPrice, clear } = useCart();
  const { colors } = useTheme();

  const handleCheckout = () => {
    Alert.alert("Success", "Checkout successful", [
      {
        text: "OK",
        onPress: () => {
          clear();
          navigation.reset({ index: 0, routes: [{ name: "Home" }] });
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.topRow}>
        <Text style={[styles.title, { color: colors.text }]}>Checkout</Text>
        <Text style={[styles.subtitle, { color: colors.mutedText }]}>
          Confirm your order details
        </Text>
      </View>

      {/* Scrollable content */}
      <FlatList
        contentContainerStyle={styles.content}
        data={items}
        keyExtractor={(x) => x.product.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.navRow}>
            <Pressable
              onPress={() => navigation.goBack()}
              style={({ pressed }) => [
                styles.ghostBtn,
                {
                  borderColor: colors.border,
                  backgroundColor: colors.card,
                  opacity: pressed ? 0.9 : 1,
                },
              ]}
            >
              <Text style={[styles.ghostBtnText, { color: colors.text }]}>
                Back
              </Text>
            </Pressable>
          </View>
        }
        renderItem={({ item }) => {
          const lineTotal = item.product.price * item.quantity;

          return (
            <View
              style={[
                styles.rowCard,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
            >
              <View style={{ flex: 1, paddingRight: 12 }}>
                <Text
                  style={[styles.name, { color: colors.text }]}
                  numberOfLines={1}
                >
                  {item.product.name}
                </Text>
                <Text style={[styles.meta, { color: colors.mutedText }]}>
                  Qty: {item.quantity} •{" "}
                  {formatCurrency(item.product.price)} each
                </Text>
              </View>
              <Text style={[styles.lineTotal, { color: colors.text }]}>
                {formatCurrency(lineTotal)}
              </Text>
            </View>
          );
        }}
      />

      {/* 🔒 Fixed Checkout Bar */}
      <View
        style={[
          styles.bottomBar,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        <View style={styles.totalRow}>
          <Text style={[styles.totalLabel, { color: colors.mutedText }]}>
            Total
          </Text>
          <Text style={[styles.totalValue, { color: colors.text }]}>
            {formatCurrency(totalPrice)}
          </Text>
        </View>

        <Pressable
          onPress={handleCheckout}
          style={({ pressed }) => [
            styles.primaryBtn,
            {
              backgroundColor: colors.primary,
              opacity: pressed ? 0.85 : 1,
            },
          ]}
        >
          <Text style={styles.primaryBtnText}>Checkout</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
