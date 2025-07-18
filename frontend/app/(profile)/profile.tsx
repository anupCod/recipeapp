import { fonts } from "@/constants/font";
import { AuthContext } from "@/hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useContext } from "react";
import { Dimensions, Pressable, Switch, Text, TouchableOpacity, View } from "react-native";

const height = Dimensions.get("window").height;
const Profile = () => {
  
  const { emailContext, usernameContext, logout,pickProfileImage,profileImg,isDarkMode,toggleTheme,COLORS } = useContext(AuthContext);
  
  return (
    <View
      style={{
        flex: 1,
        height: height,
        width: "100%",
        backgroundColor: COLORS.background,
      }}
    >
      <View style={{ backgroundColor: "orangered",height:2*height/5,paddingVertical:20,gap:35,marginBottom:30}}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Pressable onPress={()=> router.back()} style={{
                position: "absolute",
                left: 14,
              }}>
            <Ionicons
              name="chevron-back"
              size={30}
              color="white"
            />
          </Pressable>
          
          <Text
            style={{
              color: "white",
              fontFamily: fonts.bodyBold,
              fontSize: 14,
            }}
          >
            PROFILE
          </Text>
        </View>
        <View style={{ alignItems: "center"}}>
          <View style={{ position: "relative", marginBottom: 10 }}>
            <Image
              source={profileImg ? {uri:profileImg} : require("@/assets/images/previewProfileImage.png")}
              style={{
                width: 90,
                height: 90,
                borderRadius: 45,
                borderWidth: 2,
                borderColor: "black",
              }}
            />
            <Ionicons
              name="camera"
              size={16}
              color="white"
              style={{
                backgroundColor: "white",
                color: "orangered",
                padding: 6,
                borderRadius: 20,
                position: "absolute",
                top: "60%",
                left: 67,
              }}
              onPress={pickProfileImage}
            />
          </View>
          <Text style={{ fontFamily: fonts.heading, fontSize: 15,color:'white',marginBottom:3 }}>
            {usernameContext}
          </Text>
          <Text style={{ fontFamily: fonts.bodyRegular,color:'white' }}>{emailContext}</Text>
        </View>
      </View>

      <View style={{ paddingHorizontal:18, gap: 14 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "white",
            justifyContent: "space-between",
            height:55,
            paddingHorizontal:20,
            marginHorizontal:12,
            shadowColor:'grey',
            shadowOffset:{
              width:2,
              height:2
            },
            shadowOpacity:0.3,
            shadowRadius:4
          }}
        >
          <Text style={{ fontFamily: fonts.bodyBold }}>Edit Profile</Text>
          <Ionicons name="pencil" size={18} />
        </View>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "white",
            justifyContent: "space-between",
            height:55,
            marginHorizontal:12,
            paddingHorizontal:20,
            shadowColor:COLORS.shadow,
            shadowOffset:{
              width:2,
              height:2
            },
            shadowOpacity:0.3,
            shadowRadius:4
          }}
          onPress={()=> router.push('/favorites')}
        >
          <Text style={{ fontFamily: fonts.bodyBold,color:"black"}}>Explore Favorites</Text>
          <Ionicons name="bookmark-sharp" size={23} color="black" />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "white",
            justifyContent: "space-between",
            marginHorizontal:12,
            paddingHorizontal:20,
            height:55,
            shadowColor:'grey',
            shadowOffset:{
              width:2,
              height:2
            },
            shadowOpacity:0.3,
            shadowRadius:4
          }}
        >
          <Text style={{ fontFamily: fonts.bodyBold }}>Dark Mode</Text>
          <Switch
            trackColor={{ false: "white", true: "black" }}
            thumbColor={isDarkMode ? "white" : "white"}
            onValueChange={toggleTheme}
            value={isDarkMode}
          />
        </View>
        
        <TouchableOpacity
          onPress={logout}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "orangered",
            borderRadius: 26,
            height: 50,
            marginTop: 20,
            gap: 6,
          }}
        >
          <Ionicons name="log-out-outline" size={24} color="white" />
          <Text
            style={{ color: "white", fontFamily: fonts.button, fontSize: 15 }}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;
