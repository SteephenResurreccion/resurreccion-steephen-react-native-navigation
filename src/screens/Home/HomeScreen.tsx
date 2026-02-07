import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Pressable,
  SectionList,
  SectionListData,
  ViewToken,
  ScrollView,
  Switch,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList, Product } from "../../types";
import { PRODUCTS, ProductCategory } from "../../data/products";
import ProductListItem from "../../components/ProductListItem";
import { useCart } from "../../context/CartContext";
import { useTheme } from "../../context/ThemeContext";
import { formatCurrency } from "../../utils/formatCurrency";

import { styles } from "./HomeScreen.styles";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

type CatalogSection = {
  title: ProductCategory;
  data: Product[];
};

const CATEGORY_ORDER: ProductCategory[] = ["Desserts", "Drinks", "Light Meals"];
const APPROX_TAB_WIDTH = 120;

export default function HomeScreen({ navigation }: Props) {
  const { addToCart, totalItems, totalPrice } = useCart();
  const { colors, theme, toggleTheme } = useTheme();

  const listRef = useRef<SectionList<Product>>(null);
  const tabsRef = useRef<ScrollView>(null);

  // This is the single source of truth for active category.
  // Used for: tab highlight + tab auto-scroll + "scroll to section" taps.
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const sections = useMemo<CatalogSection[]>(() => {
    return CATEGORY_ORDER.map((cat) => ({
      title: cat,
      data: PRODUCTS.filter((p) => p.category === cat),
    }));
  }, []);

  const handleAdd = useCallback(
    (productId: string) => {
      const product = PRODUCTS.find((p) => p.id === productId);
      if (product) addToCart(product);
    },
    [addToCart]
  );

  /**
   * Scroll to a category section when user taps a tab.
   */
  const scrollToCategory = useCallback((index: number) => {
    if (index < 0 || index >= CATEGORY_ORDER.length) return;

    setActiveIndex(index);

    listRef.current?.scrollToLocation({
      sectionIndex: index,
      itemIndex: 0,
      animated: true,
      viewPosition: 0,
    });

    tabsRef.current?.scrollTo({
      x: Math.max(0, index * APPROX_TAB_WIDTH - APPROX_TAB_WIDTH),
      animated: true,
    });
  }, []);

  /**
   * Sync active tab while scrolling the list.
   * IMPORTANT FIX:
   * - Ignore section headers.
   * - Only use the first real visible ITEM (v.item != null).
   */
  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: Array<ViewToken> }) => {
      const firstRealItem = viewableItems.find((v) => v.item != null);
      if (!firstRealItem?.section) return;

      const section = firstRealItem.section as SectionListData<Product, CatalogSection>;
      const idx = CATEGORY_ORDER.indexOf(section.title);

      if (idx < 0) return;

      setActiveIndex((current) => {
        if (current === idx) return current;

        tabsRef.current?.scrollTo({
          x: Math.max(0, idx * APPROX_TAB_WIDTH - APPROX_TAB_WIDTH),
          animated: true,
        });

        return idx;
      });
    }
  ).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 45, // slightly stricter = less jumpy
    minimumViewTime: 80,
  }).current;

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      {/* Top row */}
      <View style={styles.topRow}>
        <View>
          <Text style={[styles.brand, { color: colors.text }]}>Light & Sweet.</Text>
          <Text style={[styles.sub, { color: colors.mutedText }]}>
            Sweet picks for today 🍰
          </Text>
        </View>

        {/* Theme switch at top-right */}
        <View style={styles.switchWrap}>
          <Text style={[styles.switchLabel, { color: colors.mutedText }]}>
            {theme === "dark" ? "Dark" : "Light"}
          </Text>
          <Switch
            value={theme === "dark"}
            onValueChange={toggleTheme}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor="#FFFFFF"
          />
        </View>
      </View>

      {/* Tabs */}
      <View style={[styles.tabsWrap, { borderColor: colors.border }]}>
        <ScrollView
          ref={tabsRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsContent}
        >
          {CATEGORY_ORDER.map((cat, idx) => {
            const isActiveOrBefore = idx == activeIndex;

            return (
              <Pressable
                key={cat}
                onPress={() => scrollToCategory(idx)}
                style={({ pressed }) => [
                  styles.tab,
                  {
                    backgroundColor: isActiveOrBefore ? colors.primary : colors.card,
                    borderColor: isActiveOrBefore ? colors.primary : colors.border,
                    opacity: pressed ? 0.9 : 1,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.tabText,
                    { color: isActiveOrBefore ? "#FFFFFF" : colors.text },
                  ]}
                >
                  {cat}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {/* List */}
      <SectionList
        ref={listRef}
        sections={sections}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              {section.title}
            </Text>
          </View>
        )}
        renderItem={({ item }) => (
          <ProductListItem product={item} onAdd={() => handleAdd(item.id)} />
        )}
        ListFooterComponent={<View style={{ height: 120 }} />}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        onScrollToIndexFailed={() => {
          // RN sometimes fails scrollToLocation on first render.
          // Do nothing; user can tap again and it will work once measured.
        }}
      />

      {/* Bottom cart bar */}
      <View style={[styles.bottomBar, { borderColor: colors.border, backgroundColor: colors.card }]}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.bottomTitle, { color: colors.text }]}>
            {totalItems > 0 ? `${totalItems} item(s) in cart` : "Cart is empty"}
          </Text>
          <Text style={[styles.bottomSub, { color: colors.mutedText }]}>
            Total: {formatCurrency(totalPrice)}
          </Text>
        </View>

        <Pressable
          onPress={() => navigation.navigate("Cart")}
          disabled={totalItems === 0}
          style={({ pressed }) => [
            styles.goCartBtn,
            {
              backgroundColor: totalItems === 0 ? colors.border : colors.primary,
              opacity: pressed ? 0.85 : 1,
            },
          ]}
        >
          <Text style={styles.goCartBtnText}>Go to Cart</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
