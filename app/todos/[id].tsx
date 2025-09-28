// import { useLocalSearchParams, useRouter } from "expo-router";
// import { View, Text, TextInput, Pressable, Alert } from "react-native";
// import { useEffect, useState } from "react";
// import { useTodos } from "@features/todos/state/useTodos";
// import { formatDate, parseDateToMs } from "@/utils/date";

// export default function EditTodoScreen() {
//   const { id } = useLocalSearchParams<{ id: string }>();
//   const router = useRouter();
//   const items = useTodos((s) => s.items);
//   const updateTodo = useTodos((s) => s.updateTodo);
//   const removeTodo = useTodos((s) => s.removeTodo);

//   const todo = id ? items[id] : undefined;
//   const [title, setTitle] = useState(todo?.title ?? "");
//   const [description, setDescription] = useState(todo?.description ?? "");
//   const [dueRaw, setDueRaw] = useState(
//     todo?.dueAt
//       ? new Date(todo.dueAt).toISOString().slice(0, 16).replace("T", " ")
//       : ""
//   );
//   const [location, setLocation] = useState(todo?.location ?? "");

//   useEffect(() => {
//     if (!todo) {
//       Alert.alert("Niet gevonden", "Dit item bestaat niet meer.", [
//         { text: "OK", onPress: () => router.back() },
//       ]);
//     }
//   }, [todo, router]);

//   if (!todo) return null;

//   const onSave = () => {
//     if (!title.trim()) {
//       Alert.alert("Titel is verplicht");
//       return;
//     }
//     const dueAt = dueRaw.trim() ? parseDateToMs(dueRaw) : undefined;
//     if (dueRaw.trim() && !dueAt) {
//       Alert.alert("Ongeldige datum (bv. 2025-12-31 09:00)");
//       return;
//     }
//     updateTodo(todo.id, {
//       title: title.trim(),
//       description: description.trim() || undefined,
//       dueAt,
//       location: location.trim() || undefined,
//     });
//     router.back();
//   };

//   const onDelete = () =>
//     Alert.alert("Verwijderen", `“${todo.title}” verwijderen?`, [
//       { text: "Annuleren", style: "cancel" },
//       {
//         text: "Verwijder",
//         style: "destructive",
//         onPress: () => {
//           removeTodo(todo.id);
//           router.back();
//         },
//       },
//     ]);

//   return (
//     <View style={{ flex: 1, padding: 16, gap: 12 }}>
//       <Text style={{ fontSize: 22, fontWeight: "600" }}>Wijzig todo</Text>

//       <Text style={{ fontWeight: "600" }}>Titel *</Text>
//       <TextInput
//         value={title}
//         onChangeText={setTitle}
//         style={{ borderWidth: 1, borderRadius: 8, padding: 10 }}
//       />

//       <Text style={{ fontWeight: "600" }}>Beschrijving</Text>
//       <TextInput
//         value={description}
//         onChangeText={setDescription}
//         multiline
//         style={{ borderWidth: 1, borderRadius: 8, padding: 10, minHeight: 80 }}
//       />

//       <Text style={{ fontWeight: "600" }}>Agenda / Datum</Text>
//       <TextInput
//         value={dueRaw}
//         onChangeText={setDueRaw}
//         placeholder="YYYY-MM-DD of YYYY-MM-DD HH:mm"
//         autoCapitalize="none"
//         style={{ borderWidth: 1, borderRadius: 8, padding: 10 }}
//       />
//       {todo.dueAt ? (
//         <Text style={{ opacity: 0.6 }}>Huidig: {formatDate(todo.dueAt)}</Text>
//       ) : null}

//       <Text style={{ fontWeight: "600" }}>Locatie</Text>
//       <TextInput
//         value={location}
//         onChangeText={setLocation}
//         style={{ borderWidth: 1, borderRadius: 8, padding: 10 }}
//       />

//       <View style={{ flexDirection: "row", gap: 12, marginTop: 8 }}>
//         <Pressable
//           onPress={onSave}
//           style={{
//             flex: 1,
//             padding: 12,
//             borderWidth: 1,
//             borderRadius: 8,
//             backgroundColor: "#007AFF",
//           }}
//         >
//           <Text
//             style={{ color: "white", fontWeight: "600", textAlign: "center" }}
//           >
//             Bewaar
//           </Text>
//         </Pressable>
//         <Pressable
//           onPress={onDelete}
//           style={{
//             padding: 12,
//             borderWidth: 1,
//             borderRadius: 8,
//             borderColor: "#E53935",
//           }}
//         >
//           <Text style={{ color: "#E53935", fontWeight: "600" }}>Verwijder</Text>
//         </Pressable>
//       </View>
//     </View>
//   );
// }

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
