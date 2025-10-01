import { View, Text, Pressable } from "react-native";
import { useTodos } from "@features/todos/state/useTodos";
import { useRouter } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import { useTheme } from "@/ui/theme/theme";
import { Button } from "@/ui/Button";
import { Card } from "@/ui/Card";
import { TodoFilter } from "@features/todos/components/TodoFilter";
import { useVisibleTodos } from "@/features/todos/state/selector";
import { useTodoView } from "@/features/todos/state/useTodoView";

export default function TodosScreen() {
  const router = useRouter();
  const t = useTheme();

  // domain acties
  const toggleTodo = useTodos((s) => s.toggleTodo);
  const items = useTodos((s) => s.items);

  // view state
  const currentFilter = useTodoView((s) => s.filter);
  const setFilter = useTodoView((s) => s.setFilter);

  // lijst die al filter/sort toepast
  const data = useVisibleTodos();

  // counts in parent berekenen (geen setState)
  const counts = (() => {
    const arr = Object.values(items);
    const completed = arr.filter((x) => x.completed).length;
    return { all: arr.length, active: arr.length - completed, completed };
  })();

  const isAll = currentFilter == "all";
  const isEmpty = data.length === 0;
  const hasAnyTodo = Object.keys(items).length > 0;

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

      <TodoFilter
        current={currentFilter}
        counts={counts}
        onChange={setFilter}
      />

      {isEmpty && isAll ? (
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
                <View
                  style={{
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: t.spacing.md,
                  }}
                >
                  <Text style={{ fontWeight: "600", color: t.colors.text }}>
                    {item.completed ? "✅" : "⬜️"} {item.title}
                  </Text>
                  {item.description ? (
                    <Text
                      style={{
                        color: t.colors.subtle,
                        marginTop: 10,
                      }}
                    >
                      {item.description}
                    </Text>
                  ) : null}
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    flexShrink: 0,
                    maxWidth: 180,
                    gap: t.spacing.md,
                    marginTop: t.spacing.sm,
                  }}
                >
                  {/* date and location */}
                  {item.dueAt ? (
                    <Text style={{ opacity: 0.6, marginTop: 10, fontSize: 12 }}>
                      📅{" "}
                      {new Date(item.dueAt).toLocaleDateString("nl-NL", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </Text>
                  ) : null}
                  {item.location ? (
                    <Text style={{ opacity: 0.6, marginTop: 10, fontSize: 12 }}>
                      📍 {item.location}
                    </Text>
                  ) : null}
                  {/* end date and location */}
                </View>
              </Card>
            </Pressable>
          )}
        />
      )}
    </View>
  );
}
