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

const width = Dimensions.get("window").width;
const Verify = () => {
    const [code,setCode] = useState<string>('')
    const {emailContext} = useContext(AuthContext)
    console.log(emailContext)
    const handleVerifyEmail = async() => {
      if(!code){
        return Alert.alert('Error','Verification code is required')
      }
      try {
        const response = await fetch('http://192.168.1.100:3000/api/verify',{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({email:emailContext,code})
        })
        const data = await response.json()
        if(response.ok){
          Alert.alert('Success',data.message || 'Signup Successful')
          setCode('')
          router.push('/login')
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
    <ScrollView contentContainerStyle={{ paddingHorizontal: 14, gap: 16 }}>
      <View>
        <Image
          source={require("@/assets/images/4.png")}
          style={{ height: 280, width: width - 28 }}
          contentFit="contain"
          contentPosition="top center"
        />
        <Text
          style={{
            textAlign: "center",
            fontFamily: fonts.heading,
            color: "orangered",
            fontSize: 24,
            fontWeight: "bold",
          }}
        >
          Verify Your Email
        </Text>
      </View>
      <View style={{ alignItems: "center", gap: 4,marginBottom:12 }}>
        <Text style={{fontFamily:fonts.bodyRegular,fontSize:14}}>We&apos;ve sent a verification code to</Text>
        <Text style={{fontFamily:fonts.heading,fontSize:14,letterSpacing:0.5}}>{emailContext}</Text>
      </View>
      <TextInput
        placeholder="Enter verification code"
        placeholderTextColor="grey"
        style={{
          borderWidth: 1 / 2,
          borderColor: "black",
          borderRadius: 8,
          height: 52,
          paddingHorizontal: 16,
          marginBottom:12,
        }}
        secureTextEntry
        value={code}
        onChangeText={(text)=> setCode(text)}
      />
      <TouchableOpacity
        style={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "orangered",
          borderRadius: 14,
          height: 50,
        }}
        onPress={handleVerifyEmail}
      >
        <Text
          style={{ color: "white", fontSize: 16, fontFamily: fonts.button }}
        >
          Verify Email
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/signup")}>
        <Text
          style={{
            textDecorationLine: "underline",
            textDecorationColor: "purple",
            color: "purple",
            fontFamily: fonts.bodyBold,
            fontSize: 16, 
            textAlign:'center'
          }}
        >
          Back to Signup page
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Verify;
