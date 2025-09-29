import { View, Text, FlatList, Pressable } from "react-native";
import { useMemo } from "react";
import { useTodos } from "@features/todos/state/useTodos";
import { useRouter } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import { useTheme } from "@/ui/theme/theme";
import { Button } from "@/ui/Button";
import { Card } from "@/ui/Card";
import { RollInLeft } from "react-native-reanimated";
// import { formatDate } from "@/utils/date";

export default function TodosScreen() {
  const router = useRouter();
  const t = useTheme();
  const items = useTodos((s) => s.items);

  const addTodo = useTodos((s) => s.addTodo);
  const toggleTodo = useTodos((s) => s.toggleTodo);
  const removeTodo = useTodos((s) => s.removeTodo);

  const data = useMemo(
    () => Object.values(items).sort((a, b) => b.createdAt - a.createdAt),
    [items]
  );

  return (
    <View style={{ flex: 1, padding: t.spacing.lg, gap: t.spacing.md }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: t.type.h1,
            fontWeight: "700",
            color: t.colors.text,
          }}
        >
          📝 Todos
        </Text>
        <Button title="+ Nieuw" onPress={() => router.push("/todos/new")} />
      </View>

      {data.length === 0 ? (
        <Card style={{ padding: t.spacing.lg, alignItems: "center", gap: 8 }}>
          <Text
            style={{
              fontSize: t.type.h2,
              color: t.colors.text,
              fontWeight: "600",
            }}
          >
            Nog geen taken
          </Text>
          <Text style={{ color: t.colors.subtle, textAlign: "center" }}>
            Voeg je eerste taak toe om te beginnen.
          </Text>
          <Button
            title="+ Nieuwe taak"
            onPress={() => router.push("/todos/new")}
          />
        </Card>
      ) : (
        <FlashList
          data={data}
          keyExtractor={(it) => it.id}
          ItemSeparatorComponent={() => (
            <View style={{ height: t.spacing.sm }} />
          )}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => toggleTodo(item.id)}
              onLongPress={() =>
                router.push({
                  pathname: "/todos/[id]",
                  params: { id: item.id },
                })
              }
            >
              <Card style={{ padding: t.spacing.md }}>
                <Text style={{ fontWeight: "600", color: t.colors.text }}>
                  {item.completed ? "✅" : "⬜️"} {item.title}
                </Text>
                {item.description ? (
                  <Text style={{ color: t.colors.subtle, marginTop: 4 }}>
                    {item.description}
                  </Text>
                ) : null}
              </Card>
            </Pressable>
          )}
        />
      )}
    </View>
  );
}
