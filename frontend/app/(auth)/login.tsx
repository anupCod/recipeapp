import { fonts } from "@/constants/font";
import { AuthContext } from "@/hooks/useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useContext, useState } from "react";
import {
  Alert,
  Dimensions,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const width = Dimensions.get("window").width;
interface LoginFormData {
  email: string;
  password: string;
}
const Login = () => {
  const { setIsLoggedIn,setEmailContext,setUsernameContext } = useContext(AuthContext);
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLogin = async () => {
    
    const { email, password } = formData;
    if ( !email || !password ) {
      return Alert.alert("Error", "All fields are required");
    }
    try {
      const response = await fetch("http://192.168.1.100:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      
      if (response.ok) {
        Alert.alert("Success", data.message || "Signup Successful");
        setFormData({
          email: "",
          password: "",
        });
        await AsyncStorage.setItem('email',data.user.email)
        await AsyncStorage.setItem('username',data.user.username)
        setEmailContext(data.user.email)
        setUsernameContext(data.user.username)
        setIsLoggedIn(true)
        router.push("/(tabs)")
      } else {
        Alert.alert("Error", data.error || "Signup failed");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Server error");
    }
  };

  return (
    <ScrollView contentContainerStyle={{ paddingHorizontal: 14, gap: 16 }}>
      <View>
        <Image
          source={require("@/assets/images/2.png")}
          style={{ height: 280, width: width - 28 }}
          contentFit="contain"
          contentPosition="top center"
        />
        <Text
          style={{
            textAlign: "center",
            fontFamily: fonts.heading,
            color: "orangered",
            fontSize: 22,
            fontWeight: "bold",
            marginBottom: 10,
          }}
        >
          Welcome Back
        </Text>
      </View>

      <TextInput
        placeholder="Email"
        placeholderTextColor="grey"
        style={{
          borderWidth: 1 / 2,
          borderColor: "black",
          borderRadius: 8,
          height: 52,
          paddingHorizontal: 16,
        }}
        onChangeText={(text) => handleChange("email",text)}
        value={formData.email}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="grey"
        secureTextEntry
        style={{
          borderWidth: 1 / 2,
          borderColor: "black",
          borderRadius: 8,
          height: 52,
          paddingHorizontal: 16,
        }}
        onChangeText={(text) => handleChange("password",text)}
        value={formData.password}
      />
      <TouchableOpacity
        onPress={() => handleLogin()}
        style={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "orangered",
          borderRadius: 14,
          height: 48,
        }}
      >
        <Text
          style={{
            color: "white",
            fontFamily: fonts.button,
            fontSize: 15,
            fontWeight: "600",
          }}
        >
          Login
        </Text>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Text style={{ fontFamily: fonts.bodyRegular }}>
          Don&apos;t have an account?
        </Text>
        <TouchableOpacity onPress={() => router.push("/signup")}>
          <Text
            style={{
              textDecorationLine: "underline",
              textDecorationColor: "purple",
              color: "purple",
              fontFamily: fonts.bodyBold,
            }}
          >
            Signup Now
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Login;
