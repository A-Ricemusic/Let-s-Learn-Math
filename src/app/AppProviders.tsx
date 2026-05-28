import { ClerkProvider, SignedIn, SignedOut, useAuth } from "@clerk/clerk-expo";
import { ConvexProviderWithAuth, ConvexReactClient } from "convex/react";
import * as SecureStore from "expo-secure-store";
import { StatusBar } from "expo-status-bar";
import { useCallback, useMemo, useRef } from "react";
import { SafeAreaView } from "react-native";
import { EmailCodeAuth } from "../auth/EmailCodeAuth";
import { SignedInHome } from "../features/home/SignedInHome";
import { styles } from "../styles/styles";
import { SetupScreen } from "./SetupScreen";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
const convexUrl = process.env.EXPO_PUBLIC_CONVEX_URL;
const convex = convexUrl ? new ConvexReactClient(convexUrl) : null;

const tokenCache = {
  async getToken(key: string) {
    return SecureStore.getItemAsync(key);
  },
  async saveToken(key: string, value: string) {
    return SecureStore.setItemAsync(key, value);
  },
};

export function AppProviders() {
  if (!publishableKey || convex === null) {
    return <SetupScreen />;
  }

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ConvexProviderWithAuth client={convex} useAuth={useConvexClerkAuth}>
        <AppContent />
      </ConvexProviderWithAuth>
    </ClerkProvider>
  );
}

function useConvexClerkAuth() {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const getTokenRef = useRef(getToken);
  getTokenRef.current = getToken;

  const fetchAccessToken = useCallback(
    async ({ forceRefreshToken }: { forceRefreshToken: boolean }) => {
      try {
        return await getTokenRef.current({
          template: "convex",
          skipCache: forceRefreshToken,
        });
      } catch {
        return null;
      }
    },
    [],
  );

  return useMemo(
    () => ({
      isLoading: !isLoaded,
      isAuthenticated: isSignedIn ?? false,
      fetchAccessToken,
    }),
    [fetchAccessToken, isLoaded, isSignedIn],
  );
}

function AppContent() {
  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="dark" />
      <SignedIn>
        <SignedInHome />
      </SignedIn>
      <SignedOut>
        <EmailCodeAuth />
      </SignedOut>
    </SafeAreaView>
  );
}
