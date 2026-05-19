import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { Gift, Lock, Sparkles } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors, shadows } from "../theme";
import type { Reward } from "../types";

type Props = {
  reward: Reward;
  points: number;
};

export const RewardCard = ({ reward, points }: Props) => {
  const unlocked = points >= reward.points;
  const scale = useRef(new Animated.Value(0.98)).current;

  useEffect(() => {
    Animated.spring(scale, { toValue: unlocked ? 1.02 : 1, friction: 7, tension: 70, useNativeDriver: true }).start();
  }, [scale, unlocked]);

  return (
    <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
      <LinearGradient colors={unlocked ? [colors.green600, colors.green900] : [colors.white, colors.mist]} style={styles.gradient}>
        <View style={[styles.icon, unlocked && styles.iconUnlocked]}>
          {unlocked ? <Sparkles size={23} color={colors.white} /> : <Lock size={23} color={colors.grey} />}
        </View>
        <View style={styles.info}>
          <Text style={[styles.title, unlocked && styles.unlockedText]}>{reward.title}</Text>
          <Text style={[styles.meta, unlocked && styles.unlockedMeta]}>{reward.points} punkti = {reward.euros}€</Text>
        </View>
        <View style={[styles.badge, unlocked && styles.badgeUnlocked]}>
          <Gift size={15} color={unlocked ? colors.green900 : colors.green600} />
          <Text style={[styles.badgeText, unlocked && styles.badgeTextUnlocked]}>{unlocked ? "Avatud" : "Lukus"}</Text>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    marginBottom: 14,
    overflow: "hidden",
    ...shadows.soft
  },
  gradient: {
    minHeight: 96,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 16
  },
  icon: {
    width: 48,
    height: 48,
    borderRadius: 18,
    backgroundColor: colors.softGrey,
    alignItems: "center",
    justifyContent: "center"
  },
  iconUnlocked: {
    backgroundColor: "rgba(255,255,255,0.18)"
  },
  info: {
    flex: 1
  },
  title: {
    color: colors.darkGrey,
    fontSize: 16,
    fontWeight: "900"
  },
  meta: {
    marginTop: 4,
    color: colors.grey,
    fontSize: 13,
    fontWeight: "800"
  },
  unlockedText: {
    color: colors.white
  },
  unlockedMeta: {
    color: "rgba(255,255,255,0.76)"
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: colors.green100,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 8
  },
  badgeUnlocked: {
    backgroundColor: colors.white
  },
  badgeText: {
    color: colors.green700,
    fontSize: 12,
    fontWeight: "900"
  },
  badgeTextUnlocked: {
    color: colors.green900
  }
});
