import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors, shadows } from "../theme";

type Props = {
  image: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  compact?: boolean;
};

export const NatureHeader = ({ image, eyebrow, title, subtitle, compact }: Props) => (
  <ImageBackground source={{ uri: image }} resizeMode="cover" style={[styles.header, compact && styles.compact]} imageStyle={styles.image}>
    <LinearGradient colors={["rgba(18,53,31,0.15)", "rgba(18,53,31,0.84)"]} style={styles.overlay}>
      {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </LinearGradient>
  </ImageBackground>
);

const styles = StyleSheet.create({
  header: {
    height: 218,
    marginHorizontal: 20,
    marginTop: 12,
    overflow: "hidden",
    borderRadius: 30,
    backgroundColor: colors.green150,
    ...shadows.card
  },
  compact: {
    height: 154
  },
  image: {
    borderRadius: 30
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 22
  },
  eyebrow: {
    color: colors.green150,
    fontSize: 13,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0
  },
  title: {
    marginTop: 6,
    color: colors.white,
    fontSize: 31,
    fontWeight: "900",
    letterSpacing: 0
  },
  subtitle: {
    marginTop: 8,
    color: "rgba(255,255,255,0.86)",
    fontSize: 15,
    lineHeight: 21
  }
});
