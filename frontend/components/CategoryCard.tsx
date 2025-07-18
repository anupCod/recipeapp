import { fonts } from '@/constants/font'
import { CategoriesContent, ContentContext } from '@/context/ContentProvider'
import { AuthContext } from '@/hooks/useAuth'
import { MealApi } from '@/services/recipeApi'
import { Image } from 'expo-image'
import React, { useContext } from 'react'
import { Text, TouchableOpacity } from 'react-native'


type CategoryCardProps = {
    category:CategoriesContent
}

const CategoryCard = ({category}:CategoryCardProps) => {
    const {COLORS} = useContext(AuthContext)
    const {selectedCategory,setSelectedCategory,setRecipes} = useContext(ContentContext)
    const isSelected = selectedCategory === category.strCategory
    const handleRecipeData = async(categoryName:string) => {
        try {
            const meals = await MealApi.filterByCategory(categoryName)
            setSelectedCategory(categoryName)
            setRecipes(meals)
        } catch(error) {
            console.error("Error loading category data:",error)
            setRecipes([])
        }
    }
  return (
    <TouchableOpacity onPress={()=>handleRecipeData(category.strCategory)} style={{height:110,width:110, backgroundColor:isSelected ? COLORS.accent : '#ffffff', marginVertical: 5, marginHorizontal: 5, justifyContent: 'center', alignItems: 'center', borderRadius: 10}} key={category.idCategory}>
        <Image source={{uri:category.strCategoryThumb}} style={{width:65, height:65,marginBottom:3, borderRadius: 50,borderColor:isSelected ? COLORS.border:'black',borderWidth:2}} />
        <Text style={{color:isSelected?'white':'black',fontFamily:fonts.bodyBold}}>{category.strCategory}</Text>
    </TouchableOpacity>
  )
}

export default CategoryCard