import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { CalendarDays, Gift, Home, Leaf, ListTodo, Trophy } from "lucide-react-native";
import { colors, shadows } from "../theme";
import type { ScreenKey } from "../types";

type Props = {
  active: ScreenKey;
  screens: ScreenKey[];
  onChange: (screen: ScreenKey) => void;
};

const items: Record<ScreenKey, { label: string; icon: typeof Home }> = {
  home: { label: "Avaleht", icon: Home },
  tasks: { label: "Ülesanded", icon: ListTodo },
  leaderboard: { label: "Edetabel", icon: Trophy },
  calendar: { label: "Kalender", icon: CalendarDays },
  rewards: { label: "Preemiad", icon: Gift },
  impact: { label: "Mõju", icon: Leaf }
};

export const BottomNavigation = ({ active, screens, onChange }: Props) => (
  <View style={styles.wrap}>
    {screens.map((screen) => {
      const Icon = items[screen].icon;
      const selected = screen === active;
      return (
        <Pressable key={screen} accessibilityRole="button" onPress={() => onChange(screen)} style={[styles.item, selected && styles.selected]}>
          <Icon size={20} color={selected ? colors.white : colors.grey} strokeWidth={2.4} />
          <Text style={[styles.label, selected && styles.selectedLabel]} numberOfLines={1}>
            {items[screen].label}
          </Text>
        </Pressable>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginHorizontal: 14,
    marginBottom: 12,
    padding: 8,
    borderRadius: 28,
    backgroundColor: "rgba(255,255,255,0.88)",
    ...shadows.card
  },
  item: {
    flex: 1,
    minHeight: 54,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    gap: 2
  },
  selected: {
    backgroundColor: colors.green700
  },
  label: {
    color: colors.grey,
    fontSize: 9,
    fontWeight: "900"
  },
  selectedLabel: {
    color: colors.white
  }
});
