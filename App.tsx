import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  useAuth,
  useSignIn,
  useSignUp,
  useUser,
} from "@clerk/clerk-expo";
import {
  ConvexProviderWithAuth,
  ConvexReactClient,
  useConvexAuth,
  useMutation,
  useQuery,
} from "convex/react";
import * as SecureStore from "expo-secure-store";
import { StatusBar } from "expo-status-bar";
import { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { api } from "./convex/_generated/api";

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

type AuthStep = "intro" | "email" | "code";
type PendingFlow = "signIn" | "signUp";
type AuthMode = "signIn" | "signUp";

export default function App() {
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
  const fetchAccessToken = useCallback(
    async ({ forceRefreshToken }: { forceRefreshToken: boolean }) => {
      try {
        return await getToken({
          template: "convex",
          skipCache: forceRefreshToken,
        });
      } catch {
        return null;
      }
    },
    [getToken],
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

function SetupScreen() {
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

function EmailCodeAuth() {
  const { isLoaded: isSignInLoaded, signIn, setActive } = useSignIn();
  const { isLoaded: isSignUpLoaded, signUp } = useSignUp();
  const [step, setStep] = useState<AuthStep>("intro");
  const [authMode, setAuthMode] = useState<AuthMode>("signIn");
  const [pendingFlow, setPendingFlow] = useState<PendingFlow | null>(null);
  const [emailAddress, setEmailAddress] = useState("");
  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isLoaded = isSignInLoaded && isSignUpLoaded;

  const handleEmailSubmit = async () => {
    const trimmedEmail = emailAddress.trim();

    if (!trimmedEmail) {
      setErrorMessage("Enter your email address.");
      return;
    }

    if (!isLoaded || !signIn || !signUp) {
      setErrorMessage("Clerk is still loading. Please try again.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    if (authMode === "signIn") {
      try {
        await signIn.create({
          identifier: trimmedEmail,
          strategy: "email_code",
        });
        setPendingFlow("signIn");
        setStep("code");
        setIsSubmitting(false);
        return;
      } catch (error) {
        setErrorMessage(getErrorMessage(error));
        setIsSubmitting(false);
        return;
      }
    }

    try {
      await signUp.create({
        emailAddress: trimmedEmail,
      });
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });
      setPendingFlow("signUp");
      setStep("code");
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCodeSubmit = async () => {
    const trimmedCode = code.trim();

    if (!trimmedCode) {
      setErrorMessage("Enter the code from your email.");
      return;
    }

    if (!isLoaded || !signIn || !signUp || !setActive || !pendingFlow) {
      setErrorMessage("The sign-in flow is not ready. Please start again.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      if (pendingFlow === "signIn") {
        const result = await signIn.attemptFirstFactor({
          strategy: "email_code",
          code: trimmedCode,
        });

        if (result.status === "complete" && result.createdSessionId) {
          await setActive({ session: result.createdSessionId });
          return;
        }
      } else {
        const result = await signUp.attemptEmailAddressVerification({
          code: trimmedCode,
        });

        if (result.status === "complete" && result.createdSessionId) {
          await setActive({ session: result.createdSessionId });
          return;
        }
      }

      setErrorMessage(
        "Additional verification is required. We will support that flow later.",
      );
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const goBackToEmail = () => {
    setStep("email");
    setCode("");
    setPendingFlow(null);
    setErrorMessage(null);
  };

  const startAuthFlow = (mode: AuthMode) => {
    setAuthMode(mode);
    setStep("email");
    setCode("");
    setPendingFlow(null);
    setErrorMessage(null);
  };

  if (!isLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <Text style={styles.body}>Loading authentication...</Text>
      </View>
    );
  }

  if (step === "intro") {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Let's Learn Math</Text>
        <Text style={styles.body}>
          Use your email to continue without a password.
        </Text>
        <Pressable
          style={styles.primaryButton}
          onPress={() => startAuthFlow("signIn")}
        >
          <Text style={styles.primaryButtonText}>Sign in</Text>
        </Pressable>
        <Pressable
          style={styles.secondaryButton}
          onPress={() => startAuthFlow("signUp")}
        >
          <Text style={styles.secondaryButtonText}>Sign up</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {step === "email"
          ? authMode === "signIn"
            ? "Sign in"
            : "Create your account"
          : "Check your email"}
      </Text>
      <Text style={styles.body}>
        {step === "email"
          ? "We will send you a one-time code."
          : `Enter the code sent to ${emailAddress.trim()}.`}
      </Text>

      {step === "email" ? (
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          editable={!isSubmitting}
          keyboardType="email-address"
          onChangeText={setEmailAddress}
          placeholder="you@example.com"
          style={styles.input}
          textContentType="emailAddress"
          value={emailAddress}
        />
      ) : (
        <TextInput
          autoCapitalize="none"
          editable={!isSubmitting}
          keyboardType="number-pad"
          onChangeText={setCode}
          placeholder="123456"
          style={styles.input}
          textContentType="oneTimeCode"
          value={code}
        />
      )}

      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

      <Pressable
        disabled={isSubmitting}
        style={[styles.primaryButton, isSubmitting && styles.disabledButton]}
        onPress={step === "email" ? handleEmailSubmit : handleCodeSubmit}
      >
        <Text style={styles.primaryButtonText}>
          {isSubmitting ? "Please wait..." : "Continue"}
        </Text>
      </Pressable>

      {step === "email" ? (
        <Pressable
          disabled={isSubmitting}
          style={styles.textButton}
          onPress={() => setStep("intro")}
        >
          <Text style={styles.textButtonText}>Back</Text>
        </Pressable>
      ) : null}

      {step === "code" ? (
        <Pressable
          disabled={isSubmitting}
          style={styles.textButton}
          onPress={goBackToEmail}
        >
          <Text style={styles.textButtonText}>Use a different email</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

function SignedInHome() {
  const { signOut } = useAuth();
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { user } = useUser();
  const syncCheck = useQuery(api.sync.current, isAuthenticated ? {} : "skip");
  const ping = useMutation(api.sync.ping);
  const primaryEmail =
    user?.primaryEmailAddress?.emailAddress ?? "your account";
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);

  const handleSync = async () => {
    if (!isAuthenticated || isSyncing) {
      return;
    }

    setIsSyncing(true);
    setSyncError(null);

    try {
      await ping({});
    } catch (error) {
      setSyncError(getErrorMessage(error));
    } finally {
      setIsSyncing(false);
    }
  };

  const lastSeenAt =
    syncCheck === null || syncCheck === undefined
      ? null
      : new Date(syncCheck.lastSeenAt).toLocaleString();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>You're signed in</Text>
      <Text style={styles.body}>Signed in as {primaryEmail}</Text>
      <View style={styles.syncPanel}>
        <Text style={styles.syncLabel}>Convex sync</Text>
        <Text style={styles.syncValue}>
          {isLoading
            ? "Connecting..."
            : isAuthenticated
              ? `Authenticated${syncCheck ? ` - ${syncCheck.count} syncs` : ""}`
              : "Not connected"}
        </Text>
        {lastSeenAt ? (
          <Text style={styles.syncMeta}>Last sync: {lastSeenAt}</Text>
        ) : null}
        {syncError ? <Text style={styles.error}>{syncError}</Text> : null}
        <Pressable
          disabled={!isAuthenticated || isSyncing}
          style={[
            styles.primaryButton,
            (!isAuthenticated || isSyncing) && styles.disabledButton,
          ]}
          onPress={handleSync}
        >
          <Text style={styles.primaryButtonText}>
            {isSyncing ? "Syncing..." : "Sync now"}
          </Text>
        </Pressable>
      </View>
      <Pressable style={styles.secondaryButton} onPress={() => signOut()}>
        <Text style={styles.secondaryButtonText}>Sign out</Text>
      </Pressable>
    </View>
  );
}

function getErrorMessage(error: unknown) {
  if (
    typeof error === "object" &&
    error !== null &&
    "errors" in error &&
    Array.isArray(error.errors)
  ) {
    const firstError = error.errors[0];
    if (
      typeof firstError === "object" &&
      firstError !== null &&
      "message" in firstError &&
      typeof firstError.message === "string"
    ) {
      return firstError.message;
    }
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Something went wrong. Please try again.";
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#ffffff",
    flex: 1,
  },
  container: {
    alignItems: "stretch",
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  title: {
    color: "#111827",
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 10,
    textAlign: "center",
  },
  body: {
    color: "#4b5563",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderColor: "#d1d5db",
    borderRadius: 8,
    borderWidth: 1,
    color: "#111827",
    fontSize: 16,
    marginBottom: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  primaryButton: {
    alignItems: "center",
    backgroundColor: "#2563eb",
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  primaryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
  secondaryButton: {
    alignItems: "center",
    borderColor: "#d1d5db",
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 12,
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  secondaryButtonText: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "700",
  },
  textButton: {
    alignItems: "center",
    marginTop: 16,
    paddingVertical: 8,
  },
  textButtonText: {
    color: "#2563eb",
    fontSize: 15,
    fontWeight: "700",
  },
  disabledButton: {
    opacity: 0.6,
  },
  error: {
    color: "#b91c1c",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
    textAlign: "center",
  },
  syncPanel: {
    borderColor: "#d1d5db",
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 4,
    padding: 16,
  },
  syncLabel: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 6,
    textAlign: "center",
  },
  syncValue: {
    color: "#374151",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 4,
    textAlign: "center",
  },
  syncMeta: {
    color: "#6b7280",
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 12,
    textAlign: "center",
  },
});
