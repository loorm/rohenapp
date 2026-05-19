import React, { useEffect, useRef, useState } from "react";
import { Animated, SafeAreaView, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { BottomNavigation } from "./src/components/BottomNavigation";
import { HomeScreen } from "./src/screens/HomeScreen";
import { TasksScreen } from "./src/screens/TasksScreen";
import { LeaderboardScreen } from "./src/screens/LeaderboardScreen";
import { CalendarScreen } from "./src/screens/CalendarScreen";
import { RewardsScreen } from "./src/screens/RewardsScreen";
import { ImpactScreen } from "./src/screens/ImpactScreen";
import { useAppState } from "./src/hooks/useAppState";
import { colors } from "./src/theme";
import type { ScreenKey } from "./src/types";

const screens: ScreenKey[] = ["home", "tasks", "leaderboard", "calendar", "rewards", "impact"];

export default function App() {
  const [screen, setScreen] = useState<ScreenKey>("home");
  const appState = useAppState();
  const fade = useRef(new Animated.Value(1)).current;
  const slide = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fade.setValue(0);
    slide.setValue(12);
    Animated.parallel([
      Animated.timing(fade, { toValue: 1, duration: 260, useNativeDriver: true }),
      Animated.spring(slide, { toValue: 0, friction: 9, tension: 70, useNativeDriver: true })
    ]).start();
  }, [screen, fade, slide]);

  const renderScreen = () => {
    const props = { ...appState, goTo: setScreen };
    switch (screen) {
      case "home":
        return <HomeScreen {...props} />;
      case "tasks":
        return <TasksScreen {...props} />;
      case "leaderboard":
        return <LeaderboardScreen {...props} />;
      case "calendar":
        return <CalendarScreen {...props} />;
      case "rewards":
        return <RewardsScreen {...props} />;
      case "impact":
        return <ImpactScreen {...props} />;
      default:
        return <HomeScreen {...props} />;
    }
  };

  return (
    <LinearGradient colors={[colors.mist, colors.white, "#EEF7EA"]} style={styles.app}>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.safe}>
        <View style={styles.container}>
          <Animated.View style={[styles.content, { opacity: fade, transform: [{ translateY: slide }] }]}>
            {renderScreen()}
          </Animated.View>
          <BottomNavigation active={screen} onChange={setScreen} screens={screens} />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1
  },
  safe: {
    flex: 1,
    backgroundColor: "transparent"
  },
  container: {
    flex: 1,
    maxWidth: 520,
    width: "100%",
    alignSelf: "center"
  },
  content: {
    flex: 1
  }
});
