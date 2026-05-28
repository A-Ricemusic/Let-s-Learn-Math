import { StatusBar } from "expo-status-bar";
import { SafeAreaView, Text, View } from "react-native";
import { styles } from "../styles/styles";

export function SetupScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <Text style={styles.title}>Clerk setup needed</Text>
        <Text style={styles.body}>
          Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY and EXPO_PUBLIC_CONVEX_URL to
          your .env file, then restart Expo.
        </Text>
      </View>
    </SafeAreaView>
  );
}
