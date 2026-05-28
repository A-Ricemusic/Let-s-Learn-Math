import { Text, View } from "react-native";
import { styles } from "../../../styles/styles";
import type { VisualModel } from "../types";

export function LessonVisual({
  model,
  numbers,
}: {
  model: VisualModel;
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
    const ticks = Array.from({ length: 21 }, (_, value) => value);
    return (
      <View style={styles.numberLine}>
        {ticks.map((value) => (
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
