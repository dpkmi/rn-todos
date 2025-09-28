// import { Text, View, TextInput, Pressable, Alert } from "react-native";
// import { useRouter } from "expo-router";
// import { useNewTodoForm } from "@/features/todos/state/useNewTodoForm";

// export default function NewTodo() {
//   const router = useRouter();
//   const { fields, errors, setField, submit } = useNewTodoForm();

//   const onSave = () => {
//     const res = submit();
//     if (res.ok) router.back();
//     else
//       Alert.alert(
//         "Formulier onvolledig",
//         Object.values(res.errors).filter(Boolean).join("\n")
//       );
//   };

//   return (
//     <View style={{ flex: 1, padding: 16, gap: 12 }}>
//       <Text style={{ fontSize: 22, fontWeight: "600" }}>Nieuw item</Text>
//       <Text style={{ fontWeight: "600" }}>Titel *</Text>
//       <TextInput
//         value={fields.title}
//         onChangeText={(t) => setField("title", t)}
//         style={{
//           borderWidth: 1,
//           borderColor: errors.title ? "red" : "#ccc",
//           padding: 8,
//           borderRadius: 8,
//         }}
//         placeholder="Vul een titel in"
//       />
//       {errors.title ? (
//         <Text style={{ color: "red" }}>{errors.title}</Text>
//       ) : null}

//       <Text style={{ fontWeight: "600" }}>Beschrijving</Text>
//       <TextInput
//         value={fields.description}
//         onChangeText={(t) => setField("description", t)}
//         style={{
//           borderWidth: 1,
//           borderColor: "#ccc",
//           padding: 8,
//           borderRadius: 8,
//           height: 100,
//         }}
//         placeholder="Vul een beschrijving in"
//         multiline
//       />

//       <Text style={{ fontWeight: "600" }}>Agenda</Text>
//       <TextInput
//         value={fields.dueRaw}
//         onChangeText={(t) => setField("dueRaw", t)}
//         placeholder="YYYY-MM-DD"
//         autoCapitalize="none"
//         autoCorrect={false}
//         keyboardType="numbers-and-punctuation"
//       >
//         {errors.dueRaw ? (
//           <Text style={{ color: "red" }}>{errors.dueRaw}</Text>
//         ) : null}
//       </TextInput>
//       <Text style={{ fontWeight: "600" }}>Locatie</Text>
//       <TextInput
//         value={fields.location}
//         onChangeText={(t) => setField("location", t)}
//         placeholder="Vul een locatie in"
//         style={{
//           borderWidth: 1,
//           borderColor: "#ccc",
//           padding: 8,
//           borderRadius: 8,
//         }}
//       />

//       <Pressable
//         onPress={onSave}
//         style={{
//           padding: 12,
//           borderWidth: 1,
//           borderRadius: 8,
//           alignItems: "center",
//           backgroundColor: "#007AFF",
//         }}
//       >
//         <Text style={{ color: "white", fontWeight: "600" }}>Opslaan</Text>
//       </Pressable>
//     </View>
//   );
// }

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
