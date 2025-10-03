import { View, type ViewProps } from "react-native";
import { useTheme } from "@/ui/theme/theme";

export function Card({ style, ...p }: ViewProps) {
  const t = useTheme();

  return (
    <View
      {...p}
      style={[
        {
          backgroundColor: t.colors.card,
          borderRadius: t.radius.md,
          borderWidth: 1,
          borderColor: t.colors.border,
        },
        t.shadow.card,
        style,
      ]}
    />
  );
}
