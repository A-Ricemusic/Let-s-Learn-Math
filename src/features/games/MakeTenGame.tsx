import { useMutation } from "convex/react";
import type { ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Animated, Easing, Pressable, Text, View } from "react-native";
import { api } from "../../../convex/_generated/api";
import { styles } from "../../styles/styles";

const GAME_ID = "make-ten";
const ROUND_SECONDS = 120;
const ANSWER_OPTIONS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;

type MakeTenGameProps = {
  readonly bottomNavigation: ReactNode;
  readonly onExit: () => void;
};

function buildQuestion(previousLeft: number | null) {
  const next = Math.floor(Math.random() * 11);
  if (previousLeft === null || next !== previousLeft) {
    return next;
  }
  return (next + 1) % 11;
}

function formatClock(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

export function MakeTenGame({ bottomNavigation, onExit }: MakeTenGameProps) {
  const recordGameRun = useMutation(api.games.recordGameRun);
  const [leftNumber, setLeftNumber] = useState(() => buildQuestion(null));
  const [score, setScore] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(ROUND_SECONDS);
  const [isFinished, setIsFinished] = useState(false);
  const [feedback, setFeedback] = useState("Choose the missing number.");
  const [saveError, setSaveError] = useState<string | null>(null);
  const hasSavedRun = useRef(false);
  const celebration = useRef(new Animated.Value(0)).current;
  const correctAnswer = 10 - leftNumber;
  const options = useMemo(() => ANSWER_OPTIONS, []);

  useEffect(() => {
    if (isFinished) {
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft((current) => {
        if (current <= 1) {
          setIsFinished(true);
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [isFinished]);

  useEffect(() => {
    if (!isFinished || hasSavedRun.current) {
      return;
    }

    hasSavedRun.current = true;
    setSaveError(null);
    void recordGameRun({
      gameId: GAME_ID,
      score,
      durationSeconds: ROUND_SECONDS,
    }).catch(() => {
      setSaveError("Score could not be saved. Your run still counts here.");
    });
  }, [isFinished, recordGameRun, score]);

  useEffect(() => {
    if (!isFinished) {
      celebration.setValue(0);
      return;
    }

    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(celebration, {
          duration: 650,
          easing: Easing.out(Easing.quad),
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.timing(celebration, {
          duration: 650,
          easing: Easing.in(Easing.quad),
          toValue: 0,
          useNativeDriver: true,
        }),
      ]),
      { iterations: 4 },
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [celebration, isFinished]);

  const chooseAnswer = (answer: number) => {
    if (isFinished) {
      return;
    }

    if (answer !== correctAnswer) {
      setFeedback(`${leftNumber} needs ${correctAnswer}. Try again.`);
      return;
    }

    setScore((current) => current + 1);
    setFeedback(`${leftNumber} + ${answer} = 10`);
    setLeftNumber((current) => buildQuestion(current));
  };

  const resetGame = () => {
    hasSavedRun.current = false;
    setLeftNumber(buildQuestion(null));
    setScore(0);
    setSecondsLeft(ROUND_SECONDS);
    setIsFinished(false);
    setFeedback("Choose the missing number.");
    setSaveError(null);
  };

  return (
    <View style={styles.gameScreen}>
      <View style={styles.makeTenHeader}>
        <View>
          <Text style={styles.lessonTitle}>Make 10</Text>
          <Text style={styles.lessonExplain}>
            Find the number that finishes each ten.
          </Text>
        </View>
        <Pressable style={styles.backButton} onPress={onExit}>
          <Text style={styles.backButtonText}>Games</Text>
        </Pressable>
      </View>

      <View style={styles.gameHud}>
        <View style={styles.gameHudPill}>
          <Text style={styles.gameHudLabel}>Time</Text>
          <Text style={styles.gameHudValue}>{formatClock(secondsLeft)}</Text>
        </View>
        <View style={styles.gameHudPill}>
          <Text style={styles.gameHudLabel}>Score</Text>
          <Text style={styles.gameHudValue}>{score}</Text>
        </View>
      </View>

      {isFinished ? (
        <View style={styles.gameCompletePanel}>
          <Animated.Text
            style={[
              styles.celebrationText,
              {
                transform: [
                  {
                    scale: celebration.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.12],
                    }),
                  },
                ],
              },
            ]}
          >
            Great run!
          </Animated.Text>
          <Text style={styles.gameCompleteScore}>You've done {score}</Text>
          <Text style={styles.gameCompleteCopy}>
            That score was saved for your Game Stats.
          </Text>
          {saveError ? <Text style={styles.error}>{saveError}</Text> : null}
          <Pressable style={styles.primaryButton} onPress={resetGame}>
            <Text style={styles.primaryButtonText}>Play again</Text>
          </Pressable>
        </View>
      ) : (
        <>
          <View style={styles.makeTenEquation}>
            <Text style={styles.makeTenEquationText}>
              {leftNumber} + __ = 10
            </Text>
          </View>

          <Text style={styles.makeTenFeedback}>{feedback}</Text>

          <View style={styles.makeTenTileGrid}>
            {options.map((answer) => (
              <Pressable
                key={answer}
                style={styles.makeTenTile}
                onPress={() => chooseAnswer(answer)}
              >
                <Text style={styles.makeTenTileText}>{answer}</Text>
              </Pressable>
            ))}
          </View>
        </>
      )}
      {bottomNavigation}
    </View>
  );
}
