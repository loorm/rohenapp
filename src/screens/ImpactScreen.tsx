import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { BarChart3, Droplets, Flame, Leaf, Recycle, Trophy, Zap } from "lucide-react-native";
import { ImpactCard } from "../components/ImpactCard";
import { NatureHeader } from "../components/NatureHeader";
import { colors, natureImages, shadows } from "../theme";
import type { AppStateActions } from "../hooks/useAppState";

export const ImpactScreen = ({ stats }: AppStateActions) => {
  const chart = [
    { label: "CO₂", value: Math.min(stats.totalCo2Reduced / 20, 1), color: colors.green700 },
    { label: "Vesi", value: Math.min(stats.waterSavedLiters / 200, 1), color: "#2E8AA4" },
    { label: "Elekter", value: Math.min(stats.electricitySavedKwh / 35, 1), color: "#C8942E" }
  ];

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <NatureHeader image={natureImages.impact} compact eyebrow="Minu mõju" title={`${stats.name}, sinu roheline rada`} subtitle="Selge ülevaade punktidest, seeriatest ja säästetud ressurssidest." />
      <View style={styles.grid}>
        <ImpactCard icon={Trophy} label="punkti kokku" value={`${stats.points}`} />
        <ImpactCard icon={Leaf} label="tehtud ülesannet" value={`${stats.completedTasks}`} />
      </View>
      <View style={styles.grid}>
        <ImpactCard icon={Recycle} label="vahele jäetud" value={`${stats.skippedTasks}`} tint={colors.grey} />
        <ImpactCard icon={Flame} label="päeva seeria" value={`${stats.currentStreak}`} tint="#D97935" />
      </View>
      <View style={styles.grid}>
        <ImpactCard icon={Droplets} label="liitrit vett" value={`${stats.waterSavedLiters}`} tint="#2E8AA4" />
        <ImpactCard icon={Zap} label="kWh elektrit" value={`${stats.electricitySavedKwh.toFixed(1)}`} tint="#C8942E" />
      </View>

      <View style={styles.chartCard}>
        <View style={styles.chartHeader}>
          <BarChart3 size={22} color={colors.green700} />
          <Text style={styles.chartTitle}>Mõju ülevaade</Text>
        </View>
        {chart.map((item) => (
          <View key={item.label} style={styles.barRow}>
            <Text style={styles.barLabel}>{item.label}</Text>
            <View style={styles.barTrack}>
              <View style={[styles.barFill, { width: `${item.value * 100}%`, backgroundColor: item.color }]} />
            </View>
          </View>
        ))}
        <Text style={styles.chartNote}>Pikim seeria: {stats.longestStreak} päeva. Kokku vähendatud: {stats.totalCo2Reduced.toFixed(1)} kg CO₂.</Text>
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
  grid: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 20,
    marginTop: 14
  },
  chartCard: {
    margin: 20,
    borderRadius: 26,
    backgroundColor: colors.white,
    padding: 18,
    ...shadows.soft
  },
  chartHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    marginBottom: 18
  },
  chartTitle: {
    color: colors.darkGrey,
    fontSize: 19,
    fontWeight: "900"
  },
  barRow: {
    marginBottom: 15
  },
  barLabel: {
    color: colors.graphite,
    fontSize: 13,
    fontWeight: "900",
    marginBottom: 7
  },
  barTrack: {
    height: 12,
    borderRadius: 999,
    backgroundColor: colors.softGrey,
    overflow: "hidden"
  },
  barFill: {
    height: "100%",
    borderRadius: 999
  },
  chartNote: {
    marginTop: 8,
    color: colors.grey,
    fontSize: 13,
    lineHeight: 19,
    fontWeight: "700"
  }
});
