import { memo } from "react";
import { Text, View, Pressable, Alert } from "react-native";
import Swipeable, {
  type SwipeableMethods,
} from "react-native-gesture-handler/ReanimatedSwipeable";
import type { SharedValue } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import type { Todo } from "@features/todos/model/types";

type Props = {
  item: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onOpen?: (id: string) => void;
};

export const TodoRow = memo(({ item, onToggle, onDelete, onOpen }: Props) => {
  const confirmDelete = (methods: SwipeableMethods) =>
    Alert.alert("Verwijderen", `“${item.title}” verwijderen?`, [
      { text: "Annuleren", style: "cancel", onPress: () => methods.close() },
      {
        text: "Verwijder",
        style: "destructive",
        onPress: () => onDelete(item.id),
      },
    ]);

  const renderRightActions = (
    _progress: SharedValue<number>,
    _translation: SharedValue<number>,
    methods: SwipeableMethods
  ) => (
    <Pressable
      onPress={() => confirmDelete(methods)}
      style={{
        width: 88,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#E53935",
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        height: "100%",
      }}
    >
      <Ionicons name="trash" size={24} color="white" />
      <Text style={{ color: "white", marginTop: 4 }}>Delete</Text>
    </Pressable>
  );

  return (
    <Swipeable
      renderRightActions={renderRightActions}
      overshootRight={false}
      friction={2}
      rightThreshold={40}
    >
      <Pressable
        onPress={() => onToggle(item.id)}
        onLongPress={() => onOpen?.(item.id)}
        style={{
          padding: 12,
          borderWidth: 1,
          borderRadius: 10,
          backgroundColor: "white",
          borderColor: "#e5e5e5",
        }}
      >
        <Text style={{ fontWeight: "600" }}>
          {item.completed ? "✅" : "⬜️"} {item.title}
        </Text>
        {item.description ? (
          <Text style={{ opacity: 0.8, marginTop: 4 }}>{item.description}</Text>
        ) : null}
        {item.dueAt ? (
          <Text style={{ opacity: 0.6, marginTop: 4, fontSize: 12 }}>
            📅{" "}
            {new Date(item.dueAt).toLocaleDateString("nl-NL", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </Text>
        ) : null}
      </Pressable>
    </Swipeable>
  );
});
