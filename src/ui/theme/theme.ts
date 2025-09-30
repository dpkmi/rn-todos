import { useColorScheme } from "react-native";
import { palette, radius, spacing, type } from "./tokens";

export function useTheme() {
  // "light" | "dark"
  const scheme = useColorScheme();

  const dark = scheme === "dark";

  return {
    dark,
    colors: {
      bg: dark ? palette.bgDark : palette.bg,
      primary: dark ? palette.primaryDark : palette.primary,
      onPrimary: dark ? palette.onPrimaryDark : palette.onPrimary,
      card: dark ? palette.cardDark : palette.card,
      text: dark ? palette.textDark : palette.text,
      subtle: dark ? palette.subtleDark : palette.subtle,
      border: dark ? palette.borderDark : palette.border,
      brand: palette.brand,
      brandAlt: palette.brandAlt,
      danger: palette.danger,
      success: palette.success,
      warn: palette.warn,
    },
    radius,
    spacing,
    type,
    shadow: {
      card: {
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 6 },
        elevation: 4,
      },
    },
  };
}
