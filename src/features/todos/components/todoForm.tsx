import { View, Text, TextInput, Pressable } from "react-native";
import { memo } from "react";

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

export const TodoForm = memo((p: Props) => (
  <View style={{ flex: 1, padding: 16, gap: 12 }}>
    <Text style={{ fontSize: 22, fontWeight: "600" }}>Todo</Text>

    <Text style={{ fontWeight: "600" }}>Titel *</Text>
    <TextInput
      value={p.fields.title}
      onChangeText={(v) => p.setField("title", v)}
      placeholder="Vul een titel in"
      style={{
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        borderColor: p.errors.title ? "crimson" : "#ccc",
      }}
    />
    {p.errors.title ? (
      <Text style={{ color: "crimson" }}>{p.errors.title}</Text>
    ) : null}

    <Text style={{ fontWeight: "600" }}>Beschrijving</Text>
    <TextInput
      value={p.fields.description}
      onChangeText={(v) => p.setField("description", v)}
      placeholder="Extra details…"
      multiline
      style={{ borderWidth: 1, borderRadius: 8, padding: 10, minHeight: 80 }}
    />

    <Text style={{ fontWeight: "600" }}>
      Agenda / Datum (bv. 2025-12-31 09:00)
    </Text>
    <TextInput
      value={p.fields.dueRaw}
      onChangeText={(v) => p.setField("dueRaw", v)}
      placeholder="YYYY-MM-DD of YYYY-MM-DD HH:mm"
      autoCapitalize="none"
      autoCorrect={false}
      keyboardType="numbers-and-punctuation"
      style={{
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        borderColor: p.errors.dueRaw ? "crimson" : "#ccc",
      }}
    />
    {p.errors.dueRaw ? (
      <Text style={{ color: "crimson" }}>{p.errors.dueRaw}</Text>
    ) : (
      p.extraBelowDate ?? null
    )}

    <Text style={{ fontWeight: "600" }}>Locatie</Text>
    <TextInput
      value={p.fields.location}
      onChangeText={(v) => p.setField("location", v)}
      placeholder="Adres of plek…"
      style={{ borderWidth: 1, borderRadius: 8, padding: 10 }}
    />

    <View style={{ flexDirection: "row", gap: 12, marginTop: 8 }}>
      <Pressable
        onPress={p.onSubmit}
        style={{
          flex: 1,
          padding: 12,
          borderWidth: 1,
          borderRadius: 8,
          backgroundColor: "#007AFF",
        }}
      >
        <Text
          style={{ color: "white", fontWeight: "600", textAlign: "center" }}
        >
          Opslaan
        </Text>
      </Pressable>
      <Pressable
        onPress={p.onCancel}
        style={{ padding: 12, borderWidth: 1, borderRadius: 8 }}
      >
        <Text style={{ fontWeight: "600" }}>Annuleer</Text>
      </Pressable>
      {p.showDelete ? (
        <Pressable
          onPress={p.onDelete}
          style={{
            padding: 12,
            borderWidth: 1,
            borderRadius: 8,
            borderColor: "#E53935",
          }}
        >
          <Text style={{ color: "#E53935", fontWeight: "600" }}>Verwijder</Text>
        </Pressable>
      ) : null}
    </View>
  </View>
));
