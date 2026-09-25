import React from "react";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ClinicProvider } from "../context/ClinicContext";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ClinicProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "#F8FAFD" },
            animation: "slide_from_right",
          }}
        />
      </ClinicProvider>
    </SafeAreaProvider>
  );
}
