import { fonts } from "@/constants/font";
import { AuthContext } from "@/hooks/useAuth";
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

interface SignupFormData{
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const Signup = () => {
  const {setEmailContext} = useContext(AuthContext)
  const width = Dimensions.get("window").width;

  const [formData,setFormData] = useState<SignupFormData>({
    username:'',
    email:'',
    password:'',
    confirmPassword:''
  })


  const handleChange = (field:keyof typeof formData,value:string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  const handleSignup = async() => {
    const {username,email,password,confirmPassword} = formData
    if(!username || !email || !password || !confirmPassword){
      return Alert.alert('Error','All fields are required')
    }
    if(password !== confirmPassword){
      return Alert.alert('Error','Passwords dont match')
    }
    try {
      const response = await fetch('http://192.168.1.100:3000/api/register',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({username,email,password,confirmPassword})
      })
      const data = await response.json()
      if(response.ok){
        Alert.alert('Success',data.message || 'Signup Successful')
        router.push('/verify')
        setEmailContext(data.user.email)
        setFormData({username:'',email:'',password:'',confirmPassword:''})
      }
      else{
        Alert.alert('Error',data.error || 'Signup failed')
      }
    } catch(error) {
      console.error(error)
      Alert.alert('Error','Server error')
    }
  }
  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 14,
        paddingBottom: 16,
        gap: 10,
      }}
    >
      <View>
        <Image
          source={require("@/assets/images/3.png")}
          style={{ height: 250, width: width - 28 }}
          contentFit="contain"
          contentPosition="top center"
        />
        <Text
          style={{
            textAlign: "center",
            color: "orangered",
            fontSize: 22,
            fontFamily: fonts.heading,
            fontWeight: "bold",
            marginBottom: 7,
          }}
        >
          Register Now
        </Text>
      </View>

      <TextInput
        placeholder="Username"
        placeholderTextColor="grey"
        style={{
          borderWidth: 1 / 2,
          borderColor: "black",
          borderRadius: 8,
          height: 50,
          paddingHorizontal: 16,
        }}
        value={formData.username}
        onChangeText={(text) => handleChange('username',text)}
      />
      <TextInput
        placeholder="Email"
        placeholderTextColor="grey"
        style={{
          borderWidth: 1 / 2,
          borderColor: "black",
          borderRadius: 8,
          height: 50,
          paddingHorizontal: 16,
        }}
        value={formData.email}
        onChangeText={(text) => handleChange('email',text)}
      />
      <TextInput
        placeholder="Create Password"
        secureTextEntry
        placeholderTextColor="grey"
        style={{
          borderWidth: 1 / 2,
          borderColor: "black",
          borderRadius: 8,
          height: 50,
          paddingHorizontal: 16,
        }}
        value={formData.password}
        onChangeText={(text) => handleChange('password',text)}
      />
      <TextInput
        placeholder="Confirm Password"
        secureTextEntry
        placeholderTextColor="grey"
        style={{
          borderWidth: 1 / 2,
          borderColor: "black",
          borderRadius: 8,
          height: 50,
          paddingHorizontal: 16,
        }}
        value={formData.confirmPassword}
        onChangeText={(text) => handleChange('confirmPassword',text)}
      />
      <TouchableOpacity
        style={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "orangered",
          borderRadius: 14,
          height: 48,
        }}
        onPress={handleSignup}
      >
        <Text
          style={{ color: "white", fontSize: 16, fontFamily: fonts.button }}
        >
          Signup
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
          Already have an account?
        </Text>
        <TouchableOpacity onPress={() => router.push("/login")}>
          <Text
            style={{
              textDecorationLine: "underline",
              textDecorationColor: "purple",
              fontFamily: fonts.bodyBold,
              color: "purple",
            }}
          >
            Login Now
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Signup;
