import { fonts } from '@/constants/font'
import { AuthContext } from '@/hooks/useAuth'
import { useHomeStyles } from '@/styles/home.styles'
import { router } from 'expo-router'
import React, { useContext } from 'react'
import { Image, Text, View,TouchableOpacity } from 'react-native'

const HomeHeader = () => {
  const homeStyles = useHomeStyles()
  const {profileImg,COLORS} = useContext(AuthContext)
  return (
    <View style={homeStyles.headerContainer} >
        <View style={homeStyles.headerCaptionContainer}>
            <Text style={{fontFamily:fonts.bodyBold,color:COLORS.secondaryText}}>Hello,Anup</Text>
            <Text style={[homeStyles.headerCaption,{fontFamily:fonts.heading}]}>What you look like to cook today?</Text>
        </View>
        <TouchableOpacity onPress={() => router.push('/profile')}>
            <Image source={profileImg ? {uri:profileImg} : require("@/assets/images/previewProfileImage.png")} style={homeStyles.headerImage} />
        </TouchableOpacity>
    </View>
  )
}

export default HomeHeader