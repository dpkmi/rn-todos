import { Button } from "@/ui/Button";
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
      <Button title="Ga naar overzicht" onPress={() => router.push("/todos")} />
    </View>
  );
}
