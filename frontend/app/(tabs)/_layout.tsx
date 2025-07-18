import { fonts } from '@/constants/font'
import { AuthContext } from '@/hooks/useAuth'
import { Ionicons } from '@expo/vector-icons'
import { Redirect, Tabs } from 'expo-router'
import React, { useContext } from 'react'

const TabsLayout = () => {
    const {isLoggedIn,COLORS} = useContext(AuthContext)

    if(!isLoggedIn) return <Redirect href="/(auth)/login" />
  return (
    <Tabs screenOptions={{tabBarActiveTintColor:'orangered',tabBarStyle: {
      backgroundColor:"#fff",      // Change background
      borderTopLeftRadius: 18,
      borderTopRightRadius: 18,
      height:55,
      alignItems:'center',
      shadowColor: COLORS.shadow,
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: -2 },
    },
    tabBarLabelStyle:{
        fontSize:12,
        fontFamily:fonts.button,
    },}}>
        <Tabs.Screen name="index" options={{
            headerShown:false,
            title:"Home",
            tabBarIcon:({focused})=> <Ionicons name="home" color={focused?COLORS.primaryText:'black'} size={20}/>
        }} />
        <Tabs.Screen name="recipe" options={{
            headerShown:false,
            title:"Recipes",
            tabBarIcon:({focused})=> <Ionicons name="restaurant" color={focused?COLORS.primaryText:'black'} size={20}/>
        }} />
        <Tabs.Screen name="favorites" options={{
            headerShown:false,
            title:"Favorites",
            tabBarIcon:({focused}) => <Ionicons name="heart" color={focused?COLORS.primaryText:'black'} size={20}/>
        }} />
    </Tabs>
  )
}

export default TabsLayout
