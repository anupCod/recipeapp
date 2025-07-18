import { ContentContext } from '@/context/ContentProvider'
import { Image } from 'expo-image'
import React, { useContext } from 'react'
import { View } from 'react-native'
import FeaturedCaption from './FeaturedCaption'

const FeaturedRecipe = () => {
  const { featuredRecipe } = useContext(ContentContext)
  if (!featuredRecipe) return null;
  return (
    <View style={{position:'relative',borderRadius:20,backgroundColor:'grey',marginBottom:16,shadowColor:'black',
    shadowOffset: {
      width: -3,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 10,
}}>
        <Image source={{uri:featuredRecipe.strMealThumb}} style={{width:'100%',height:220,borderRadius:20,opacity:0.6}} contentFit='cover' transition={500} />
        <FeaturedCaption />
    </View>
  )
}

export default FeaturedRecipe