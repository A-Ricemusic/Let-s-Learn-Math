import { Pressable, Text, View } from "react-native";
import { styles } from "../../../styles/styles";
import type { SectionQuestion } from "../types";
import { LessonVisual } from "./LessonVisual";

export function QuestionBlock({
  disabled,
  index,
  label,
  onAnswer,
  question,
  selectedAnswer,
}: {
  disabled: boolean;
  index: number;
  label: string;
  onAnswer: (question: SectionQuestion, answer: string) => void;
  question: SectionQuestion;
  selectedAnswer?: string;
}) {
  return (
    <View style={styles.questionBlock}>
      <Text style={styles.exampleLabel}>
        {label} {index + 1}
      </Text>
      <LessonVisual
        model={question.visualModel}
        numbers={question.visualNumbers}
      />
      <Text style={styles.practicePrompt}>{question.prompt}</Text>
      <View style={styles.choiceRow}>
        {question.choices.map((choice) => {
          const isChosen = selectedAnswer === choice;
          const isCorrect = choice === question.correctAnswer;

          return (
            <Pressable
              key={choice}
              disabled={disabled}
              style={[
                styles.choiceButton,
                isChosen && isCorrect && styles.choiceCorrect,
                isChosen && !isCorrect && styles.choiceIncorrect,
                disabled && styles.disabledButton,
              ]}
              onPress={() => onAnswer(question, choice)}
            >
              <Text style={styles.choiceButtonText}>{choice}</Text>
            </Pressable>
          );
        })}
      </View>
      {selectedAnswer ? (
        <Text style={styles.feedbackText}>
          {selectedAnswer === question.correctAnswer
            ? "Yes. That is right."
            : "Try again. Look at the picture."}
        </Text>
      ) : null}
    </View>
  );
}
