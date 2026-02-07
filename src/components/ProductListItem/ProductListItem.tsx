import React, { memo } from "react";
import { Pressable, Text, View } from "react-native";
import { Product } from "../../types";
import { useTheme } from "../../context/ThemeContext";
import { formatCurrency } from "../../utils/formatCurrency";
import { styles } from "./ProductListItem.styles";

type Props = {
  product: Product;
  onAdd: () => void;
};

function ProductListItem({ product, onAdd }: Props) {
  const { colors } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={styles.left}>
        <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>
          {product.name}
        </Text>
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

export default memo(ProductListItem);
