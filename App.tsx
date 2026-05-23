import { ClerkProvider, SignedIn, SignedOut, useAuth, useOAuth, useUser } from "@clerk/clerk-expo";
import { useMutation, useQuery } from "convex/react";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import * as SecureStore from "expo-secure-store";
import { StatusBar } from "expo-status-bar";
import { useVideoPlayer, VideoView } from "expo-video";
import React, { useMemo } from "react";
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { api } from "./convex/_generated/api";

const convexUrl = process.env.EXPO_PUBLIC_CONVEX_URL;
const clerkKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const tokenCache = {
  async getToken(key: string) {
    return SecureStore.getItemAsync(key);
  },
  async saveToken(key: string, value: string) {
    return SecureStore.setItemAsync(key, value);
  },
};

type PublishedLesson = {
  _id: string;
  title: string;
  description: string;
  topic: string;
  gradeLevel: number;
  durationMinutes: number;
  requiredPlan: "free" | "premium";
  videoUrl: string | null;
};

export default function App() {
  const convex = useMemo(() => (convexUrl ? new ConvexReactClient(convexUrl) : null), []);

  if (!convexUrl || !clerkKey || !convex) {
    return <SetupScreen />;
  }

  return (
    <ClerkProvider publishableKey={clerkKey} tokenCache={tokenCache}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <SignedIn>
          <LearnerHome />
        </SignedIn>
        <SignedOut>
          <SignInScreen />
        </SignedOut>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}

function SetupScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="dark" />
      <View style={styles.centered}>
        <Text style={styles.logo}>Let's Learn Math</Text>
        <Text style={styles.title}>Connect your backend keys</Text>
        <Text style={styles.body}>
          Add EXPO_PUBLIC_CONVEX_URL and EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY to .env, then restart Expo.
        </Text>
      </View>
    </SafeAreaView>
  );
}

function SignInScreen() {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const signIn = async () => {
    await startOAuthFlow();
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="dark" />
      <View style={styles.hero}>
        <Text style={styles.logo}>Let's Learn Math</Text>
        <Text style={styles.title}>Video lessons, practice, and tutoring in one place.</Text>
        <Text style={styles.body}>
          Sign in to see your enrolled lessons and unlock premium tutoring tracks.
        </Text>
        <Pressable style={styles.primaryButton} onPress={signIn}>
          <Text style={styles.primaryButtonText}>Continue with Google</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function LearnerHome() {
  const { user } = useUser();
  const { signOut } = useAuth();
  const lessons = useQuery(api.lessons.listPublishedLessons);
  const createCheckout = useMutation(api.payments.createCheckoutSession);

  const startCheckout = async () => {
    const result = await createCheckout({ plan: "monthly" });
    console.log("Checkout placeholder:", result.checkoutUrl);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>Welcome back</Text>
            <Text style={styles.heading}>{user?.firstName ?? "Learner"}</Text>
          </View>
          <Pressable onPress={() => signOut()} style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Sign out</Text>
          </Pressable>
        </View>

        <View style={styles.progressPanel}>
          <Text style={styles.panelTitle}>Today</Text>
          <Text style={styles.progressNumber}>3 short lessons</Text>
          <Text style={styles.body}>Fractions, equations, and geometry practice are queued for review.</Text>
          <Pressable style={styles.primaryButton} onPress={startCheckout}>
            <Text style={styles.primaryButtonText}>Unlock tutoring plan</Text>
          </Pressable>
        </View>

        <Text style={styles.sectionTitle}>Video lessons</Text>
        {lessons === undefined ? (
          <ActivityIndicator style={styles.loader} />
        ) : lessons.length === 0 ? (
          <EmptyLessons />
        ) : (
          lessons.map((lesson: PublishedLesson) => (
            <View key={lesson._id} style={styles.lessonCard}>
              {lesson.videoUrl ? (
                <LessonVideo videoUrl={lesson.videoUrl} />
              ) : (
                <View style={styles.videoPlaceholder}>
                  <Text style={styles.videoPlaceholderText}>Video processing</Text>
                </View>
              )}
              <View style={styles.lessonBody}>
                <Text style={styles.lessonTitle}>{lesson.title}</Text>
                <Text style={styles.lessonMeta}>
                  Grade {lesson.gradeLevel} · {lesson.topic} · {lesson.durationMinutes} min
                </Text>
                <Text style={styles.body}>{lesson.description}</Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function LessonVideo({ videoUrl }: { videoUrl: string }) {
  const player = useVideoPlayer(videoUrl, (videoPlayer) => {
    videoPlayer.loop = false;
  });

  return <VideoView player={player} style={styles.video} nativeControls contentFit="cover" />;
}

function EmptyLessons() {
  return (
    <View style={styles.emptyState}>
      <Text style={styles.panelTitle}>No lessons yet</Text>
      <Text style={styles.body}>
        Add a lesson in Convex using the createLesson mutation after uploading a video to storage.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f7f8f3",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  hero: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  content: {
    padding: 20,
    gap: 18,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  logo: {
    color: "#23414c",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 12,
  },
  eyebrow: {
    color: "#69736d",
    fontSize: 13,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  title: {
    color: "#17282f",
    fontSize: 34,
    fontWeight: "800",
    lineHeight: 40,
    marginBottom: 14,
  },
  heading: {
    color: "#17282f",
    fontSize: 28,
    fontWeight: "800",
  },
  body: {
    color: "#59655f",
    fontSize: 15,
    lineHeight: 22,
  },
  primaryButton: {
    alignItems: "center",
    backgroundColor: "#1e6f5c",
    borderRadius: 8,
    marginTop: 18,
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  primaryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "800",
  },
  secondaryButton: {
    borderColor: "#ccd7d0",
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  secondaryButtonText: {
    color: "#23414c",
    fontWeight: "700",
  },
  progressPanel: {
    backgroundColor: "#ffffff",
    borderColor: "#e1e7e2",
    borderRadius: 8,
    borderWidth: 1,
    padding: 18,
  },
  panelTitle: {
    color: "#17282f",
    fontSize: 18,
    fontWeight: "800",
  },
  progressNumber: {
    color: "#d16f3b",
    fontSize: 26,
    fontWeight: "900",
    marginVertical: 8,
  },
  sectionTitle: {
    color: "#17282f",
    fontSize: 22,
    fontWeight: "900",
  },
  loader: {
    marginTop: 20,
  },
  lessonCard: {
    backgroundColor: "#ffffff",
    borderColor: "#e1e7e2",
    borderRadius: 8,
    borderWidth: 1,
    overflow: "hidden",
  },
  video: {
    aspectRatio: 16 / 9,
    width: "100%",
  },
  videoPlaceholder: {
    alignItems: "center",
    aspectRatio: 16 / 9,
    backgroundColor: "#dce8e3",
    justifyContent: "center",
    width: "100%",
  },
  videoPlaceholderText: {
    color: "#48635a",
    fontWeight: "800",
  },
  lessonBody: {
    gap: 8,
    padding: 14,
  },
  lessonTitle: {
    color: "#17282f",
    fontSize: 18,
    fontWeight: "900",
  },
  lessonMeta: {
    color: "#7c5c40",
    fontSize: 13,
    fontWeight: "800",
  },
  emptyState: {
    backgroundColor: "#ffffff",
    borderColor: "#e1e7e2",
    borderRadius: 8,
    borderWidth: 1,
    padding: 18,
  },
});
