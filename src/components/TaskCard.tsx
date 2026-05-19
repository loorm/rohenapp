import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { CheckCircle2, Clock3, Leaf, Zap } from "lucide-react-native";
import { colors, shadows } from "../theme";
import type { EcoTask } from "../types";

type Props = {
  task: EcoTask;
  large?: boolean;
};

const statusText = {
  pending: "Ootel",
  completed: "Tehtud",
  skipped: "Vahele jäetud"
};

export const TaskCard = ({ task, large }: Props) => {
  const scale = useRef(new Animated.Value(0.96)).current;

  useEffect(() => {
    Animated.spring(scale, { toValue: 1, friction: 8, tension: 70, useNativeDriver: true }).start();
  }, [scale, task.id]);

  return (
    <Animated.View style={[styles.card, large && styles.large, { transform: [{ scale }] }]}>
      <View style={styles.topRow}>
        <View style={styles.category}>
          <Leaf size={14} color={colors.green700} />
          <Text style={styles.categoryText}>{task.category}</Text>
        </View>
        <View style={[styles.status, task.status === "completed" && styles.statusDone, task.status === "skipped" && styles.statusSkipped]}>
          <Text style={[styles.statusText, task.status === "skipped" && styles.statusSkippedText]}>{statusText[task.status]}</Text>
        </View>
      </View>
      <Text style={[styles.title, large && styles.largeTitle]}>{task.title}</Text>
      <Text style={styles.description}>{task.description}</Text>
      <View style={styles.metaRow}>
        <View style={styles.meta}>
          <Zap size={15} color={colors.green600} />
          <Text style={styles.metaText}>{task.points} punkti</Text>
        </View>
        <View style={styles.meta}>
          <CheckCircle2 size={15} color={colors.green600} />
          <Text style={styles.metaText}>{task.co2ReductionKg.toFixed(1)} kg CO₂</Text>
        </View>
        <View style={styles.meta}>
          <Clock3 size={15} color={colors.green600} />
          <Text style={styles.metaText}>{task.estimatedTime}</Text>
        </View>
      </View>
      <Text style={styles.difficulty}>{task.difficulty}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    backgroundColor: colors.white,
    padding: 18,
    marginBottom: 14,
    ...shadows.soft
  },
  large: {
    padding: 20,
    marginBottom: 0
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12
  },
  category: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.green100,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 999
  },
  categoryText: {
    color: colors.green700,
    fontSize: 12,
    fontWeight: "800"
  },
  status: {
    backgroundColor: colors.softGrey,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 999
  },
  statusDone: {
    backgroundColor: colors.green150
  },
  statusSkipped: {
    backgroundColor: "#F4E3DF"
  },
  statusText: {
    color: colors.graphite,
    fontSize: 12,
    fontWeight: "800"
  },
  statusSkippedText: {
    color: colors.redText
  },
  title: {
    marginTop: 15,
    color: colors.darkGrey,
    fontSize: 19,
    lineHeight: 24,
    fontWeight: "900"
  },
  largeTitle: {
    fontSize: 24,
    lineHeight: 30
  },
  description: {
    marginTop: 8,
    color: colors.graphite,
    fontSize: 14,
    lineHeight: 21
  },
  metaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 16
  },
  meta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: colors.mist,
    borderRadius: 12,
    paddingHorizontal: 9,
    paddingVertical: 8
  },
  metaText: {
    color: colors.graphite,
    fontSize: 12,
    fontWeight: "800"
  },
  difficulty: {
    marginTop: 12,
    color: colors.grey,
    fontSize: 12,
    fontWeight: "800"
  }
});
