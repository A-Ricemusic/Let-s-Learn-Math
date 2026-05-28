import { useAuth, useUser } from "@clerk/clerk-expo";
import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { api } from "../../../convex/_generated/api";
import { styles } from "../../styles/styles";
import { getErrorMessage } from "../../utils/errors";
import { LessonVisual } from "../lessons/components/LessonVisual";
import { QuestionBlock } from "../lessons/components/QuestionBlock";
import { buildSectionPlan } from "../lessons/plan";
import type { SectionQuestion } from "../lessons/types";

type HomeMode = "home" | "games" | "lessons";

export function SignedInHome() {
  const { signOut } = useAuth();
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { user } = useUser();
  const grades = useQuery(api.curriculum.grades, isAuthenticated ? {} : "skip");
  const [selectedMode, setSelectedMode] = useState<HomeMode>("home");
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
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(
    null,
  );
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, string>
  >({});
  const [isSubmittingAnswer, setIsSubmittingAnswer] = useState(false);
  const [lessonError, setLessonError] = useState<string | null>(null);

  const sections = curriculum?.units ?? [];
  const selectedSection =
    sections.find((section) => section.id === selectedSectionId) ?? null;
  const selectedProgress = progress?.find(
    (row) => row.lessonId === selectedSection?.id,
  );
  const masteredLessons =
    progress?.filter((row) => row.status === "mastered").length ?? 0;
  const totalLessons = sections.length;
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

  const goHome = () => {
    setSelectedMode("home");
    setSelectedGradeLevel(null);
    setSelectedSectionId(null);
    setSelectedAnswers({});
    setLessonError(null);
  };

  const chooseLessons = () => {
    setSelectedMode("lessons");
    setSelectedGradeLevel(null);
    setSelectedSectionId(null);
    setSelectedAnswers({});
    setLessonError(null);
  };

  const chooseGrade = (gradeLevel: number) => {
    setSelectedGradeLevel(gradeLevel);
    setSelectedSectionId(null);
    setSelectedAnswers({});
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
      progress !== undefined ? (
        <>
          <Pressable
            style={styles.backButton}
            onPress={() => {
              setSelectedGradeLevel(null);
              setSelectedSectionId(null);
              setSelectedAnswers({});
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
                        <Text style={styles.lessonButtonGoal}>{unit.goal}</Text>
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

                  {sectionPlan.examples.map((exampleGroup, exampleIndex) => (
                    <View
                      key={exampleGroup.example.id}
                      style={styles.exampleBlock}
                    >
                      <Text style={styles.exampleLabel}>
                        Example {exampleIndex + 1}
                      </Text>
                      <Text style={styles.exampleText}>
                        {exampleGroup.example.explanation}
                      </Text>
                      <LessonVisual
                        model={exampleGroup.example.visualModel}
                        numbers={exampleGroup.example.visualNumbers}
                      />

                      <Text style={styles.sectionTitle}>Practice</Text>
                      {exampleGroup.practice.map((question, practiceIndex) => (
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
                  ))}

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
  );
}
