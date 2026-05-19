import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { colors } from "../theme";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type Props = {
  progress: number;
  value: string;
  label: string;
};

export const ProgressRing = ({ progress, value, label }: Props) => {
  const animated = useRef(new Animated.Value(0)).current;
  const radius = 42;
  const stroke = 9;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    Animated.timing(animated, { toValue: progress, duration: 650, useNativeDriver: false }).start();
  }, [animated, progress]);

  const strokeDashoffset = animated.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0]
  });

  return (
    <View style={styles.wrap}>
      <Svg width={112} height={112}>
        <Circle cx={56} cy={56} r={radius} stroke={colors.green150} strokeWidth={stroke} fill="none" />
        <AnimatedCircle
          cx={56}
          cy={56}
          r={radius}
          stroke={colors.green600}
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          rotation="-90"
          origin="56,56"
        />
      </Svg>
      <View style={styles.center}>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.label}>{label}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    width: 112,
    height: 112,
    alignItems: "center",
    justifyContent: "center"
  },
  center: {
    position: "absolute",
    alignItems: "center"
  },
  value: {
    color: colors.green900,
    fontSize: 18,
    fontWeight: "900"
  },
  label: {
    color: colors.grey,
    fontSize: 11,
    fontWeight: "700"
  }
});
