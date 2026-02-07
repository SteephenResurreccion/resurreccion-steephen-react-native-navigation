import React, { memo } from "react";
import { Pressable, Text, View } from "react-native";
import { CartItem } from "../../types";
import { useTheme } from "../../context/ThemeContext";
import { formatCurrency } from "../../utils/formatCurrency";
import { styles } from "./CartListItem.styles";

type Props = {
  item: CartItem;
  onPlus: () => void;
  onMinus: () => void;
};

function CartListItem({ item, onPlus, onMinus }: Props) {
  const { colors } = useTheme();

  const lineTotal = item.product.price * item.quantity;

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={styles.left}>
        <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>
          {item.product.name}
        </Text>
        <Text style={[styles.meta, { color: colors.mutedText }]}>
          {formatCurrency(item.product.price)} each
        </Text>
        <Text style={[styles.itemTotal, { color: colors.text }]}>
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

export default memo(CartListItem);
