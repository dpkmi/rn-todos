import { Pressable, Text, type ViewStyle } from "react-native";
import { useTheme } from "@/ui/theme/theme";

type Props = {
  title: string;
  onPress: () => void;
  variant?: "primary" | "outline" | "ghost";
  style?: ViewStyle;
  disabled?: boolean;
};

export function Button({
  title,
  onPress,
  variant = "primary",
  style,
  disabled,
}: Props) {
  const t = useTheme();
  const base = {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: t.radius.md,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row" as const,
  } as const;

  const styles = {
    primary: {
      ...base,
      backgroundColor: t.colors.brand,
      borderColor: t.colors.brand,
    },
    outline: {
      ...base,
      backgroundColor: "transparent",
      borderColor: t.colors.border,
    },
    ghost: {
      ...base,
      borderColor: "transparent",
      paddingVertical: 8,
      paddingHorizontal: 8,
      borderRadius: t.radius.sm,
    },
  } as const;

  const text = {
    primary: { color: "white", fontWeight: "600" as const },
    outline: { color: t.colors.text, fontWeight: "600" as const },
    ghost: { color: t.colors.text, fontWeight: "600" as const },
  } as const;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[styles[variant], disabled && { opacity: 0.5 }, style]}
      android_ripple={{ color: t.colors.brandAlt }}
      hitSlop={8}
    >
      <Text style={text[variant]}>{title}</Text>
    </Pressable>
  );
}
