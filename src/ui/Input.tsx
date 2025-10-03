import { TextInput, type TextInputProps } from "react-native";
import { useTheme } from "@/ui/theme/theme";

export function Input({ style, ...p }: TextInputProps) {
  const t = useTheme();

  return (
    <TextInput
      {...p}
      style={[
        {
          borderWidth: 1,
          borderColor: t.colors.border,
          borderRadius: t.radius.sm,
          paddingHorizontal: 12,
          paddingVertical: 10,
          color: t.colors.text,
          backgroundColor: t.colors.card,
        },
        style,
      ]}
      placeholderTextColor={t.colors.subtle}
    />
  );
}
