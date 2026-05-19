import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../theme";

type Props = {
  progress: number;
  label?: string;
};

export const ProgressBar = ({ progress, label }: Props) => {
  const width = useRef(new Animated.Value(progress)).current;

  useEffect(() => {
    Animated.spring(width, { toValue: progress, friction: 9, tension: 70, useNativeDriver: false }).start();
  }, [progress, width]);

  const animatedWidth = width.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"]
  });

  return (
    <View>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={styles.track}>
        <Animated.View style={[styles.fillWrap, { width: animatedWidth }]}>
          <LinearGradient colors={[colors.green300, colors.green600]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.fill} />
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    color: colors.graphite,
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 10
  },
  track: {
    height: 12,
    borderRadius: 999,
    backgroundColor: colors.green150,
    overflow: "hidden"
  },
  fillWrap: {
    height: "100%"
  },
  fill: {
    flex: 1,
    borderRadius: 999
  }
});
