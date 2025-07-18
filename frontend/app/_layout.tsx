import SafeScreen from "@/components/SafeScreen";
import { ContentProvider } from "@/context/ContentProvider";
import { AuthProvider } from "@/hooks/useAuth";
import { Slot } from "expo-router";

import {
  Inter_400Regular,
  Inter_600SemiBold,
  useFonts as useInterFonts,
} from "@expo-google-fonts/inter";

import {
  Ubuntu_500Medium,
  useFonts as useUbuntuFonts,
} from "@expo-google-fonts/ubuntu";

import {
  Roboto_500Medium,
  Roboto_700Bold,
  useFonts as useRobotoFonts
} from "@expo-google-fonts/roboto";
import { ActivityIndicator } from "react-native";

export default function RootLayout() {
  const [ubuntuLoaded] = useUbuntuFonts({
    Ubuntu_500Medium,
  });
  const [interLoaded] = useInterFonts({
    Inter_400Regular,
    Inter_600SemiBold,
  });

  const [robotoLoaded] = useRobotoFonts({
    Roboto_700Bold,
    Roboto_500Medium,
  });

  const fontsLoaded = interLoaded && ubuntuLoaded && robotoLoaded;

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" />;
  }

  return (
    // Using SafeScreen to ensure the app is safe from notches and other screen issues
    <AuthProvider>
      <ContentProvider>
        <SafeScreen>
          <Slot />
        </SafeScreen>
      </ContentProvider>
    </AuthProvider>
  );
}
