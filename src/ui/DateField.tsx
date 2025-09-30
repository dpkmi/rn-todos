import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useTheme } from "./theme/theme";

type Props = {
  label?: string;
  valueText?: string;
  onPick: (date: Date) => void;
  hasError?: boolean;
};

export function DateField({ label, valueText, onPick, hasError }: Props) {
  const t = useTheme();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  return (
    <View style={{ gap: t.spacing.sm }}>
      <Text style={{ fontWeight: "600" }}>{label}</Text>
      <Pressable
        onPress={() => setDatePickerVisibility(true)}
        style={{
          borderWidth: 1,
          borderColor: hasError ? "red" : "gray",
          padding: t.spacing.sm,
          borderRadius: t.radius.md,
        }}
      >
        <Text>{valueText}</Text>
      </Pressable>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={(date) => {
          setDatePickerVisibility(false);
          onPick(date);
        }}
        onCancel={() => setDatePickerVisibility(false)}
      />
    </View>
  );
}
