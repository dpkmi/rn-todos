import { router } from "expo-router";
import { View, Text, Pressable } from "react-native";

export default function Home() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
      }}
    >
      <Text style={{ fontSize: 22, fontWeight: "600" }}>
        Een overdreven Todo app
      </Text>
      <Pressable
        onPress={() => router.push("/todos")}
        style={{ padding: 12, borderWidth: 1, borderRadius: 8 }}
      >
        <Text>Ga naar Todos</Text>
      </Pressable>
    </View>
  );
}
