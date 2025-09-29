import { View, Text, TextInput, Pressable } from "react-native";
import { memo } from "react";
import { Field } from "@/ui/Field";
import { Input } from "@/ui/Input";
import { Button } from "@/ui/Button";
import { Card } from "@/ui/Card";
import { useTheme } from "@/ui/theme/theme";

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
        Todo
      </Text>

      <Card style={{ padding: t.spacing.lg, gap: t.spacing.md }}>
        <Field label="Title *" error={p.errors.title}>
          <Input
            value={p.fields.title}
            onChangeText={(v) => p.setField("title", v)}
            placeholder="Vul een titel in"
          />
        </Field>

        <Field label="Beschrijving">
          <Input
            value={p.fields.description}
            onChangeText={(v) => p.setField("description", v)}
            placeholder="Extra details…"
            multiline
            style={{ minHeight: 80, textAlignVertical: "top" }}
          />
        </Field>

        <Field
          label="Agenda / Datum (bv. 2025-12-31 09:00)"
          error={p.errors.dueRaw}
        >
          <Input
            value={p.fields.dueRaw}
            onChangeText={(v) => p.setField("dueRaw", v)}
            placeholder="YYYY-MM-DD of YYYY-MM-DD HH:mm"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="numbers-and-punctuation"
          />
          {p.errors.dueRaw ? null : p.extraBelowDate ?? null}
        </Field>

        <Field label="Locatie">
          <Input
            value={p.fields.location}
            onChangeText={(v) => p.setField("location", v)}
            placeholder="Adres of plek…"
          />
        </Field>

        <View
          style={{
            flexDirection: "row",
            gap: t.spacing.md,
            marginTop: t.spacing.sm,
          }}
        >
          <Button title="Opslaan" onPress={p.onSubmit} style={{ flex: 1 }} />
          <Button title="Annuleer" variant="outline" onPress={p.onCancel} />
          {p.showDelete ? (
            <Button
              title="Verwijder"
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
