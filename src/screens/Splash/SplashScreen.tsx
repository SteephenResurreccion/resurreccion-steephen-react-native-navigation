import React, { useEffect } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import { useTheme } from "../../context/ThemeContext";
import { styles } from "./SplashScreen.styles";

type Props = NativeStackScreenProps<RootStackParamList, "Splash">;

export default function SplashScreen({ navigation }: Props) {
  const { colors } = useTheme();

  useEffect(() => {
    const t = setTimeout(() => {
      navigation.reset({ index: 0, routes: [{ name: "Home" }] });
    }, 1200);

    return () => clearTimeout(t);
  }, [navigation]);

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <View style={styles.center}>
        <Text style={[styles.brand, { color: colors.text }]}>Light & Sweet.</Text>
        <Text style={[styles.tagline, { color: colors.mutedText }]}>
          Desserts • Drinks • Light Meals
        </Text>
      </View>
    </SafeAreaView>
  );
}
