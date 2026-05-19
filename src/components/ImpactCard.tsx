import React from "react";
import { StyleSheet, Text, View } from "react-native";
import type { LucideIcon } from "lucide-react-native";
import { colors, shadows } from "../theme";

type Props = {
  icon: LucideIcon;
  label: string;
  value: string;
  tint?: string;
};

export const ImpactCard = ({ icon: Icon, label, value, tint = colors.green600 }: Props) => (
  <View style={styles.card}>
    <View style={[styles.icon, { backgroundColor: `${tint}1A` }]}>
      <Icon size={20} color={tint} strokeWidth={2.4} />
    </View>
    <Text style={styles.value}>{value}</Text>
    <Text style={styles.label}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minHeight: 112,
    borderRadius: 22,
    backgroundColor: colors.white,
    padding: 16,
    ...shadows.soft
  },
  icon: {
    width: 38,
    height: 38,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center"
  },
  value: {
    marginTop: 12,
    color: colors.darkGrey,
    fontSize: 20,
    fontWeight: "900"
  },
  label: {
    marginTop: 4,
    color: colors.grey,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "700"
  }
});
