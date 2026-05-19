import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Crown, TrendingUp } from "lucide-react-native";
import { LeaderboardCard } from "../components/LeaderboardCard";
import { leaderboardUsers } from "../data/leaderboard";
import { colors, shadows } from "../theme";
import type { AppStateActions } from "../hooks/useAppState";

export const LeaderboardScreen = ({ stats }: AppStateActions) => {
  const users = leaderboardUsers.map((user) =>
    user.isCurrentUser ? { ...user, totalCo2Reduced: stats.totalCo2Reduced, totalPoints: stats.points } : user
  );

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <LinearGradient colors={[colors.green900, colors.green700, colors.green500]} style={styles.header}>
        <View style={styles.icon}>
          <Crown size={25} color={colors.white} />
        </View>
        <Text style={styles.title}>Edetabel</Text>
        <Text style={styles.subtitle}>Järjestus põhineb kogu vähendatud CO₂ kogusel.</Text>
        <View style={styles.statPill}>
          <TrendingUp size={16} color={colors.green900} />
          <Text style={styles.statPillText}>Sinu koht: #3</Text>
        </View>
      </LinearGradient>
      <View style={styles.list}>
        {users.map((user, index) => (
          <LeaderboardCard key={user.id} user={user} index={index} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  content: {
    paddingBottom: 110
  },
  header: {
    margin: 20,
    borderRadius: 30,
    padding: 24,
    minHeight: 205,
    justifyContent: "flex-end",
    ...shadows.card
  },
  icon: {
    width: 52,
    height: 52,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.17)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16
  },
  title: {
    color: colors.white,
    fontSize: 34,
    fontWeight: "900"
  },
  subtitle: {
    marginTop: 7,
    color: "rgba(255,255,255,0.78)",
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "700"
  },
  statPill: {
    alignSelf: "flex-start",
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    backgroundColor: colors.white,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 9
  },
  statPillText: {
    color: colors.green900,
    fontSize: 13,
    fontWeight: "900"
  },
  list: {
    paddingHorizontal: 20
  }
});
