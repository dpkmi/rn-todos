import { View, Text } from "react-native";
import { useTheme } from "@/ui/theme/theme";

export function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  const t = useTheme();
  return (
    <View style={{ gap: 6 }}>
      <Text style={{ fontWeight: "600", color: t.colors.text }}>{label}</Text>
      {children}
      {error ? <Text style={{ color: t.colors.danger }}>{error}</Text> : null}
    </View>
  );
}
