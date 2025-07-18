import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import * as ImagePicker from 'expo-image-picker'
import { THEMES } from "@/constants/theme";

interface AuthContextType {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  emailContext: string;
  setEmailContext: React.Dispatch<React.SetStateAction<string>>;
  usernameContext: string;
  setUsernameContext: React.Dispatch<React.SetStateAction<string>>;
  logout: () => Promise<void>;
  profileImg: string;
  pickProfileImage: () => Promise<void>;
  toggleTheme: () => void;
  COLORS?: any; // Optionally type COLORS more strictly if you have a THEMES type
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

interface AuthContextProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthContextProps) => {
  const [isDarkMode,setIsDarkMode] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [usernameContext, setUsernameContext] = useState<string>("");
  const [emailContext, setEmailContext] = useState<string>("");
  const [profileImg,setProfileImg] = useState<string>("")

  useEffect(() => {
    const loadUserData = async () => {
        const email = await AsyncStorage.getItem("email");
        const username = await AsyncStorage.getItem("username");
        if (email && username) {
            setEmailContext(email);
            setUsernameContext(username);
            setIsLoggedIn(true)
        }
    };
    loadUserData()
  }, []);

  const pickProfileImage = async() => {
    let result = await ImagePicker.launchImageLibraryAsync(
      {
        mediaTypes:['images','livePhotos'],
        allowsEditing:true,
        aspect:[4,3],
        quality:1,
      }
    )
    if(!result.canceled){
      setProfileImg(result.assets[0].uri)
    }
  }

  const logout = async () => {
    await AsyncStorage.removeItem("email");
    await AsyncStorage.removeItem("username");
    setEmailContext("");
    setUsernameContext("");
    setIsLoggedIn(false);
    router.push('/(auth)/login')
    setIsDarkMode(false)
    
  };

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  const COLORS = isDarkMode ? THEMES.dark : THEMES.light;

  return (
    <AuthContext.Provider
      value={{
        isDarkMode,
        setIsDarkMode,
        isLoggedIn,
        setIsLoggedIn,
        usernameContext,
        setUsernameContext,
        emailContext,
        setEmailContext,
        logout,
        profileImg,
        pickProfileImage,
        toggleTheme,
        COLORS
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
