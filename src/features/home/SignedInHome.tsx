import { useAuth, useUser } from "@clerk/clerk-expo";
import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Easing,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { api } from "../../../convex/_generated/api";
import { styles } from "../../styles/styles";
import { getErrorMessage } from "../../utils/errors";
import { MakeTenGame } from "../games/MakeTenGame";
import { LessonVisual } from "../lessons/components/LessonVisual";
import { QuestionBlock } from "../lessons/components/QuestionBlock";
import { buildSectionPlan } from "../lessons/plan";
import type { SectionQuestion } from "../lessons/types";

type HomeMode = "topics" | "grades" | "games" | "profile";
type GameScreen = "make-ten";
type ProfilePage = "summary" | "parent-report";

const FLOATING_MATH_SYMBOLS = ["+", "5", "=", "8", "x", "2"];

export function SignedInHome() {
  const { signOut } = useAuth();
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { user } = useUser();
  const grades = useQuery(api.curriculum.grades, isAuthenticated ? {} : "skip");
  const activeGradeLevel = selectedGradeLevel ?? grades?.[0]?.gradeLevel ?? null;
  const [selectedMode, setSelectedMode] = useState<HomeMode>("topics");
  const [selectedGradeLevel, setSelectedGradeLevel] = useState<number | null>(
    null,
  );
  const curriculum = useQuery(
    api.curriculum.byGrade,
    isAuthenticated && activeGradeLevel !== null
      ? { gradeLevel: activeGradeLevel }
      : "skip",
  );
  const progress = useQuery(
    api.curriculum.myProgressByGrade,
    isAuthenticated && activeGradeLevel !== null
      ? { gradeLevel: activeGradeLevel }
      : "skip",
  );
  const parentProgressReport = useQuery(
    api.curriculum.myParentProgressReport,
    isAuthenticated ? {} : "skip",
  );
  const makeTenStats = useQuery(
    api.games.myGameStats,
    isAuthenticated ? { gameId: "make-ten" } : "skip",
  );
  const recordAttempt = useMutation(api.curriculum.recordActivityAttempt);
  const primaryEmail =
    user?.primaryEmailAddress?.emailAddress ?? "your account";
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(
    null,
  );
  const [selectedGame, setSelectedGame] = useState<GameScreen | null>(null);
  const [profilePage, setProfilePage] = useState<ProfilePage>("summary");
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, string>
  >({});
  const [isSubmittingAnswer, setIsSubmittingAnswer] = useState(false);
  const [lessonError, setLessonError] = useState<string | null>(null);
  const floatAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnimation, {
          duration: 2600,
          easing: Easing.inOut(Easing.quad),
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnimation, {
          duration: 2600,
          easing: Easing.inOut(Easing.quad),
          toValue: 0,
          useNativeDriver: true,
        }),
      ]),
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [floatAnimation]);

  const sections = curriculum?.units ?? [];
  const selectedSection =
    sections.find((section) => section.id === selectedSectionId) ?? null;
  const selectedProgress = progress?.find(
    (row) => row.lessonId === selectedSection?.id,
  );
  const masteredLessons =
    progress?.filter((row) => row.status === "mastered").length ?? 0;
  const totalLessons = sections.length;
  const progressByLessonId = new Map(
    progress?.map((row) => [row.lessonId, row]) ?? [],
  );
  const completedLessons = sections.filter(
    (section) => progressByLessonId.get(section.id)?.status === "mastered",
  );
  const incompleteLessons = sections.filter(
    (section) => progressByLessonId.get(section.id)?.status !== "mastered",
  );
  const sectionPlan = selectedSection
    ? buildSectionPlan(selectedSection)
    : null;

  const handleAnswer = async (question: SectionQuestion, answer: string) => {
    if (
      !isAuthenticated ||
      !selectedSection ||
      selectedGradeLevel === null ||
      isSubmittingAnswer
    ) {
      return;
    }

    setSelectedAnswers((current) => ({
      ...current,
      [question.id]: answer,
    }));
    setIsSubmittingAnswer(true);
    setLessonError(null);

    try {
      await recordAttempt({
        gradeLevel: selectedGradeLevel,
        unitId: selectedSection.id,
        lessonId: selectedSection.id,
        activityId: question.id,
        selectedAnswer: answer,
      });
    } catch (error) {
      setLessonError(getErrorMessage(error));
    } finally {
      setIsSubmittingAnswer(false);
    }
  };

  const showTopics = () => {
    setSelectedMode("topics");
    setSelectedGame(null);
    setProfilePage("summary");
    setSelectedGradeLevel((currentGradeLevel) => {
      if (currentGradeLevel !== null) {
        return currentGradeLevel;
      }

      return grades?.[0]?.gradeLevel ?? null;
    });
    setSelectedSectionId(null);
    setSelectedAnswers({});
    setLessonError(null);
  };

  const showGrades = () => {
    setSelectedMode("grades");
    setSelectedGame(null);
    setProfilePage("summary");
    setSelectedSectionId(null);
    setSelectedAnswers({});
    setLessonError(null);
  };

  const chooseGrade = (gradeLevel: number) => {
    setSelectedMode("topics");
    setSelectedGame(null);
    setProfilePage("summary");
    setSelectedGradeLevel(gradeLevel);
    setSelectedSectionId(null);
    setSelectedAnswers({});
    setLessonError(null);
  };

  const showGames = () => {
    setSelectedMode("games");
    setSelectedGame(null);
    setProfilePage("summary");
    setSelectedSectionId(null);
    setSelectedAnswers({});
    setLessonError(null);
  };

  const showProfile = () => {
    setSelectedMode("profile");
    setSelectedGame(null);
    setProfilePage("summary");
    setSelectedSectionId(null);
    setSelectedAnswers({});
    setLessonError(null);
  };

  const bottomNavigation = (
    <BottomNav
      selectedMode={selectedMode}
      showGames={showGames}
      showGrades={showGrades}
      showProfile={showProfile}
      showTopics={showTopics}
    />
  );

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

  if (selectedGame === "make-ten") {
    return (
      <MakeTenGame bottomNavigation={bottomNavigation} onExit={showGames} />
    );
  }

  return (
    <View style={styles.appShell}>
      <ScrollView
        contentContainerStyle={styles.learnContent}
        style={styles.learnScreen}
      >
        <View style={styles.learnBackgroundTop} />
        <View style={styles.learnBackgroundBottom} />

        <View style={styles.floatingMathLayer} pointerEvents="none">
          {FLOATING_MATH_SYMBOLS.map((symbol, index) => (
            <Animated.View
              key={`${symbol}-${index}`}
              style={[
                styles.floatingMathToken,
                index % 2 === 0
                  ? styles.floatingMathTokenWarm
                  : styles.floatingMathTokenCool,
                {
                  left: `${8 + index * 15}%`,
                  top: 18 + (index % 3) * 58,
                  transform: [
                    {
                      translateY: floatAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [
                          index % 2 === 0 ? 0 : 10,
                          index % 2 === 0 ? -10 : 0,
                        ],
                      }),
                    },
                    {
                      rotate: `${index % 2 === 0 ? -8 : 8}deg`,
                    },
                  ],
                },
              ]}
            >
              <Text style={styles.floatingMathText}>{symbol}</Text>
            </Animated.View>
          ))}
        </View>

        <View style={styles.heroPanel}>
          <View style={styles.headerRow}>
            <View style={styles.headerCopy}>
              <Text style={styles.eyebrow}>Signed in as {primaryEmail}</Text>
              <Text style={[styles.title, styles.homeTitle]}>
                Let's Learn Math
              </Text>
              <Text style={styles.heroSubtitle}>
                {selectedMode === "topics"
                  ? "Choose a topic and build number power one step at a time."
                  : selectedMode === "grades"
                    ? "Pick the grade level you want to practice."
                    : selectedMode === "games"
                      ? "Warm up with fast math challenges."
                      : "Manage your learning profile."}
              </Text>
            </View>
            <Pressable style={styles.signOutButton} onPress={() => signOut()}>
              <Text style={styles.signOutButtonText}>Sign out</Text>
            </Pressable>
          </View>
        </View>

        {selectedMode === "games" ? (
          <View style={styles.gameList}>
            <Pressable
              style={styles.gameCard}
              onPress={() => setSelectedGame("make-ten")}
            >
              <View style={styles.gameCardBadge}>
                <Text style={styles.gameCardBadgeText}>10</Text>
              </View>
              <View style={styles.gameCardCopy}>
                <Text style={styles.gameCardTitle}>Making Tens</Text>
                <Text style={styles.gameCardText}>
                  Race the clock and solve as many missing-number facts as you
                  can in 2 minutes.
                </Text>
              </View>
              <Text style={styles.gameCardAction}>Play</Text>
            </Pressable>
          </View>
        ) : null}

        {selectedMode === "profile" ? (
          <View style={styles.profilePanel}>
            <View style={styles.profileAvatar}>
              <Text style={styles.profileAvatarText}>
                {primaryEmail.slice(0, 1).toUpperCase()}
              </Text>
            </View>
            <Text style={styles.profileName}>
              {user?.fullName ?? user?.firstName ?? "Math learner"}
            </Text>
            <Text style={styles.profileEmail}>{primaryEmail}</Text>
            <View style={styles.profileStatRow}>
              <View style={styles.profileStat}>
                <Text style={styles.profileStatValue}>
                  {selectedGradeLevel === null ? "-" : selectedGradeLevel}
                </Text>
                <Text style={styles.profileStatLabel}>Grade</Text>
              </View>
              <View style={styles.profileStat}>
                <Text style={styles.profileStatValue}>{masteredLessons}</Text>
                <Text style={styles.profileStatLabel}>Mastered</Text>
              </View>
              <View style={styles.profileStat}>
                <Text style={styles.profileStatValue}>{totalLessons}</Text>
                <Text style={styles.profileStatLabel}>Topics</Text>
              </View>
            </View>
            <View style={styles.gameStatsPanel}>
              <Text style={styles.sectionTitle}>Game Stats</Text>
              <View style={styles.profileStatRow}>
                <View style={styles.profileStat}>
                  <Text style={styles.profileStatValue}>
                    {makeTenStats?.highScore ?? 0}
                  </Text>
                  <Text style={styles.profileStatLabel}>Make 10 Best</Text>
                </View>
                <View style={styles.profileStat}>
                  <Text style={styles.profileStatValue}>
                    {makeTenStats?.recentRuns.length ?? 0}
                  </Text>
                  <Text style={styles.profileStatLabel}>Recent Runs</Text>
                </View>
              </View>
              <View style={styles.recentRunList}>
                {makeTenStats?.recentRuns.length ? (
                  makeTenStats.recentRuns.map((run, index) => (
                    <View key={run.id} style={styles.recentRunRow}>
                      <Text style={styles.recentRunRank}>#{index + 1}</Text>
                      <Text style={styles.recentRunScore}>
                        {run.score} correct
                      </Text>
                      <Text style={styles.recentRunDate}>
                        {new Date(run.completedAt).toLocaleDateString()}
                      </Text>
                    </View>
                  ))
                ) : (
                  <Text style={styles.gameCardText}>
                    Play Making Tens to start tracking your scores.
                  </Text>
                )}
              </View>
            </View>
          </View>
        ) : null}

        {selectedMode === "grades" ? (
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
                  <Text style={styles.gradeButtonText}>
                    {grade.description}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        ) : null}

        {selectedMode === "topics" && selectedGradeLevel === null ? (
          <View style={styles.emptyPanel}>
            <Text style={styles.sectionTitle}>Choose A Grade</Text>
            <Text style={styles.gradeButtonText}>
              Pick a grade first, then the Topics tab will return to that grade.
            </Text>
            <Pressable style={styles.primaryNavAction} onPress={showGrades}>
              <Text style={styles.primaryNavActionText}>Choose grade</Text>
            </Pressable>
          </View>
        ) : null}

        {selectedMode === "topics" &&
        selectedGradeLevel !== null &&
        (curriculum === undefined || progress === undefined) ? (
          <View style={styles.container}>
            <ActivityIndicator />
            <Text style={styles.body}>
              Loading grade {selectedGradeLevel}...
            </Text>
          </View>
        ) : null}

        {selectedMode === "topics" &&
        selectedGradeLevel !== null &&
        curriculum !== undefined &&
        progress !== undefined ? (
          <>
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
              {selectedSection === null || sectionPlan === null ? (
                <View style={styles.unitList}>
                  {curriculum.units.map((unit) => {
                    const unitProgress = progress.find(
                      (row) => row.lessonId === unit.id,
                    );

                    return (
                      <View key={unit.id} style={styles.unitSection}>
                        <Pressable
                          style={styles.lessonButton}
                          onPress={() => {
                            setSelectedSectionId(unit.id);
                            setSelectedAnswers({});
                            setLessonError(null);
                          }}
                        >
                          <Text style={styles.lessonButtonTitle}>
                            {unit.title}
                          </Text>
                          <Text style={styles.lessonButtonGoal}>
                            {unit.goal}
                          </Text>
                          <Text style={styles.lessonButtonMeta}>
                            {unitProgress?.status.replace("_", " ") ??
                              "not started"}
                          </Text>
                        </Pressable>
                      </View>
                    );
                  })}
                </View>
              ) : (
                <View>
                  <Pressable
                    style={styles.backButton}
                    onPress={() => {
                      setSelectedSectionId(null);
                      setSelectedAnswers({});
                      setLessonError(null);
                    }}
                  >
                    <Text style={styles.backButtonText}>Back to sections</Text>
                  </Pressable>

                  <View style={styles.lessonPanel}>
                    <Text style={styles.lessonConcept}>
                      {selectedSection.title}
                    </Text>
                    <Text style={styles.lessonTitle}>
                      {selectedSection.title}
                    </Text>
                    <Text style={styles.lessonExplain}>
                      {selectedSection.goal}
                    </Text>

                    <View style={styles.lessonSection}>
                      {sectionPlan.examples.map((example, exampleIndex) => (
                        <View key={example.id} style={styles.exampleBlock}>
                          <Text style={styles.exampleLabel}>
                            Step {exampleIndex + 1}
                          </Text>
                          <Text style={styles.exampleText}>
                            {example.explanation}
                          </Text>
                          <LessonVisual
                            model={example.visualModel}
                            numbers={example.visualNumbers}
                          />
                        </View>
                      ))}
                    </View>

                    <View style={styles.lessonSection}>
                      <Text style={styles.sectionTitle}>Practice</Text>
                      {sectionPlan.practice.map((question, practiceIndex) => (
                        <QuestionBlock
                          key={question.id}
                          disabled={isSubmittingAnswer}
                          index={practiceIndex}
                          label="Practice"
                          onAnswer={handleAnswer}
                          question={question}
                          selectedAnswer={selectedAnswers[question.id]}
                        />
                      ))}
                    </View>

                    <View style={styles.quizSection}>
                      <Text style={styles.sectionTitle}>Quiz</Text>
                      {sectionPlan.quiz.map((question, index) => (
                        <QuestionBlock
                          key={question.id}
                          disabled={isSubmittingAnswer}
                          index={index}
                          label="Question"
                          onAnswer={handleAnswer}
                          question={question}
                          selectedAnswer={selectedAnswers[question.id]}
                        />
                      ))}
                    </View>

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
              )}
            </View>
          </>
        ) : null}
      </ScrollView>

      {bottomNavigation}
    </View>
  );
}

function BottomNav({
  selectedMode,
  showGames,
  showGrades,
  showProfile,
  showTopics,
}: {
  selectedMode: HomeMode;
  showGames: () => void;
  showGrades: () => void;
  showProfile: () => void;
  showTopics: () => void;
}) {
  return (
    <View style={styles.bottomNav}>
      <NavTab
        active={selectedMode === "topics"}
        icon="○"
        label="Topics"
        onPress={showTopics}
      />
      <NavTab
        active={selectedMode === "grades"}
        icon="△"
        label="Grades"
        onPress={showGrades}
      />
      <NavTab
        active={selectedMode === "games"}
        icon="□"
        label="Games"
        onPress={showGames}
      />
      <NavTab
        active={selectedMode === "profile"}
        icon="◔"
        label="Profile"
        onPress={showProfile}
      />
    </View>
  );
}

function NavTab({
  active,
  icon,
  label,
  onPress,
}: {
  active: boolean;
  icon: string;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={[styles.navTab, active && styles.navTabActive]}
      onPress={onPress}
    >
      <Text style={[styles.navIcon, active && styles.navIconActive]}>
        {icon}
      </Text>
      <Text style={[styles.navLabel, active && styles.navLabelActive]}>
        {label}
      </Text>
    </Pressable>
  );
}
