import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Check } from "lucide-react-native";
import { colors } from "../theme";
import type { CalendarEntry } from "../types";

type Props = {
  day: number;
  entry?: CalendarEntry;
  selected?: boolean;
  onPress: () => void;
};

export const CalendarDay = ({ day, entry, selected, onPress }: Props) => {
  const completed = entry?.status === "completed";
  const skipped = entry?.status === "skipped";

  return (
    <Pressable onPress={onPress} style={[styles.day, completed && styles.completed, skipped && styles.skipped, selected && styles.selected]}>
      <Text style={[styles.dayText, completed && styles.completedText]}>{day}</Text>
      {completed ? (
        <View style={styles.check}>
          <Check size={10} color={colors.white} strokeWidth={3} />
        </View>
      ) : skipped ? (
        <View style={styles.missedDot} />
      ) : (
        <View style={styles.neutralDot} />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  day: {
    width: "13.2%",
    aspectRatio: 1,
    margin: "0.55%",
    borderRadius: 16,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.softGrey
  },
  completed: {
    backgroundColor: colors.green100,
    borderColor: colors.green300
  },
  skipped: {
    backgroundColor: "#FBF3F1",
    borderColor: colors.redSoft
  },
  selected: {
    borderColor: colors.green700,
    borderWidth: 2
  },
  dayText: {
    color: colors.darkGrey,
    fontSize: 14,
    fontWeight: "900"
  },
  completedText: {
    color: colors.green900
  },
  check: {
    position: "absolute",
    bottom: 6,
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.green600
  },
  missedDot: {
    position: "absolute",
    bottom: 8,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.redText
  },
  neutralDot: {
    position: "absolute",
    bottom: 8,
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.softGrey
  }
});
