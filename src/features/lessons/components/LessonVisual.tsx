import { Text, View } from "react-native";
import { styles } from "../../../styles/styles";
import type { VisualModel } from "../types";

const PLACE_NAMES = [
  "ones",
  "tens",
  "hundreds",
  "thousands",
  "ten thousands",
  "hundred thousands",
  "millions",
];
const MAX_NUMBER_LINE_TICK_COUNT = 11;
const COORDINATE_GRID_LINE_COUNT = 7;
const MAX_PROBABILITY_TILE_COUNT = 16;

export function LessonVisual({
  model,
  numbers,
}: {
  model: VisualModel;
  numbers: number[];
}) {
  if (model === "ten_frame") {
    const filled = numbers[0] ?? 0;
    const added = numbers[1] ?? 0;
    return (
      <View style={styles.tenFrame}>
        {Array.from({ length: 10 }, (_, index) => (
          <View
            key={index}
            style={[
              styles.tenCell,
              index < filled && styles.tenCellFilled,
              index >= filled && index < filled + added && styles.tenCellAdded,
            ]}
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
    const ticks = buildNumberLineTicks(start, start + jump);
    return (
      <View style={styles.numberLine}>
        {ticks.map((value) => (
          <View key={value} style={styles.numberTick}>
            <View style={styles.tickLine} />
            <Text style={styles.tickText}>{formatNumberLabel(value)}</Text>
          </View>
        ))}
        <Text style={styles.jumpText}>
          Start {formatNumberLabel(start)},{" "}
          {jump > 0 ? "jump forward" : "jump back"}{" "}
          {formatNumberLabel(Math.abs(jump))}
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

  if (model === "place_value_chart") {
    return <PlaceValueChart numbers={numbers} />;
  }

  if (model === "area_model") {
    return <AreaModel numbers={numbers} />;
  }

  if (model === "division_model") {
    return <DivisionModel numbers={numbers} />;
  }

  if (model === "fraction_bar") {
    return <FractionBarModel numbers={numbers} />;
  }

  if (model === "decimal_grid") {
    return <DecimalGrid numbers={numbers} />;
  }

  if (model === "volume_model") {
    return <VolumeModel numbers={numbers} />;
  }

  if (model === "expression_cards") {
    return <ExpressionCards numbers={numbers} />;
  }

  if (model === "measurement_conversion") {
    return <MeasurementConversion numbers={numbers} />;
  }

  if (model === "angle_model") {
    return <AngleModel numbers={numbers} />;
  }

  if (model === "line_geometry") {
    return <LineGeometry numbers={numbers} />;
  }

  if (model === "ratio_table") {
    return <RatioTable numbers={numbers} />;
  }

  if (model === "percent_bar") {
    return <PercentBar numbers={numbers} />;
  }

  if (model === "equation_balance") {
    return <EquationBalance numbers={numbers} />;
  }

  if (model === "coordinate_plane") {
    return <CoordinatePlaneModel numbers={numbers} />;
  }

  if (model === "circle_measure") {
    return <CircleMeasure numbers={numbers} />;
  }

  if (model === "probability_model") {
    return <ProbabilityModel numbers={numbers} />;
  }

  if (model === "data_distribution") {
    return <DataDistribution numbers={numbers} />;
  }

  return (
    <View style={styles.shapeRow}>
      <View style={styles.triangle} />
      <View style={styles.squareShape} />
      <View style={styles.circleShape} />
    </View>
  );
}

function PlaceValueChart({ numbers }: { numbers: number[] }) {
  const value = toNonNegativeInteger(numbers[0], 0);
  const highlightedPlace = toNonNegativeInteger(numbers[1], -1);
  const digits = String(value).split("");

  return (
    <View style={styles.placeValueChart}>
      <Text style={styles.placeValueNumber}>{formatWholeNumber(value)}</Text>
      <View style={styles.placeValueGrid}>
        {digits.map((digit, index) => {
          const placeFromRight = digits.length - index - 1;
          const placeName = PLACE_NAMES[placeFromRight] ?? "place";
          const digitValue = Number(digit) * 10 ** placeFromRight;

          return (
            <View
              key={`${digit}-${index}-${placeFromRight}`}
              style={[
                styles.placeValueCell,
                highlightedPlace === placeFromRight &&
                  styles.placeValueCellActive,
              ]}
            >
              <Text style={styles.placeValueDigit}>{digit}</Text>
              <Text style={styles.placeValueLabel}>{placeName}</Text>
              <Text style={styles.placeValueAmount}>
                {formatWholeNumber(digitValue)}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

function AreaModel({ numbers }: { numbers: number[] }) {
  if (numbers.length >= 4) {
    return <FractionAreaModel numbers={numbers} />;
  }

  const first = toNonNegativeInteger(numbers[0], 1);
  const second = toNonNegativeInteger(numbers[1], 1);
  const third =
    numbers.length >= 3 ? toNonNegativeInteger(numbers[2], 1) : null;

  if (third === null) {
    return (
      <View style={styles.areaModel}>
        <Text style={styles.areaTitle}>
          {first} x {second}
        </Text>
        <View style={styles.areaRow}>
          <View style={[styles.areaBlock, styles.areaBlockPrimary]}>
            <Text style={styles.areaBlockLabel}>
              {first} x {second}
            </Text>
            <Text style={styles.areaBlockValue}>{first * second}</Text>
          </View>
        </View>
      </View>
    );
  }

  const firstProduct = first * third;
  const secondProduct = second * third;

  return (
    <View style={styles.areaModel}>
      <Text style={styles.areaTitle}>
        {first + second} x {third}
      </Text>
      <View style={styles.areaRow}>
        <View style={[styles.areaBlock, styles.areaBlockPrimary]}>
          <Text style={styles.areaBlockLabel}>
            {first} x {third}
          </Text>
          <Text style={styles.areaBlockValue}>{firstProduct}</Text>
        </View>
        <View style={[styles.areaBlock, styles.areaBlockSecondary]}>
          <Text style={styles.areaBlockLabel}>
            {second} x {third}
          </Text>
          <Text style={styles.areaBlockValue}>{secondProduct}</Text>
        </View>
      </View>
      <Text style={styles.areaTotal}>
        Total: {formatWholeNumber(firstProduct + secondProduct)}
      </Text>
    </View>
  );
}

function FractionAreaModel({ numbers }: { numbers: number[] }) {
  const horizontalNumerator = toNonNegativeInteger(numbers[0], 0);
  const horizontalDenominator = Math.max(
    1,
    toNonNegativeInteger(numbers[1], 1),
  );
  const verticalNumerator = toNonNegativeInteger(numbers[2], 0);
  const verticalDenominator = Math.max(1, toNonNegativeInteger(numbers[3], 1));
  const rows = Array.from({ length: Math.min(verticalDenominator, 8) });
  const columns = Array.from({ length: Math.min(horizontalDenominator, 8) });

  return (
    <View style={styles.fractionAreaModel}>
      <Text style={styles.areaTitle}>
        {horizontalNumerator}/{horizontalDenominator} x {verticalNumerator}/
        {verticalDenominator}
      </Text>
      <View style={styles.fractionAreaGrid}>
        {rows.map((_, rowIndex) => (
          <View key={rowIndex} style={styles.fractionAreaRow}>
            {columns.map((__, columnIndex) => {
              const isFilled =
                columnIndex < horizontalNumerator &&
                rowIndex < verticalNumerator;

              return (
                <View
                  key={`${rowIndex}-${columnIndex}`}
                  style={[
                    styles.fractionAreaCell,
                    isFilled && styles.fractionAreaCellFilled,
                  ]}
                />
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
}

function DivisionModel({ numbers }: { numbers: number[] }) {
  const dividend = toNonNegativeInteger(numbers[0], 0);
  const divisor = Math.max(1, toNonNegativeInteger(numbers[1], 1));
  const quotient = toNonNegativeInteger(numbers[2], 0);
  const remainder = toNonNegativeInteger(numbers[3], 0);
  const used = divisor * quotient;

  return (
    <View style={styles.divisionModel}>
      <Text style={styles.divisionEquation}>
        {formatWholeNumber(dividend)} / {formatWholeNumber(divisor)}
      </Text>
      <View style={styles.divisionRow}>
        <View style={styles.divisionPill}>
          <Text style={styles.divisionPillValue}>{quotient}</Text>
          <Text style={styles.divisionPillLabel}>in each group</Text>
        </View>
        <View style={styles.divisionPill}>
          <Text style={styles.divisionPillValue}>
            {formatWholeNumber(used)}
          </Text>
          <Text style={styles.divisionPillLabel}>used</Text>
        </View>
        <View style={styles.divisionPill}>
          <Text style={styles.divisionPillValue}>{remainder}</Text>
          <Text style={styles.divisionPillLabel}>left over</Text>
        </View>
      </View>
    </View>
  );
}

function FractionBarModel({ numbers }: { numbers: number[] }) {
  const firstFraction = getFraction(numbers, 0);
  const secondFraction = numbers.length >= 4 ? getFraction(numbers, 2) : null;

  return (
    <View style={styles.fractionModel}>
      <FractionStrip fraction={firstFraction} label="A" />
      {secondFraction ? (
        <FractionStrip fraction={secondFraction} label="B" />
      ) : null}
    </View>
  );
}

function FractionStrip({
  fraction,
  label,
}: {
  fraction: { numerator: number; denominator: number };
  label: string;
}) {
  const wholeCount = Math.floor(fraction.numerator / fraction.denominator);
  const remainder = fraction.numerator % fraction.denominator;
  const wholeBars = Array.from({ length: Math.min(wholeCount, 2) });
  const shouldShowRemainder = remainder > 0 || wholeBars.length === 0;

  return (
    <View style={styles.fractionStrip}>
      <Text style={styles.fractionLabel}>
        {label}: {fraction.numerator}/{fraction.denominator}
      </Text>
      {wholeBars.map((_, index) => (
        <FractionSegments
          key={`${label}-whole-${index}`}
          denominator={fraction.denominator}
          numerator={fraction.denominator}
        />
      ))}
      {shouldShowRemainder ? (
        <FractionSegments
          denominator={fraction.denominator}
          numerator={remainder}
        />
      ) : null}
      {wholeCount > wholeBars.length ? (
        <Text style={styles.fractionMoreText}>
          + {wholeCount - wholeBars.length} more whole
        </Text>
      ) : null}
    </View>
  );
}

function FractionSegments({
  denominator,
  numerator,
}: {
  denominator: number;
  numerator: number;
}) {
  if (denominator > 12) {
    const fillPercent = Math.min(
      100,
      Math.round((numerator / denominator) * 100),
    );

    return (
      <View style={styles.fractionProgressBar}>
        <View
          style={[styles.fractionProgressFill, { width: `${fillPercent}%` }]}
        />
      </View>
    );
  }

  return (
    <View style={styles.fractionBar}>
      {Array.from({ length: denominator }, (_, index) => (
        <View
          key={index}
          style={[
            styles.fractionPart,
            index < numerator && styles.fractionPartFilled,
          ]}
        />
      ))}
    </View>
  );
}

function DecimalGrid({ numbers }: { numbers: number[] }) {
  const shaded = Math.min(100, Math.max(0, Math.round(numbers[0] ?? 0)));

  return (
    <View style={styles.decimalGridModel}>
      <View style={styles.decimalGrid}>
        {Array.from({ length: 100 }, (_, index) => (
          <View
            key={index}
            style={[
              styles.decimalGridCell,
              index < shaded && styles.decimalGridCellFilled,
            ]}
          />
        ))}
      </View>
      <Text style={styles.decimalGridLabel}>{shaded}/100</Text>
    </View>
  );
}

function VolumeModel({ numbers }: { numbers: number[] }) {
  const length = Math.min(6, Math.max(1, toNonNegativeInteger(numbers[0], 1)));
  const width = Math.min(5, Math.max(1, toNonNegativeInteger(numbers[1], 1)));
  const height = Math.min(5, Math.max(1, toNonNegativeInteger(numbers[2], 1)));
  const baseCellCount = length * width;

  return (
    <View style={styles.volumeModel}>
      <Text style={styles.areaTitle}>
        {length} x {width} x {height}
      </Text>
      <View style={[styles.volumeBase, { width: length * 30 }]}>
        {Array.from({ length: baseCellCount }, (_, index) => (
          <View key={index} style={styles.volumeCube} />
        ))}
      </View>
      <Text style={styles.areaTotal}>
        {height} layer{height === 1 ? "" : "s"}: {length * width * height} cubic
        units
      </Text>
    </View>
  );
}

function ExpressionCards({ numbers }: { numbers: number[] }) {
  return (
    <View style={styles.expressionCards}>
      {numbers.map((number, index) => (
        <View
          key={`${number}-${index}`}
          style={[
            styles.expressionCard,
            index % 2 === 1 && styles.expressionOperatorCard,
          ]}
        >
          <Text style={styles.expressionCardText}>
            {getExpressionToken(number, index)}
          </Text>
        </View>
      ))}
    </View>
  );
}

function MeasurementConversion({ numbers }: { numbers: number[] }) {
  const quantity = toNonNegativeInteger(numbers[0], 0);
  const factor = toNonNegativeInteger(numbers[1], 1);
  const product = toNonNegativeInteger(numbers[2], quantity * factor);

  return (
    <View style={styles.measurementConversion}>
      <View style={styles.measurementTerm}>
        <Text style={styles.measurementTermValue}>{quantity}</Text>
        <Text style={styles.measurementTermLabel}>units</Text>
      </View>
      <Text style={styles.measurementOperator}>x</Text>
      <View style={styles.measurementTerm}>
        <Text style={styles.measurementTermValue}>{factor}</Text>
        <Text style={styles.measurementTermLabel}>per unit</Text>
      </View>
      <Text style={styles.measurementOperator}>=</Text>
      <View style={[styles.measurementTerm, styles.measurementTermResult]}>
        <Text style={styles.measurementTermValue}>{product}</Text>
        <Text style={styles.measurementTermLabel}>total</Text>
      </View>
    </View>
  );
}

function AngleModel({ numbers }: { numbers: number[] }) {
  const firstAngle = clampAngle(numbers[0] ?? 0);
  const secondAngle = numbers.length >= 2 ? clampAngle(numbers[1] ?? 0) : 0;
  const totalAngle = clampAngle(firstAngle + secondAngle);
  const displayAngle = secondAngle > 0 ? totalAngle : firstAngle;

  return (
    <View style={styles.angleModel}>
      <View style={styles.angleCanvas}>
        <View style={styles.angleVertex} />
        <View style={[styles.angleRay, styles.angleRayBase]} />
        <View
          style={[
            styles.angleRay,
            styles.angleRayRotated,
            { transform: [{ rotate: `${-displayAngle}deg` }] },
          ]}
        />
        {secondAngle > 0 ? (
          <Text style={styles.anglePartText}>
            {firstAngle} + {secondAngle}
          </Text>
        ) : null}
      </View>
      <Text style={styles.angleMeasureText}>{displayAngle} degrees</Text>
    </View>
  );
}

function LineGeometry({ numbers }: { numbers: number[] }) {
  const kind = toNonNegativeInteger(numbers[0], 0);

  if (kind === 1) {
    return (
      <View style={styles.lineGeometry}>
        <View style={[styles.geometryLine, styles.geometryHorizontalLine]} />
        <View style={[styles.geometryLine, styles.geometryVerticalLine]} />
        <Text style={styles.geometryLabel}>perpendicular</Text>
      </View>
    );
  }

  if (kind === 2) {
    return (
      <View style={styles.lineGeometry}>
        <View style={[styles.geometryLine, styles.geometryDiagonalLineA]} />
        <View style={[styles.geometryLine, styles.geometryDiagonalLineB]} />
        <Text style={styles.geometryLabel}>intersecting</Text>
      </View>
    );
  }

  return (
    <View style={styles.lineGeometry}>
      <View style={[styles.geometryLine, styles.geometryParallelLineTop]} />
      <View style={[styles.geometryLine, styles.geometryParallelLineBottom]} />
      <Text style={styles.geometryLabel}>parallel</Text>
    </View>
  );
}

function RatioTable({ numbers }: { numbers: number[] }) {
  const pairs = buildNumberPairs(numbers);

  return (
    <View style={styles.ratioTable}>
      <View style={[styles.ratioTableRow, styles.ratioTableHeader]}>
        <Text style={styles.ratioTableHeaderText}>input</Text>
        <Text style={styles.ratioTableHeaderText}>output</Text>
      </View>
      {pairs.map(([input, output], index) => (
        <View key={`${input}-${output}-${index}`} style={styles.ratioTableRow}>
          <Text style={styles.ratioTableValue}>{formatNumberLabel(input)}</Text>
          <Text style={styles.ratioTableValue}>
            {formatNumberLabel(output)}
          </Text>
        </View>
      ))}
    </View>
  );
}

function PercentBar({ numbers }: { numbers: number[] }) {
  const percent = numbers[0] ?? 0;
  const whole = numbers[1] ?? 100;
  const fillPercent = clampPercent(percent);

  return (
    <View style={styles.percentModel}>
      <Text style={styles.percentTitle}>
        {formatNumberLabel(percent)}% of {formatNumberLabel(whole)}
      </Text>
      <View style={styles.percentBarTrack}>
        <View style={[styles.percentBarFill, { width: `${fillPercent}%` }]} />
      </View>
      <Text style={styles.percentCaption}>
        shaded: {formatNumberLabel(percent)}%
      </Text>
    </View>
  );
}

function EquationBalance({ numbers }: { numbers: number[] }) {
  const coefficient = numbers[0] ?? 1;
  const constant = numbers[1] ?? 0;
  const target = numbers[2] ?? 0;
  const hasTarget = target !== 0;

  return (
    <View style={styles.equationBalance}>
      <View style={styles.equationSide}>
        <Text style={styles.equationExpression}>
          {formatLinearExpression(coefficient, constant)}
        </Text>
        <Text style={styles.equationLabel}>expression</Text>
      </View>
      {hasTarget ? (
        <>
          <Text style={styles.equationOperator}>=</Text>
          <View style={[styles.equationSide, styles.equationSideResult]}>
            <Text style={styles.equationExpression}>
              {formatNumberLabel(target)}
            </Text>
            <Text style={styles.equationLabel}>target</Text>
          </View>
        </>
      ) : (
        <Text style={styles.equationOperator}>simplify</Text>
      )}
    </View>
  );
}

function CoordinatePlaneModel({ numbers }: { numbers: number[] }) {
  const x = numbers[0] ?? 0;
  const y = numbers[1] ?? 0;
  const axisMax = Math.max(1, Math.ceil(Math.max(x, y, 6)));
  const leftPercent = clampPercent((x / axisMax) * 100);
  const bottomPercent = clampPercent((y / axisMax) * 100);
  const gridLines = Array.from({ length: COORDINATE_GRID_LINE_COUNT });

  return (
    <View style={styles.coordinateModel}>
      <View style={styles.coordinatePlane}>
        {gridLines.map((_, index) => {
          const offset = formatPercentDimension(
            (index / (COORDINATE_GRID_LINE_COUNT - 1)) * 100,
          );

          return (
            <View key={index}>
              <View
                style={[styles.coordinateGridLineVertical, { left: offset }]}
              />
              <View
                style={[
                  styles.coordinateGridLineHorizontal,
                  { bottom: offset },
                ]}
              />
            </View>
          );
        })}
        <View
          style={[
            styles.coordinatePoint,
            {
              bottom: formatPercentDimension(bottomPercent),
              left: formatPercentDimension(leftPercent),
            },
          ]}
        />
      </View>
      <Text style={styles.coordinateLabel}>
        ({formatNumberLabel(x)}, {formatNumberLabel(y)})
      </Text>
    </View>
  );
}

function CircleMeasure({ numbers }: { numbers: number[] }) {
  const radius = Math.max(0, numbers[0] ?? 0);
  const diameter = numbers[1] ?? radius * 2;

  return (
    <View style={styles.circleMeasure}>
      <View style={styles.circleDiagram}>
        <View style={styles.circleRadiusLine} />
        <Text style={styles.circleRadiusLabel}>
          r = {formatNumberLabel(radius)}
        </Text>
      </View>
      <Text style={styles.circleMeasureText}>
        d = {formatNumberLabel(diameter)}
      </Text>
    </View>
  );
}

function ProbabilityModel({ numbers }: { numbers: number[] }) {
  const favorable = toNonNegativeInteger(numbers[0], 0);
  const total = Math.max(1, toNonNegativeInteger(numbers[1], 1));
  const visibleTotal = Math.min(total, MAX_PROBABILITY_TILE_COUNT);
  const visibleFavorable = Math.round((favorable / total) * visibleTotal);

  return (
    <View style={styles.probabilityModel}>
      <Text style={styles.probabilityTitle}>
        {favorable} favorable out of {total}
      </Text>
      <View style={styles.probabilityTiles}>
        {Array.from({ length: visibleTotal }, (_, index) => (
          <View
            key={index}
            style={[
              styles.probabilityTile,
              index < visibleFavorable && styles.probabilityTileActive,
            ]}
          />
        ))}
      </View>
      {total > visibleTotal ? (
        <Text style={styles.probabilityCaption}>
          scaled to {visibleTotal} tiles
        </Text>
      ) : null}
    </View>
  );
}

function DataDistribution({ numbers }: { numbers: number[] }) {
  const values = numbers.length > 0 ? numbers : [0];

  return (
    <View style={styles.dataDistribution}>
      <View style={styles.dataPointRow}>
        {values.map((value, index) => (
          <View key={`${value}-${index}`} style={styles.dataPoint}>
            <Text style={styles.dataPointText}>{formatNumberLabel(value)}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.dataDistributionCaption}>
        {values.length} value{values.length === 1 ? "" : "s"}
      </Text>
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

function getFraction(numbers: number[], startIndex: number) {
  return {
    numerator: toNonNegativeInteger(numbers[startIndex], 0),
    denominator: Math.max(1, toNonNegativeInteger(numbers[startIndex + 1], 1)),
  };
}

function toNonNegativeInteger(value: number | undefined, fallback: number) {
  if (value === undefined || !Number.isFinite(value)) {
    return fallback;
  }

  return Math.max(0, Math.trunc(value));
}

function clampAngle(value: number) {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.min(180, Math.max(0, Math.trunc(value)));
}

function clampPercent(value: number) {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.min(100, Math.max(0, value));
}

function buildNumberPairs(numbers: number[]) {
  const pairs: [number, number][] = [];

  for (let index = 0; index < numbers.length - 1; index += 2) {
    const input = numbers[index];
    const output = numbers[index + 1];

    if (
      input !== undefined &&
      output !== undefined &&
      Number.isFinite(input) &&
      Number.isFinite(output)
    ) {
      pairs.push([input, output]);
    }
  }

  return pairs.length > 0 ? pairs : [[0, 0]];
}

function formatLinearExpression(coefficient: number, constant: number) {
  const coefficientText =
    coefficient === 1 ? "x" : `${formatNumberLabel(coefficient)}x`;

  if (constant === 0) {
    return coefficientText;
  }

  const operator = constant > 0 ? "+" : "-";

  return `${coefficientText} ${operator} ${formatNumberLabel(Math.abs(constant))}`;
}

function buildNumberLineTicks(start: number, end: number) {
  const min = Math.floor(Math.min(0, start, end));
  const max = Math.ceil(Math.max(0, start, end));
  const span = max - min;

  if (span <= MAX_NUMBER_LINE_TICK_COUNT - 1) {
    return Array.from({ length: span + 1 }, (_, index) => min + index);
  }

  const step = Math.ceil(span / (MAX_NUMBER_LINE_TICK_COUNT - 1));
  const ticks = Array.from(
    { length: Math.floor(span / step) + 1 },
    (_, index) => min + index * step,
  );

  if (ticks[ticks.length - 1] !== max) {
    ticks.push(max);
  }

  return ticks;
}

function formatNumberLabel(value: number) {
  if (Number.isInteger(value)) {
    return String(value);
  }

  return value.toFixed(2).replace(/\.?0+$/, "");
}

function formatPercentDimension(value: number): `${number}%` {
  return `${value}%`;
}

function formatWholeNumber(value: number) {
  return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function formatNumericValue(value: number) {
  if (Number.isInteger(value)) {
    return formatWholeNumber(value);
  }

  return formatNumberLabel(value);
}

function getExpressionToken(value: number, index: number) {
  if (index % 2 === 1) {
    if (value === 1) {
      return "x";
    }

    if (value === 2) {
      return "/";
    }

    if (value === 3) {
      return "+";
    }

    if (value === 4) {
      return "-";
    }

    if (value === 5) {
      return "=";
    }
  }

  return formatNumericValue(value);
}
