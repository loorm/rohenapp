import React, { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { CalendarDay } from "../components/CalendarDay";
import { NatureHeader } from "../components/NatureHeader";
import { colors, natureImages, shadows } from "../theme";
import type { AppStateActions } from "../hooks/useAppState";
import { monthDays, toDateKey } from "../utils/date";

const weekdays = ["E", "T", "K", "N", "R", "L", "P"];

export const CalendarScreen = ({ calendarEntries, stats }: AppStateActions) => {
  const year = 2026;
  const monthIndex = 4;
  const [selected, setSelected] = useState("2026-05-18");
  const calendar = useMemo(() => monthDays(year, monthIndex), []);
  const selectedEntry = calendarEntries.find((entry) => entry.date === selected);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <NatureHeader image={natureImages.calendar} compact eyebrow="Kalender" title="Mai 2026" subtitle={`Praegune seeria: ${stats.currentStreak} päeva`} />
      <View style={styles.card}>
        <View style={styles.weekdays}>
          {weekdays.map((day) => (
            <Text key={day} style={styles.weekday}>{day}</Text>
          ))}
        </View>
        <View style={styles.grid}>
          {calendar.leadingEmpty.map((key) => (
            <View key={key} style={styles.emptyDay} />
          ))}
          {calendar.days.map((day) => {
            const key = toDateKey(year, monthIndex, day);
            return (
              <CalendarDay
                key={key}
                day={day}
                entry={calendarEntries.find((entry) => entry.date === key)}
                selected={selected === key}
                onPress={() => setSelected(key)}
              />
            );
          })}
        </View>
      </View>
      <View style={styles.detail}>
        <Text style={styles.detailLabel}>Valitud päev</Text>
        <Text style={styles.detailTitle}>{selectedEntry?.taskTitle ?? "Selle päeva kohta pole veel ülesannet."}</Text>
        <Text style={styles.detailText}>
          {selectedEntry
            ? selectedEntry.status === "completed"
              ? `Tehtud. Mõju: ${selectedEntry.co2ReductionKg.toFixed(1)} kg CO₂.`
              : "Vahele jäetud. Homme on uus võimalus."
            : "Täida päevane ülesanne, et siia tekiks roheline märge."}
        </Text>
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
  card: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 26,
    backgroundColor: colors.white,
    padding: 14,
    ...shadows.soft
  },
  weekdays: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 6,
    marginBottom: 8
  },
  weekday: {
    width: "13.2%",
    textAlign: "center",
    color: colors.grey,
    fontSize: 12,
    fontWeight: "900"
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  emptyDay: {
    width: "13.2%",
    aspectRatio: 1,
    margin: "0.55%"
  },
  detail: {
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 24,
    backgroundColor: colors.white,
    padding: 18,
    ...shadows.soft
  },
  detailLabel: {
    color: colors.green700,
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: 0
  },
  detailTitle: {
    marginTop: 8,
    color: colors.darkGrey,
    fontSize: 20,
    lineHeight: 25,
    fontWeight: "900"
  },
  detailText: {
    marginTop: 8,
    color: colors.graphite,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "700"
  }
});
