import React from "react";
import { FlatList, Pressable, SafeAreaView, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import { useCart } from "../../context/CartContext";
import { useTheme } from "../../context/ThemeContext";
import { formatCurrency } from "../../utils/formatCurrency";
import CartListItem from "../../components/CartListItem";
import { styles } from "./CartScreen.styles";

type Props = NativeStackScreenProps<RootStackParamList, "Cart">;

export default function CartScreen({ navigation }: Props) {
  const { items, increase, decrease, totalItems, totalPrice } = useCart();
  const { colors } = useTheme();

  const isEmpty = items.length === 0;

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      {/* Top row */}
      <View style={styles.topRow}>
        <View>
          <Text style={[styles.title, { color: colors.text }]}>Your Cart</Text>
          <Text style={[styles.subtitle, { color: colors.mutedText }]}>
            Review items before checkout
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        {/* Back button ONLY */}
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
            <Text style={[styles.ghostBtnText, { color: colors.text }]}>Back</Text>
          </Pressable>
        </View>

        {isEmpty ? (
          <View
            style={[
              styles.emptyBox,
              { borderColor: colors.border, backgroundColor: colors.card },
            ]}
          >
            <Text style={[styles.emptyTitle, { color: colors.text }]}>
              Cart is empty
            </Text>
            <Text style={[styles.emptySub, { color: colors.mutedText }]}>
              Add items from the home screen to start your order.
            </Text>
          </View>
        ) : (
          <>
            <FlatList
              data={items}
              keyExtractor={(x) => x.product.id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <CartListItem
                  item={item}
                  onPlus={() => increase(item.product.id)}
                  onMinus={() => decrease(item.product.id)}
                />
              )}
              contentContainerStyle={{ paddingBottom: 10 }}
            />

            <View
              style={[
                styles.summary,
                { borderColor: colors.border, backgroundColor: colors.card },
              ]}
            >
              <View style={styles.summaryRow}>
                <Text
                  style={[styles.summaryLabel, { color: colors.mutedText }]}
                >
                  Items
                </Text>
                <Text style={[styles.summaryValue, { color: colors.text }]}>
                  {totalItems}
                </Text>
              </View>

              <View style={styles.summaryRow}>
                <Text
                  style={[styles.summaryLabel, { color: colors.mutedText }]}
                >
                  Total
                </Text>
                <Text style={[styles.summaryValue, { color: colors.text }]}>
                  {formatCurrency(totalPrice)}
                </Text>
              </View>

              <Pressable
                onPress={() => navigation.navigate("Checkout")}
                style={({ pressed }) => [
                  styles.primaryBtn,
                  {
                    backgroundColor: colors.primary,
                    opacity: pressed ? 0.85 : 1,
                  },
                ]}
              >
                <Text style={styles.primaryBtnText}>
                  Proceed to Checkout
                </Text>
              </Pressable>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
