import { View, Pressable, Text } from "react-native";
import { memo } from "react";
import { useTheme } from "@/ui/theme/theme";
import { useTranslation } from "react-i18next";

type Counts = { all: number; active: number; completed: number };
type Props = {
  current: "all" | "active" | "completed";
  counts: Counts;
  onChange: (v: Props["current"]) => void;
};

export const TodoFilter = memo(({ current, counts, onChange }: Props) => {
  const t = useTheme();
  const { t: tr } = useTranslation();

  const Pill = ({
    value,
    label,
    count,
  }: {
    value: Props["current"];
    label: string;
    count: number;
  }) => {
    const selected = current === value;
    return (
      <Pressable
        onPress={() => onChange(value)}
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          paddingVertical: 10,
          paddingHorizontal: 12,
          borderRadius: 999,
          borderWidth: 1,
          borderColor: selected ? t.colors.primary : t.colors.border,
          backgroundColor: selected ? t.colors.onPrimary : "transparent",
        }}
      >
        <Text
          style={{
            color: selected ? t.colors.text : t.colors.text,
            fontWeight: selected ? "700" : "500",
          }}
        >
          {label}
        </Text>
        <View
          style={{
            minWidth: 24,
            paddingHorizontal: 6,
            height: 20,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: selected ? t.colors.primary : t.colors.border,
          }}
        >
          <Text
            style={{
              color: selected ? t.colors.bg ?? "white" : t.colors.text,
              fontSize: 12,
              fontWeight: "700",
            }}
          >
            {count}
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
      <Pill value="all" label={tr("filters.all")} count={counts.all} />
      <Pill value="active" label={tr("filters.active")} count={counts.active} />
      <Pill
        value="completed"
        label={tr("filters.completed")}
        count={counts.completed}
      />
    </View>
  );
});
