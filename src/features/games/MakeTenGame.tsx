import { useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { styles } from "../../styles/styles";

type MakeTenPair = {
  readonly id: string;
  readonly left: number;
  readonly right: number;
};

const MAKE_TEN_PAIRS: readonly MakeTenPair[] = [
  { id: "0-10", left: 0, right: 10 },
  { id: "1-9", left: 1, right: 9 },
  { id: "2-8", left: 2, right: 8 },
  { id: "3-7", left: 3, right: 7 },
  { id: "4-6", left: 4, right: 6 },
  { id: "5-5", left: 5, right: 5 },
];

const NUMBER_TILES = [0, 1, 2, 3, 4, 5, 5, 6, 7, 8, 9, 10] as const;

type NumberTile = {
  readonly id: string;
  readonly value: number;
};

function buildTiles() {
  return NUMBER_TILES.map((value, index) => ({
    id: `${value}-${index}`,
    value,
  }));
}

function pairIdForValues(first: number, second: number) {
  const low = Math.min(first, second);
  const high = Math.max(first, second);

  return `${low}-${high}`;
}

export function MakeTenGame() {
  const [selectedTileIds, setSelectedTileIds] = useState<readonly string[]>([]);
  const [matchedPairIds, setMatchedPairIds] = useState<readonly string[]>([]);
  const [feedback, setFeedback] = useState("Pick two numbers that make 10.");
  const tiles = useMemo(buildTiles, []);
  const matchedPairSet = useMemo(
    () => new Set(matchedPairIds),
    [matchedPairIds],
  );
  const isRoundComplete = matchedPairIds.length === MAKE_TEN_PAIRS.length;

  const chooseTile = (tile: NumberTile) => {
    if (isRoundComplete || selectedTileIds.includes(tile.id)) {
      return;
    }

    if (selectedTileIds.length === 0) {
      setSelectedTileIds([tile.id]);
      setFeedback(`${tile.value} needs ${10 - tile.value} to make 10.`);
      return;
    }

    const firstTile = tiles.find(
      (candidate) => candidate.id === selectedTileIds[0],
    );

    if (!firstTile) {
      setSelectedTileIds([]);
      setFeedback("Pick two numbers that make 10.");
      return;
    }

    const total = firstTile.value + tile.value;
    const pairId = pairIdForValues(firstTile.value, tile.value);

    if (total === 10 && !matchedPairSet.has(pairId)) {
      setMatchedPairIds((current) => [...current, pairId]);
      setSelectedTileIds([]);
      setFeedback(`${firstTile.value} + ${tile.value} = 10`);
      return;
    }

    if (total === 10) {
      setSelectedTileIds([]);
      setFeedback("That pair already made 10. Find another one.");
      return;
    }

    setSelectedTileIds([]);
    setFeedback(`${firstTile.value} + ${tile.value} = ${total}. Try again.`);
  };

  const resetGame = () => {
    setSelectedTileIds([]);
    setMatchedPairIds([]);
    setFeedback("Pick two numbers that make 10.");
  };

  return (
    <View style={styles.makeTenPanel}>
      <View style={styles.makeTenHeader}>
        <View>
          <Text style={styles.lessonTitle}>Make 10</Text>
          <Text style={styles.lessonExplain}>
            Match every number pair that adds up to 10.
          </Text>
        </View>
        <View style={styles.makeTenScorePill}>
          <Text style={styles.makeTenScoreText}>
            {matchedPairIds.length}/{MAKE_TEN_PAIRS.length}
          </Text>
        </View>
      </View>

      <View style={styles.makeTenTarget}>
        <Text style={styles.makeTenTargetNumber}>10</Text>
      </View>

      <Text style={styles.makeTenFeedback}>
        {isRoundComplete ? "You found every way to make 10." : feedback}
      </Text>

      <View style={styles.makeTenTileGrid}>
        {tiles.map((tile) => {
          const isSelected = selectedTileIds.includes(tile.id);

          return (
            <Pressable
              key={tile.id}
              style={[
                styles.makeTenTile,
                isSelected ? styles.makeTenTileSelected : null,
              ]}
              onPress={() => chooseTile(tile)}
            >
              <Text style={styles.makeTenTileText}>{tile.value}</Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.makeTenPairGrid}>
        {MAKE_TEN_PAIRS.map((pair) => {
          const isMatched = matchedPairSet.has(pair.id);

          return (
            <View
              key={pair.id}
              style={[
                styles.makeTenPairCard,
                isMatched ? styles.makeTenPairCardMatched : null,
              ]}
            >
              <Text style={styles.makeTenPairText}>
                {isMatched ? `${pair.left} + ${pair.right}` : "? + ?"}
              </Text>
            </View>
          );
        })}
      </View>

      <Pressable style={styles.primaryButton} onPress={resetGame}>
        <Text style={styles.primaryButtonText}>New round</Text>
      </Pressable>
    </View>
  );
}
