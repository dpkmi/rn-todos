import "react-native-reanimated";
import "react-native-get-random-values";
import { Slot } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "@/ui/theme/theme";
import { View } from "react-native";

export default function RootLayout() {
  const t = useTheme();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          backgroundColor: t.colors.bg,
          marginTop: t.spacing.xl,
        }}
      >
        <Slot />
      </View>
      <StatusBar style={t.dark ? "light" : "dark"} />
    </GestureHandlerRootView>
  );
}
