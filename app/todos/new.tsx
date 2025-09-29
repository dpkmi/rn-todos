import { useEffect } from "react";
import { ScrollView, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useTodoForm } from "@features/todos/state/useTodoForm";
import { TodoForm } from "@features/todos/components/todoForm";

export default function NewTodo() {
  const router = useRouter();
  const { initCreate, fields, errors, setField, submit, reset } = useTodoForm();

  useEffect(() => {
    initCreate();
    return () => reset();
  }, [initCreate, reset]);

  const onSubmit = () => {
    const ok = submit();
    if (ok) router.back();
    else
      Alert.alert(
        "Formulier onvolledig",
        Object.values(errors).filter(Boolean).join("\n")
      );
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <TodoForm
        fields={fields}
        errors={errors}
        setField={setField}
        onSubmit={onSubmit}
        onCancel={() => router.back()}
      />
    </ScrollView>
  );
}
