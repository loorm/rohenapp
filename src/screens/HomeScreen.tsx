import React, { useEffect, useRef } from "react";
import { Animated, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowRightLeft, Check, Coins, Droplets, Leaf, Sparkles, Trees, Zap } from "lucide-react-native";
import { ImpactCard } from "../components/ImpactCard";
import { NatureHeader } from "../components/NatureHeader";
import { ProgressBar } from "../components/ProgressBar";
import { ProgressRing } from "../components/ProgressRing";
import { TaskCard } from "../components/TaskCard";
import { colors, natureImages, shadows } from "../theme";
import type { AppStateActions } from "../hooks/useAppState";
import type { ScreenKey } from "../types";

type Props = AppStateActions & {
  goTo: (screen: ScreenKey) => void;
};

export const HomeScreen = ({ dailyTask, stats, rewardProgress, nextRewardThreshold, completeDailyTask, swapDailyTask, toast, goTo, swappedToday }: Props) => {
  const pulse = useRef(new Animated.Value(1)).current;
  const toastScale = useRef(new Animated.Value(0.94)).current;

  useEffect(() => {
    if (toast) {
      toastScale.setValue(0.94);
      Animated.spring(toastScale, { toValue: 1, friction: 6, tension: 90, useNativeDriver: true }).start();
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1.04, duration: 160, useNativeDriver: true }),
        Animated.spring(pulse, { toValue: 1, friction: 6, useNativeDriver: true })
      ]).start();
    }
  }, [pulse, toast, toastScale]);

  return (
    <View style={styles.screen}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.heroWrap}>
          <NatureHeader
            image={natureImages.home}
            eyebrow="Rohenäpp"
            title="Tere tulemast tagasi!"
            subtitle="Väike samm, suur mõju. Täna vähendad oma jalajälge rahulikult ja päriselt."
          />
          <BlurView intensity={55} tint="light" style={styles.heroGlass}>
            <View>
              <Text style={styles.glassLabel}>Sinu saldo</Text>
              <Text style={styles.glassValue}>{stats.points} punkti</Text>
            </View>
            <Pressable onPress={() => goTo("rewards")} style={styles.glassButton}>
              <Sparkles size={17} color={colors.green900} />
            </Pressable>
          </BlurView>
        </View>

        <Animated.View style={[styles.todayPanel, { transform: [{ scale: pulse }] }]}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.kicker}>Tänane põhitegu</Text>
              <Text style={styles.sectionTitle}>Täna vähendad oma jalajälge.</Text>
            </View>
            <ProgressRing progress={rewardProgress} value={`${Math.round(rewardProgress * 100)}%`} label="preemia" />
          </View>

          <TaskCard task={dailyTask} large />

          <View style={styles.actions}>
            <Pressable onPress={completeDailyTask} style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}>
              <Check size={19} color={colors.white} strokeWidth={2.7} />
              <Text style={styles.primaryText}>Märgi tehtuks</Text>
            </Pressable>
            <Pressable onPress={swapDailyTask} style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]}>
              <ArrowRightLeft size={18} color={colors.green700} strokeWidth={2.5} />
              <Text style={styles.secondaryText}>Vaheta ülesanne</Text>
            </Pressable>
          </View>
          <Text style={styles.swapText}>{swappedToday ? "Tänane tasuta vahetus on kasutatud." : "Sul on täna üks tasuta vahetus."}</Text>
        </Animated.View>

        <View style={styles.rewardCard}>
          <View style={styles.rewardTop}>
            <View style={styles.rewardIcon}>
              <Coins size={22} color={colors.green700} />
            </View>
            <View style={styles.rewardCopy}>
              <Text style={styles.rewardTitle}>{stats.points} / {nextRewardThreshold} punkti järgmise preemiani</Text>
              <Text style={styles.rewardSubtitle}>Preemia edeneb koos sinu igapäevaste tegudega.</Text>
            </View>
          </View>
          <ProgressBar progress={rewardProgress} />
        </View>

        <LinearGradient colors={["#F7FFF8", "#E5F6E9"]} style={styles.impactHero}>
          <Trees size={28} color={colors.green700} />
          <View style={styles.impactCopy}>
            <Text style={styles.impactTitle}>Oled vähendanud oma jalajälge {stats.totalCo2Reduced.toFixed(1)} kg CO₂ võrra</Text>
            <Text style={styles.impactSubtitle}>See on rahulikult kogunenud mõju, üks praktiline tegu korraga.</Text>
          </View>
        </LinearGradient>

        <View style={styles.grid}>
          <ImpactCard icon={Leaf} label="tehtud ülesannet" value={`${stats.completedTasks}`} />
          <ImpactCard icon={Droplets} label="liitrit vett säästetud" value={`${stats.waterSavedLiters}`} tint="#2E8AA4" />
          <ImpactCard icon={Zap} label="kWh elektrit säästetud" value={`${stats.electricitySavedKwh.toFixed(1)}`} tint="#C8942E" />
        </View>
      </ScrollView>

      {toast ? (
        <Animated.View style={[styles.toast, { transform: [{ scale: toastScale }] }]}>
          <Sparkles size={18} color={colors.white} />
          <Text style={styles.toastText}>{toast}</Text>
        </Animated.View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  content: {
    paddingBottom: 110
  },
  heroWrap: {
    position: "relative"
  },
  heroGlass: {
    position: "absolute",
    right: 34,
    bottom: -24,
    left: 34,
    minHeight: 78,
    borderRadius: 24,
    overflow: "hidden",
    paddingHorizontal: 18,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.55)"
  },
  glassLabel: {
    color: colors.graphite,
    fontSize: 12,
    fontWeight: "800"
  },
  glassValue: {
    color: colors.green900,
    fontSize: 26,
    fontWeight: "900"
  },
  glassButton: {
    width: 42,
    height: 42,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.green150
  },
  todayPanel: {
    marginTop: 48,
    marginHorizontal: 20,
    borderRadius: 30,
    padding: 16,
    backgroundColor: "rgba(255,255,255,0.82)",
    ...shadows.card
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 12
  },
  kicker: {
    color: colors.green700,
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: 0
  },
  sectionTitle: {
    marginTop: 4,
    maxWidth: 210,
    color: colors.darkGrey,
    fontSize: 22,
    lineHeight: 27,
    fontWeight: "900"
  },
  actions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 16
  },
  primaryButton: {
    flex: 1.1,
    minHeight: 54,
    borderRadius: 18,
    backgroundColor: colors.green700,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8
  },
  secondaryButton: {
    flex: 1,
    minHeight: 54,
    borderRadius: 18,
    backgroundColor: colors.green100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    paddingHorizontal: 8
  },
  pressed: {
    opacity: 0.86,
    transform: [{ scale: 0.99 }]
  },
  primaryText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "900"
  },
  secondaryText: {
    color: colors.green700,
    fontSize: 13,
    fontWeight: "900"
  },
  swapText: {
    marginTop: 10,
    color: colors.grey,
    fontSize: 12,
    fontWeight: "700",
    textAlign: "center"
  },
  rewardCard: {
    marginTop: 18,
    marginHorizontal: 20,
    borderRadius: 24,
    padding: 18,
    backgroundColor: colors.white,
    ...shadows.soft
  },
  rewardTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 14
  },
  rewardIcon: {
    width: 46,
    height: 46,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.green100
  },
  rewardCopy: {
    flex: 1
  },
  rewardTitle: {
    color: colors.darkGrey,
    fontSize: 15,
    fontWeight: "900"
  },
  rewardSubtitle: {
    marginTop: 3,
    color: colors.grey,
    fontSize: 12,
    fontWeight: "700"
  },
  impactHero: {
    marginTop: 18,
    marginHorizontal: 20,
    borderRadius: 26,
    padding: 18,
    flexDirection: "row",
    gap: 14,
    alignItems: "center",
    ...shadows.soft
  },
  impactCopy: {
    flex: 1
  },
  impactTitle: {
    color: colors.green900,
    fontSize: 17,
    lineHeight: 22,
    fontWeight: "900"
  },
  impactSubtitle: {
    marginTop: 5,
    color: colors.graphite,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: "700"
  },
  grid: {
    flexDirection: "row",
    gap: 10,
    marginHorizontal: 20,
    marginTop: 18
  },
  toast: {
    position: "absolute",
    left: 34,
    right: 34,
    bottom: 100,
    borderRadius: 20,
    backgroundColor: colors.green700,
    padding: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    ...shadows.card
  },
  toastText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "900"
  }
});
