import { useEffect } from "react";
import { ScrollView, Alert, Text } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTodoForm } from "@features/todos/state/useTodoForm";
import { TodoForm } from "@features/todos/components/todoForm";
import { useTodos } from "@features/todos/state/useTodos";
import { formatDate } from "@/utils/date";

export default function EditTodo() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { initEdit, reset, fields, errors, setField, submit, remove } =
    useTodoForm();
  const existing = useTodos((s) => (id ? s.items[id] : undefined));

  useEffect(() => {
    if (!id) return;
    const ok = initEdit(id);
    if (!ok)
      Alert.alert("Niet gevonden", "Dit item bestaat niet meer.", [
        { text: "OK", onPress: () => router.back() },
      ]);
    return () => reset();
  }, [id, initEdit, reset, router]);

  const onSubmit = () => {
    const ok = submit();
    if (ok) router.back();
    else
      Alert.alert(
        "Formulier onvolledig",
        Object.values(errors).filter(Boolean).join("\n")
      );
  };

  const onDelete = () => {
    const ok = remove();
    if (ok) router.back();
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <TodoForm
        fields={fields}
        errors={errors}
        setField={setField}
        onSubmit={onSubmit}
        onCancel={() => router.back()}
        showDelete
        onDelete={onDelete}
        extraBelowDate={
          existing?.dueAt ? (
            <Text style={{ opacity: 0.6 }}>
              Huidig: {formatDate(existing.dueAt)}
            </Text>
          ) : null
        }
      />
    </ScrollView>
  );
}
