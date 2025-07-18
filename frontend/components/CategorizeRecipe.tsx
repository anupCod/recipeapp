/* import { MealApi } from '@/services/recipeApi' */
import { fonts } from '@/constants/font'
import { ContentContext } from '@/context/ContentProvider'
import React, { useContext } from 'react'
import { /* FlatList, */ Text, View } from 'react-native'
import RecipeCard from './RecipeCard'
import { AuthContext } from '@/hooks/useAuth'

const CategorizeRecipe = () => {
    const {COLORS} = useContext(AuthContext)
    const {recipes,selectedCategory} = useContext(ContentContext)
  return (
    <>
        <View>
            <Text style={{color:COLORS.primaryText,fontSize:18,fontFamily:fonts.heading,marginVertical:12}}>{selectedCategory}</Text>
            <View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'center',gap:10}}>
                {
                    recipes.map((item)=>(
                        <React.Fragment key={item.idMeal}>
                            <RecipeCard item={item} />
                        </React.Fragment>
                    ))
                }
            </View>
            
            {/* <FlatList
                data={recipes}
                keyExtractor={item => item.idMeal}
                renderItem={({ item }) => (
                    <RecipeCard item={item} />
                )}
                numColumns={2}
                columnWrapperStyle={{justifyContent:'space-between'}}
                contentContainerStyle={{gap:16}}
            /> */}
        </View>
    </>
  )
}

export default CategorizeRecipe