import "react-native-reanimated";
import "@/lib/i18n";
import "react-native-get-random-values";

import { Slot } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/ui/theme/theme";
import { LocaleGate } from "@/lib/i18n/LocaleGate";

export default function RootLayout() {
  const t = useTheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <LocaleGate>
        <SafeAreaView style={{ flex: 1, backgroundColor: t.colors.bg }}>
          <Slot />
        </SafeAreaView>
        <StatusBar style={t.dark ? "light" : "dark"} />
      </LocaleGate>
    </GestureHandlerRootView>
  );
}
