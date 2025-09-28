import { View, Text, FlatList, Pressable } from "react-native";
import { useMemo } from "react";
import { useTodos } from "@features/todos/state/useTodos";
import { useRouter } from "expo-router";
import { TodoRow } from "@/features/todos/components/todoRow";
// import { formatDate } from "@/utils/date";

export default function TodosScreen() {
  const router = useRouter();
  const items = useTodos((s) => s.items);

  const addTodo = useTodos((s) => s.addTodo);
  const toggleTodo = useTodos((s) => s.toggleTodo);
  const removeTodo = useTodos((s) => s.removeTodo);

  const data = useMemo(
    () => Object.values(items).sort((a, b) => b.createdAt - a.createdAt),
    [items]
  );

  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: "600" }}>📝 Todos</Text>
        <Pressable
          onPress={() => router.push("/todos/new")}
          style={{
            paddingVertical: 8,
            paddingHorizontal: 12,
            borderWidth: 1,
            borderRadius: 8,
          }}
        >
          <Text>+ Nieuw</Text>
        </Pressable>
      </View>

      <FlatList
        data={data}
        keyExtractor={(t) => t.id}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item }) => (
          <TodoRow
            item={item}
            onToggle={toggleTodo}
            onDelete={removeTodo}
            onOpen={(id) => router.push(`/todos/${id}`)}
          ></TodoRow>
        )}
      />
    </View>
  );
}
