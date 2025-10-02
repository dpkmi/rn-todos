import { View, Text, TextInput, Pressable } from "react-native";
import { memo } from "react";
import { Field } from "@/ui/Field";
import { Input } from "@/ui/Input";
import { Button } from "@/ui/Button";
import { Card } from "@/ui/Card";
import { useTheme } from "@/ui/theme/theme";
import { DateField } from "@/ui/DateField";
import { formatInputDateTime } from "@/utils/format";
import { useTranslation } from "react-i18next";

type Props = {
  fields: {
    title: string;
    description: string;
    dueRaw: string;
    location: string;
  };
  errors: Partial<Record<keyof Props["fields"], string>>;
  setField: <K extends keyof Props["fields"]>(
    k: K,
    v: Props["fields"][K]
  ) => void;
  onSubmit: () => void;
  onCancel: () => void;
  showDelete?: boolean;
  onDelete?: () => void;
  extraBelowDate?: React.ReactNode;
};

export const TodoForm = memo((p: Props) => {
  const t = useTheme();
  const { t: tr } = useTranslation();

  return (
    <View
      style={{
        flex: 1,
        padding: t.spacing.lg,
        gap: t.spacing.md,
        backgroundColor: t.colors.bg,
      }}
    >
      <Text
        style={{ fontSize: t.type.h1, fontWeight: "600", color: t.colors.text }}
      >
        {tr("addTodo")}
      </Text>

      <Card style={{ padding: t.spacing.lg, gap: t.spacing.md }}>
        <Field label={tr("form.title")} error={p.errors.title}>
          <Input
            value={p.fields.title}
            onChangeText={(v) => p.setField("title", v)}
            placeholder={tr("form.titlePlaceholder")}
          />
        </Field>

        <Field label={tr("form.description")}>
          <Input
            value={p.fields.description}
            onChangeText={(v) => p.setField("description", v)}
            placeholder="Extra details…"
            multiline
            style={{ minHeight: 80, textAlignVertical: "top" }}
          />
        </Field>

        <DateField
          valueText={p.fields.dueRaw || tr("form.datePlaceholder")}
          hasError={!!p.errors.dueRaw}
          onPick={(date) => p.setField("dueRaw", formatInputDateTime(date))}
        />
        {p.errors.dueRaw ? null : p.extraBelowDate ?? null}

        <Field label={tr("form.location")}>
          <Input
            value={p.fields.location}
            onChangeText={(v) => p.setField("location", v)}
            placeholder={tr("form.locationPlaceholder")}
          />
        </Field>

        <View
          style={{
            flexDirection: "row",
            gap: t.spacing.md,
            marginTop: t.spacing.sm,
          }}
        >
          <Button
            title={tr("form.save")}
            onPress={p.onSubmit}
            style={{ flex: 1 }}
          />
          <Button
            title={tr("form.cancel")}
            variant="outline"
            onPress={p.onCancel}
          />
          {p.showDelete ? (
            <Button
              title={tr("form.delete")}
              variant="outline"
              onPress={p.onDelete ?? (() => {})}
              style={{ borderColor: t.colors.danger }}
            />
          ) : null}
        </View>
      </Card>
    </View>
  );
});
