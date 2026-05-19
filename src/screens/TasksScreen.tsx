import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { NatureHeader } from "../components/NatureHeader";
import { TaskCard } from "../components/TaskCard";
import { colors, natureImages } from "../theme";
import type { AppStateActions } from "../hooks/useAppState";

export const TasksScreen = ({ tasks }: AppStateActions) => {
  const categories = ["Kõik", "Transport", "Vesi", "Elekter", "Toit", "Tarbimine", "Prügi ja taaskasutus", "Loodus"];

  return (
    <ScrollView style={styles.screen} showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
      <NatureHeader image={natureImages.tasks} compact eyebrow="Ülesanded" title="Praktilised roheteod" subtitle="Aktiivsed ja tulevased ülesanded, mis sobivad päris päevadesse." />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
        {categories.map((category, index) => (
          <View key={category} style={[styles.chip, index === 0 && styles.chipActive]}>
            <Text style={[styles.chipText, index === 0 && styles.chipActiveText]}>{category}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.list}>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
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
  chips: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 8,
    gap: 8
  },
  chip: {
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 9,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.softGrey
  },
  chipActive: {
    backgroundColor: colors.green700,
    borderColor: colors.green700
  },
  chipText: {
    color: colors.graphite,
    fontSize: 12,
    fontWeight: "900"
  },
  chipActiveText: {
    color: colors.white
  },
  list: {
    paddingHorizontal: 20,
    paddingTop: 8
  }
});
