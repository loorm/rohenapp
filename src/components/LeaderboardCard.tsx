import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { Award } from "lucide-react-native";
import { colors, shadows } from "../theme";
import type { LeaderboardUser } from "../types";

type Props = {
  user: LeaderboardUser;
  index: number;
};

export const LeaderboardCard = ({ user, index }: Props) => {
  const translateY = useRef(new Animated.Value(16)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 260 + index * 80, useNativeDriver: true }),
      Animated.spring(translateY, { toValue: 0, delay: index * 55, friction: 8, useNativeDriver: true })
    ]).start();
  }, [index, opacity, translateY]);

  const medalColor = user.rank === 1 ? colors.gold : user.rank === 2 ? "#A8B0A6" : user.rank === 3 ? colors.green600 : colors.grey;

  return (
    <Animated.View style={[styles.card, user.isCurrentUser && styles.current, { opacity, transform: [{ translateY }] }]}>
      <View style={[styles.rank, { backgroundColor: `${medalColor}22` }]}>
        <Award size={18} color={medalColor} />
        <Text style={[styles.rankText, { color: medalColor }]}>#{user.rank}</Text>
      </View>
      <View style={[styles.avatar, user.isCurrentUser && styles.currentAvatar]}>
        <Text style={styles.avatarText}>{user.avatar}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.meta}>{user.totalCo2Reduced.toFixed(1)} kg CO₂ vähendatud</Text>
      </View>
      <View style={styles.points}>
        <Text style={styles.pointsValue}>{user.totalPoints}</Text>
        <Text style={styles.pointsLabel}>punkti</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderRadius: 22,
    backgroundColor: colors.white,
    padding: 14,
    marginBottom: 12,
    ...shadows.soft
  },
  current: {
    borderWidth: 1.5,
    borderColor: colors.green300,
    backgroundColor: "#FBFFFC"
  },
  rank: {
    width: 44,
    height: 44,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center"
  },
  rankText: {
    fontSize: 11,
    fontWeight: "900"
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 16,
    backgroundColor: colors.green150,
    alignItems: "center",
    justifyContent: "center"
  },
  currentAvatar: {
    backgroundColor: colors.green600
  },
  avatarText: {
    color: colors.green900,
    fontSize: 17,
    fontWeight: "900"
  },
  info: {
    flex: 1
  },
  name: {
    color: colors.darkGrey,
    fontSize: 15,
    fontWeight: "900"
  },
  meta: {
    marginTop: 3,
    color: colors.grey,
    fontSize: 12,
    fontWeight: "700"
  },
  points: {
    alignItems: "flex-end"
  },
  pointsValue: {
    color: colors.green700,
    fontSize: 16,
    fontWeight: "900"
  },
  pointsLabel: {
    color: colors.grey,
    fontSize: 11,
    fontWeight: "700"
  }
});
