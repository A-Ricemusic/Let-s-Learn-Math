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
import { useCallback, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
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
  const grades = useQuery(api.curriculum.grades, isAuthenticated ? {} : "skip");
  const [selectedMode, setSelectedMode] = useState<
    "home" | "games" | "lessons"
  >("home");
  const [selectedGradeLevel, setSelectedGradeLevel] = useState<number | null>(
    null,
  );
  const curriculum = useQuery(
    api.curriculum.byGrade,
    isAuthenticated && selectedGradeLevel !== null
      ? { gradeLevel: selectedGradeLevel }
      : "skip",
  );
  const progress = useQuery(
    api.curriculum.myProgressByGrade,
    isAuthenticated && selectedGradeLevel !== null
      ? { gradeLevel: selectedGradeLevel }
      : "skip",
  );
  const recordAttempt = useMutation(api.curriculum.recordActivityAttempt);
  const primaryEmail =
    user?.primaryEmailAddress?.emailAddress ?? "your account";
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isSubmittingAnswer, setIsSubmittingAnswer] = useState(false);
  const [lessonError, setLessonError] = useState<string | null>(null);

  const lessons = curriculum?.units.flatMap((unit) => unit.lessons) ?? [];
  const selectedLesson =
    lessons.find((lesson) => lesson.id === selectedLessonId) ?? lessons[0];
  const selectedProgress = progress?.find(
    (row) => row.lessonId === selectedLesson?.id,
  );
  const masteredLessons =
    progress?.filter((row) => row.status === "mastered").length ?? 0;
  const totalLessons = lessons.length;

  const handleAnswer = async (answer: string) => {
    if (
      !isAuthenticated ||
      !selectedLesson ||
      selectedGradeLevel === null ||
      isSubmittingAnswer
    ) {
      return;
    }

    setSelectedAnswer(answer);
    setIsSubmittingAnswer(true);
    setLessonError(null);

    try {
      await recordAttempt({
        gradeLevel: selectedGradeLevel,
        unitId: selectedLesson.unitId,
        lessonId: selectedLesson.id,
        activityId: `${selectedLesson.id}-check`,
        isCorrect: answer === selectedLesson.correctAnswer,
      });
    } catch (error) {
      setLessonError(getErrorMessage(error));
    } finally {
      setIsSubmittingAnswer(false);
    }
  };

  const goHome = () => {
    setSelectedMode("home");
    setSelectedGradeLevel(null);
    setSelectedLessonId(null);
    setSelectedAnswer(null);
    setLessonError(null);
  };

  const chooseLessons = () => {
    setSelectedMode("lessons");
    setSelectedGradeLevel(null);
    setSelectedLessonId(null);
    setSelectedAnswer(null);
    setLessonError(null);
  };

  const chooseGrade = (gradeLevel: number) => {
    setSelectedGradeLevel(gradeLevel);
    setSelectedLessonId(null);
    setSelectedAnswer(null);
    setLessonError(null);
  };

  if (isLoading || grades === undefined) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <Text style={styles.body}>Loading math...</Text>
      </View>
    );
  }

  if (!isAuthenticated || grades === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Math is loading</Text>
        <Text style={styles.body}>We are connecting your account.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.learnContent}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.eyebrow}>Signed in as {primaryEmail}</Text>
          <Text style={styles.title}>Let's Learn Math</Text>
        </View>
        <Pressable style={styles.signOutButton} onPress={() => signOut()}>
          <Text style={styles.signOutButtonText}>Sign out</Text>
        </Pressable>
      </View>

      {selectedMode !== "home" ? (
        <Pressable style={styles.backButton} onPress={goHome}>
          <Text style={styles.backButtonText}>Back to options</Text>
        </Pressable>
      ) : null}

      {selectedMode === "home" ? (
        <View style={styles.optionGrid}>
          <Pressable
            style={styles.optionPanel}
            onPress={() => setSelectedMode("games")}
          >
            <Text style={styles.optionTitle}>Math Games</Text>
            <Text style={styles.optionText}>
              Play practice games. This section is ready for the games we build
              next.
            </Text>
          </Pressable>
          <Pressable style={styles.optionPanel} onPress={chooseLessons}>
            <Text style={styles.optionTitle}>Math Lessons</Text>
            <Text style={styles.optionText}>
              Pick a grade, choose a lesson, study examples, then solve a
              practice problem.
            </Text>
          </Pressable>
        </View>
      ) : null}

      {selectedMode === "games" ? (
        <View style={styles.emptyPanel}>
          <Text style={styles.lessonTitle}>Math Games</Text>
          <Text style={styles.lessonExplain}>
            Games will live here. We can add fact fluency, number line races,
            shape sorting, and timed review next.
          </Text>
        </View>
      ) : null}

      {selectedMode === "lessons" && selectedGradeLevel === null ? (
        <View>
          <Text style={styles.sectionTitle}>Choose A Grade</Text>
          <View style={styles.gradeGrid}>
            {grades.map((grade) => (
              <Pressable
                key={grade.gradeLevel}
                style={styles.gradeButton}
                onPress={() => chooseGrade(grade.gradeLevel)}
              >
                <Text style={styles.gradeButtonTitle}>{grade.title}</Text>
                <Text style={styles.gradeButtonText}>{grade.description}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      ) : null}

      {selectedMode === "lessons" &&
      selectedGradeLevel !== null &&
      (curriculum === undefined || progress === undefined) ? (
        <View style={styles.container}>
          <ActivityIndicator />
          <Text style={styles.body}>Loading grade {selectedGradeLevel}...</Text>
        </View>
      ) : null}

      {selectedMode === "lessons" &&
      selectedGradeLevel !== null &&
      curriculum !== undefined &&
      progress !== undefined &&
      selectedLesson !== undefined ? (
        <>
          <Pressable
            style={styles.backButton}
            onPress={() => {
              setSelectedGradeLevel(null);
              setSelectedLessonId(null);
              setSelectedAnswer(null);
              setLessonError(null);
            }}
          >
            <Text style={styles.backButtonText}>Choose another grade</Text>
          </Pressable>

          <View style={styles.progressBand}>
            <Text style={styles.progressTitle}>
              {curriculum.title}: {masteredLessons} of {totalLessons} lessons
              mastered
            </Text>
            <View style={styles.progressTrack}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${totalLessons === 0 ? 0 : (masteredLessons / totalLessons) * 100}%`,
                  },
                ]}
              />
            </View>
            <Text style={styles.progressText}>{curriculum.teachingNote}</Text>
          </View>

          <View style={styles.lessonLayout}>
            <View style={styles.unitList}>
              {curriculum.units.map((unit) => (
                <View key={unit.id} style={styles.unitSection}>
                  <Text style={styles.unitTitle}>{unit.title}</Text>
                  <Text style={styles.unitGoal}>{unit.goal}</Text>
                  {unit.lessons.map((lesson) => {
                    const lessonProgress = progress.find(
                      (row) => row.lessonId === lesson.id,
                    );
                    const isSelected = lesson.id === selectedLesson.id;

                    return (
                      <Pressable
                        key={lesson.id}
                        style={[
                          styles.lessonButton,
                          isSelected && styles.lessonButtonSelected,
                        ]}
                        onPress={() => {
                          setSelectedLessonId(lesson.id);
                          setSelectedAnswer(null);
                          setLessonError(null);
                        }}
                      >
                        <Text
                          style={[
                            styles.lessonButtonTitle,
                            isSelected && styles.lessonButtonTitleSelected,
                          ]}
                        >
                          {lesson.title}
                        </Text>
                        <Text
                          style={[
                            styles.lessonButtonMeta,
                            isSelected && styles.lessonButtonMetaSelected,
                          ]}
                        >
                          {lessonProgress?.status.replace("_", " ") ??
                            "not started"}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              ))}
            </View>

            <View style={styles.lessonPanel}>
              <Text style={styles.lessonConcept}>{selectedLesson.concept}</Text>
              <Text style={styles.lessonTitle}>{selectedLesson.title}</Text>
              <Text style={styles.lessonExplain}>
                {selectedLesson.explanation}
              </Text>

              <View style={styles.examplesStack}>
                {selectedLesson.examples.map((example, index) => (
                  <View key={example.id} style={styles.exampleBlock}>
                    <Text style={styles.exampleLabel}>Example {index + 1}</Text>
                    <Text style={styles.exampleText}>
                      {example.explanation}
                    </Text>
                    <LessonVisual
                      model={selectedLesson.visualModel}
                      numbers={example.visualNumbers}
                    />
                  </View>
                ))}
              </View>

              <Text style={styles.practicePrompt}>{selectedLesson.prompt}</Text>
              <View style={styles.choiceRow}>
                {selectedLesson.choices.map((choice) => {
                  const isChosen = selectedAnswer === choice;
                  const isCorrect = choice === selectedLesson.correctAnswer;

                  return (
                    <Pressable
                      key={choice}
                      disabled={isSubmittingAnswer}
                      style={[
                        styles.choiceButton,
                        isChosen && isCorrect && styles.choiceCorrect,
                        isChosen && !isCorrect && styles.choiceIncorrect,
                        isSubmittingAnswer && styles.disabledButton,
                      ]}
                      onPress={() => handleAnswer(choice)}
                    >
                      <Text style={styles.choiceButtonText}>{choice}</Text>
                    </Pressable>
                  );
                })}
              </View>

              {selectedAnswer ? (
                <Text style={styles.feedbackText}>
                  {selectedAnswer === selectedLesson.correctAnswer
                    ? "Yes. That is right."
                    : "Try again. Look at the picture."}
                </Text>
              ) : null}
              {lessonError ? (
                <Text style={styles.error}>{lessonError}</Text>
              ) : null}

              <View style={styles.masteryBox}>
                <Text style={styles.masteryLabel}>Mastery</Text>
                <Text style={styles.masteryValue}>
                  {selectedProgress
                    ? `${selectedProgress.masteryScore}% after ${selectedProgress.attemptCount} tries`
                    : "Practice to start"}
                </Text>
              </View>
            </View>
          </View>
        </>
      ) : null}
    </ScrollView>
  );
}

function LessonVisual({
  model,
  numbers,
}: {
  model: string;
  numbers: number[];
}) {
  if (model === "ten_frame") {
    const filled = numbers[0] ?? 0;
    return (
      <View style={styles.tenFrame}>
        {Array.from({ length: 10 }, (_, index) => (
          <View
            key={index}
            style={[styles.tenCell, index < filled && styles.tenCellFilled]}
          />
        ))}
      </View>
    );
  }

  if (model === "object_groups") {
    return (
      <View style={styles.visualRow}>
        <DotGroup count={numbers[0] ?? 0} />
        <Text style={styles.visualOperator}>+</Text>
        <DotGroup count={numbers[1] ?? 0} />
      </View>
    );
  }

  if (model === "take_away") {
    const total = numbers[0] ?? 0;
    const removed = numbers[1] ?? 0;
    return (
      <View style={styles.dotWrap}>
        {Array.from({ length: total }, (_, index) => (
          <View
            key={index}
            style={[styles.dot, index < removed && styles.dotRemoved]}
          >
            {index < removed ? <Text style={styles.removedMark}>x</Text> : null}
          </View>
        ))}
      </View>
    );
  }

  if (model === "number_line") {
    const start = numbers[0] ?? 0;
    const jump = numbers[1] ?? 0;
    return (
      <View style={styles.numberLine}>
        {[0, 5, 10, 15, 20].map((value) => (
          <View key={value} style={styles.numberTick}>
            <View style={styles.tickLine} />
            <Text style={styles.tickText}>{value}</Text>
          </View>
        ))}
        <Text style={styles.jumpText}>
          Start {start}, {jump > 0 ? "jump forward" : "jump back"}{" "}
          {Math.abs(jump)}
        </Text>
      </View>
    );
  }

  if (model === "base_ten") {
    return (
      <View style={styles.baseTenRow}>
        <View style={styles.tenRodColumn}>
          {Array.from({ length: numbers[0] ?? 0 }, (_, index) => (
            <View key={index} style={styles.tenRod} />
          ))}
        </View>
        <DotGroup count={numbers[1] ?? 0} />
      </View>
    );
  }

  if (model === "skip_count") {
    return (
      <View style={styles.skipRow}>
        {numbers.map((number) => (
          <View key={number} style={styles.skipBubble}>
            <Text style={styles.skipText}>{number}</Text>
          </View>
        ))}
        <Text style={styles.skipNext}>?</Text>
      </View>
    );
  }

  if (model === "measurement_units") {
    return (
      <View style={styles.measurementBox}>
        <View style={styles.pencil} />
        <View style={styles.clipRow}>
          {Array.from({ length: numbers[0] ?? 0 }, (_, index) => (
            <View key={index} style={styles.paperClip} />
          ))}
        </View>
      </View>
    );
  }

  if (model === "clock") {
    return (
      <View style={styles.clock}>
        <Text style={[styles.clockNumber, styles.clockTwelve]}>12</Text>
        <Text style={[styles.clockNumber, styles.clockThree]}>3</Text>
        <Text style={[styles.clockNumber, styles.clockSix]}>6</Text>
        <Text style={[styles.clockNumber, styles.clockNine]}>9</Text>
        <View style={styles.hourHand} />
        <View style={styles.minuteHand} />
      </View>
    );
  }

  return (
    <View style={styles.shapeRow}>
      <View style={styles.triangle} />
      <View style={styles.squareShape} />
      <View style={styles.circleShape} />
    </View>
  );
}

function DotGroup({ count }: { count: number }) {
  return (
    <View style={styles.dotWrap}>
      {Array.from({ length: count }, (_, index) => (
        <View key={index} style={styles.dot} />
      ))}
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
  learnContent: {
    padding: 20,
    paddingBottom: 40,
  },
  headerRow: {
    gap: 14,
    marginBottom: 18,
  },
  eyebrow: {
    color: "#64748b",
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 4,
  },
  signOutButton: {
    alignItems: "center",
    alignSelf: "flex-start",
    borderColor: "#cbd5e1",
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  signOutButtonText: {
    color: "#334155",
    fontSize: 14,
    fontWeight: "800",
  },
  backButton: {
    alignItems: "center",
    alignSelf: "flex-start",
    borderColor: "#cbd5e1",
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 14,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  backButtonText: {
    color: "#2563eb",
    fontSize: 14,
    fontWeight: "800",
  },
  optionGrid: {
    gap: 14,
  },
  optionPanel: {
    backgroundColor: "#f8fafc",
    borderColor: "#cbd5e1",
    borderRadius: 8,
    borderWidth: 1,
    padding: 18,
  },
  optionTitle: {
    color: "#0f172a",
    fontSize: 22,
    fontWeight: "900",
    marginBottom: 8,
  },
  optionText: {
    color: "#475569",
    fontSize: 16,
    lineHeight: 23,
  },
  emptyPanel: {
    backgroundColor: "#f8fafc",
    borderColor: "#cbd5e1",
    borderRadius: 8,
    borderWidth: 1,
    padding: 18,
  },
  sectionTitle: {
    color: "#0f172a",
    fontSize: 22,
    fontWeight: "900",
    marginBottom: 12,
  },
  gradeGrid: {
    gap: 10,
  },
  gradeButton: {
    backgroundColor: "#ffffff",
    borderColor: "#cbd5e1",
    borderRadius: 8,
    borderWidth: 1,
    padding: 14,
  },
  gradeButtonTitle: {
    color: "#0f172a",
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 4,
  },
  gradeButtonText: {
    color: "#475569",
    fontSize: 14,
    lineHeight: 20,
  },
  progressBand: {
    backgroundColor: "#f8fafc",
    borderColor: "#cbd5e1",
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 18,
    padding: 16,
  },
  progressTitle: {
    color: "#0f172a",
    fontSize: 17,
    fontWeight: "800",
    marginBottom: 10,
  },
  progressTrack: {
    backgroundColor: "#e2e8f0",
    borderRadius: 8,
    height: 12,
    marginBottom: 10,
    overflow: "hidden",
  },
  progressFill: {
    backgroundColor: "#16a34a",
    height: 12,
  },
  progressText: {
    color: "#475569",
    fontSize: 14,
    lineHeight: 20,
  },
  lessonLayout: {
    gap: 16,
  },
  unitList: {
    gap: 12,
  },
  unitSection: {
    borderBottomColor: "#e2e8f0",
    borderBottomWidth: 1,
    paddingBottom: 12,
  },
  unitTitle: {
    color: "#0f172a",
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 4,
  },
  unitGoal: {
    color: "#475569",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  lessonButton: {
    borderColor: "#cbd5e1",
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 8,
    padding: 12,
  },
  lessonButtonSelected: {
    backgroundColor: "#0f172a",
    borderColor: "#0f172a",
  },
  lessonButtonTitle: {
    color: "#0f172a",
    fontSize: 15,
    fontWeight: "800",
  },
  lessonButtonTitleSelected: {
    color: "#ffffff",
  },
  lessonButtonMeta: {
    color: "#64748b",
    fontSize: 12,
    fontWeight: "700",
    marginTop: 4,
    textTransform: "capitalize",
  },
  lessonButtonMetaSelected: {
    color: "#cbd5e1",
  },
  lessonPanel: {
    backgroundColor: "#ffffff",
    borderColor: "#cbd5e1",
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
  },
  lessonConcept: {
    color: "#2563eb",
    fontSize: 13,
    fontWeight: "900",
    marginBottom: 4,
    textTransform: "uppercase",
  },
  lessonTitle: {
    color: "#0f172a",
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 8,
  },
  lessonExplain: {
    color: "#475569",
    fontSize: 16,
    lineHeight: 23,
    marginBottom: 14,
  },
  examplesStack: {
    gap: 12,
    marginBottom: 16,
  },
  exampleBlock: {
    backgroundColor: "#f8fafc",
    borderColor: "#e2e8f0",
    borderRadius: 8,
    borderWidth: 1,
    padding: 12,
  },
  exampleLabel: {
    color: "#2563eb",
    fontSize: 12,
    fontWeight: "900",
    marginBottom: 4,
    textTransform: "uppercase",
  },
  exampleText: {
    color: "#0f172a",
    fontSize: 15,
    fontWeight: "800",
    lineHeight: 21,
    marginBottom: 10,
  },
  tenFrame: {
    borderColor: "#0f172a",
    borderRadius: 8,
    borderWidth: 2,
    flexDirection: "row",
    flexWrap: "wrap",
    height: 116,
    marginBottom: 16,
    maxWidth: 280,
    overflow: "hidden",
    width: "100%",
  },
  tenCell: {
    alignItems: "center",
    borderColor: "#0f172a",
    borderWidth: 1,
    height: 56,
    justifyContent: "center",
    width: "20%",
  },
  tenCellFilled: {
    backgroundColor: "#f97316",
  },
  visualRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  visualOperator: {
    color: "#0f172a",
    fontSize: 28,
    fontWeight: "900",
  },
  dotWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    maxWidth: 180,
  },
  dot: {
    alignItems: "center",
    backgroundColor: "#22c55e",
    borderRadius: 14,
    height: 28,
    justifyContent: "center",
    width: 28,
  },
  dotRemoved: {
    backgroundColor: "#fecaca",
    borderColor: "#dc2626",
    borderWidth: 2,
  },
  removedMark: {
    color: "#991b1b",
    fontSize: 16,
    fontWeight: "900",
  },
  numberLine: {
    borderTopColor: "#0f172a",
    borderTopWidth: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 44,
    marginTop: 34,
    paddingTop: 0,
  },
  numberTick: {
    alignItems: "center",
    marginTop: -12,
  },
  tickLine: {
    backgroundColor: "#0f172a",
    height: 20,
    width: 3,
  },
  tickText: {
    color: "#0f172a",
    fontSize: 13,
    fontWeight: "800",
    marginTop: 4,
  },
  jumpText: {
    bottom: -34,
    color: "#2563eb",
    fontSize: 14,
    fontWeight: "800",
    left: 0,
    position: "absolute",
  },
  baseTenRow: {
    alignItems: "flex-end",
    flexDirection: "row",
    gap: 18,
    marginBottom: 16,
  },
  tenRodColumn: {
    flexDirection: "row",
    gap: 8,
  },
  tenRod: {
    backgroundColor: "#60a5fa",
    borderColor: "#1d4ed8",
    borderRadius: 6,
    borderWidth: 1,
    height: 110,
    width: 24,
  },
  skipRow: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 16,
  },
  skipBubble: {
    alignItems: "center",
    backgroundColor: "#e0f2fe",
    borderColor: "#0284c7",
    borderRadius: 8,
    borderWidth: 1,
    height: 54,
    justifyContent: "center",
    width: 54,
  },
  skipText: {
    color: "#075985",
    fontSize: 18,
    fontWeight: "900",
  },
  skipNext: {
    color: "#0f172a",
    fontSize: 28,
    fontWeight: "900",
  },
  measurementBox: {
    marginBottom: 16,
  },
  pencil: {
    backgroundColor: "#facc15",
    borderRadius: 8,
    height: 22,
    marginBottom: 10,
    maxWidth: 260,
    width: "90%",
  },
  clipRow: {
    flexDirection: "row",
    gap: 6,
  },
  paperClip: {
    borderColor: "#64748b",
    borderRadius: 10,
    borderWidth: 2,
    height: 34,
    width: 20,
  },
  clock: {
    alignSelf: "flex-start",
    borderColor: "#0f172a",
    borderRadius: 70,
    borderWidth: 3,
    height: 140,
    marginBottom: 16,
    position: "relative",
    width: 140,
  },
  clockNumber: {
    color: "#0f172a",
    fontSize: 14,
    fontWeight: "900",
    position: "absolute",
  },
  clockTwelve: {
    left: 58,
    top: 8,
  },
  clockThree: {
    right: 12,
    top: 60,
  },
  clockSix: {
    bottom: 8,
    left: 64,
  },
  clockNine: {
    left: 12,
    top: 60,
  },
  hourHand: {
    backgroundColor: "#0f172a",
    height: 4,
    left: 70,
    position: "absolute",
    top: 68,
    width: 42,
  },
  minuteHand: {
    backgroundColor: "#0f172a",
    height: 54,
    left: 68,
    position: "absolute",
    top: 18,
    width: 4,
  },
  shapeRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 18,
    marginBottom: 16,
  },
  triangle: {
    borderBottomColor: "#f97316",
    borderBottomWidth: 58,
    borderLeftColor: "transparent",
    borderLeftWidth: 32,
    borderRightColor: "transparent",
    borderRightWidth: 32,
    height: 0,
    width: 0,
  },
  squareShape: {
    backgroundColor: "#22c55e",
    height: 58,
    width: 58,
  },
  circleShape: {
    backgroundColor: "#60a5fa",
    borderRadius: 29,
    height: 58,
    width: 58,
  },
  practicePrompt: {
    color: "#0f172a",
    fontSize: 18,
    fontWeight: "800",
    lineHeight: 25,
    marginBottom: 12,
  },
  choiceRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 12,
  },
  choiceButton: {
    alignItems: "center",
    backgroundColor: "#f8fafc",
    borderColor: "#cbd5e1",
    borderRadius: 8,
    borderWidth: 1,
    minWidth: 78,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  choiceCorrect: {
    backgroundColor: "#bbf7d0",
    borderColor: "#16a34a",
  },
  choiceIncorrect: {
    backgroundColor: "#fecaca",
    borderColor: "#dc2626",
  },
  choiceButtonText: {
    color: "#0f172a",
    fontSize: 18,
    fontWeight: "900",
  },
  feedbackText: {
    color: "#334155",
    fontSize: 15,
    fontWeight: "800",
    lineHeight: 22,
    marginBottom: 12,
  },
  masteryBox: {
    backgroundColor: "#f8fafc",
    borderRadius: 8,
    marginTop: 4,
    padding: 12,
  },
  masteryLabel: {
    color: "#64748b",
    fontSize: 12,
    fontWeight: "900",
    marginBottom: 3,
    textTransform: "uppercase",
  },
  masteryValue: {
    color: "#0f172a",
    fontSize: 15,
    fontWeight: "800",
  },
});
