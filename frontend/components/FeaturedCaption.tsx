import { fonts } from '@/constants/font'
import { ContentContext } from '@/context/ContentProvider'
import { Ionicons } from '@expo/vector-icons'
import React, { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const FeaturedCaption = () => {
    const { featuredRecipe } = useContext(ContentContext)
    if (!featuredRecipe) return null;
  return (
    <View style={{...StyleSheet.absoluteFillObject,justifyContent:'space-between',padding:16}}>
        <View style={{paddingHorizontal:9,paddingVertical:6,backgroundColor:'orangered',alignSelf:'flex-start',borderRadius:14}}>
            <Text style={{color:'white',fontFamily:fonts.button}}>Featured</Text>
        </View>
        <View style={{gap:10}}>
            <Text style={{fontSize:22,fontFamily:fonts.heading,color:'white'}} numberOfLines={1} ellipsizeMode="tail">{featuredRecipe.strMeal}</Text>
            <View style={{flexDirection:'row',gap:15}}>
                <View style={{flexDirection:'row',gap:5,alignItems:'center'}}>
                    <Ionicons name="time" size={16} color="white" />
                    <Text style={{color:'white',fontFamily:fonts.bodyBold}}>30 Minutes</Text>
                </View>
                <View style={{flexDirection:'row',gap:5,alignItems:'center'}}>
                    <Ionicons name="people" size={16} color="white" />
                    <Text style={{color:'white',fontFamily:fonts.bodyBold}}>4</Text>
                </View>
                <View style={{flexDirection:'row',gap:5,alignItems:'center'}}>
                    <Ionicons name="location" size={16} color="white" />
                    <Text style={{color:'white',fontFamily:fonts.bodyBold}}>Nepal</Text>
                </View>
            </View>
        </View>
    </View>
  )
}

export default FeaturedCaption
