import { View, Pressable, Text } from "react-native";
import { useLocale } from "./useLocale";
import { useTheme } from "@/ui/theme/theme";
import { Button } from "@/ui/Button";

export function LanguageToggle() {
  const t = useTheme();
  const locale = useLocale((s) => s.locale);
  const setLocale = useLocale((s) => s.setLocale);

  return (
    <View style={{ flexDirection: "row", gap: t.spacing.sm }}>
      <Button
        title="NL"
        variant={locale === "nl" ? "primary" : "ghost"}
        onPress={() => setLocale("nl")}
      />
      <Button
        title="EN"
        variant={locale === "en" ? "primary" : "ghost"}
        onPress={() => setLocale("en")}
      />
    </View>
  );
}
