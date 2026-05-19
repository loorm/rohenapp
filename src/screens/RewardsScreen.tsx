import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Coins, WalletCards } from "lucide-react-native";
import { NatureHeader } from "../components/NatureHeader";
import { ProgressBar } from "../components/ProgressBar";
import { RewardCard } from "../components/RewardCard";
import { rewards } from "../data/rewards";
import { colors, natureImages, shadows } from "../theme";
import type { AppStateActions } from "../hooks/useAppState";

export const RewardsScreen = ({ stats, rewardProgress, nextRewardThreshold }: AppStateActions) => (
  <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
    <NatureHeader image={natureImages.rewards} compact eyebrow="Preemiad" title="Demo rahakott" subtitle="Preemiasüsteem on demo versioonis." />
    <View style={styles.wallet}>
      <View style={styles.walletTop}>
        <View style={styles.walletIcon}>
          <WalletCards size={24} color={colors.green700} />
        </View>
        <View>
          <Text style={styles.walletLabel}>Punktisaldo</Text>
          <Text style={styles.walletValue}>{stats.points} punkti</Text>
        </View>
      </View>
      <ProgressBar progress={rewardProgress} label={`${stats.points} / ${nextRewardThreshold} punkti järgmise preemiani`} />
      <View style={styles.balancePill}>
        <Coins size={16} color={colors.green900} />
        <Text style={styles.balanceText}>Demo saldo: {stats.rewardBalance}€</Text>
      </View>
    </View>
    <View style={styles.list}>
      {rewards.map((reward) => (
        <RewardCard key={reward.id} reward={reward} points={stats.points} />
      ))}
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  content: {
    paddingBottom: 110
  },
  wallet: {
    margin: 20,
    borderRadius: 26,
    padding: 18,
    backgroundColor: colors.white,
    ...shadows.soft
  },
  walletTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
    marginBottom: 16
  },
  walletIcon: {
    width: 52,
    height: 52,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.green100
  },
  walletLabel: {
    color: colors.grey,
    fontSize: 12,
    fontWeight: "800"
  },
  walletValue: {
    color: colors.darkGrey,
    fontSize: 28,
    fontWeight: "900"
  },
  balancePill: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginTop: 16,
    borderRadius: 999,
    backgroundColor: colors.green150,
    paddingHorizontal: 12,
    paddingVertical: 9
  },
  balanceText: {
    color: colors.green900,
    fontSize: 13,
    fontWeight: "900"
  },
  list: {
    paddingHorizontal: 20
  }
});
