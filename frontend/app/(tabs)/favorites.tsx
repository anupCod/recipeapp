import RecipeCard from "@/components/RecipeCard";
import { fonts } from "@/constants/font";
import { ContentContext } from "@/context/ContentProvider";
import { AuthContext } from "@/hooks/useAuth";
import { useContext } from "react";
import { FlatList, Text, View } from "react-native";

export default function FavoriteScreen() {
    const {COLORS} = useContext(AuthContext)
    const {favorites} = useContext(ContentContext)
  return (
    <>
      <View style={{flex:1,paddingHorizontal:10,backgroundColor:COLORS.background}}>
        <Text style={{color:COLORS.primaryText,fontSize:18,fontFamily:fonts.heading,marginVertical:12,textAlign:'center'}}>Favorite Recipes</Text>
        {
          favorites.length !== 0 ? 
          <FlatList
            data={favorites}
            keyExtractor={(item) => item.idMeal}
            renderItem={({ item }) => <RecipeCard item={item} />}
            numColumns={2}
            columnWrapperStyle={{ gap:12 }}
            contentContainerStyle={{ gap: 10, paddingBottom: 100 }}
          />:
          <Text style={{color:COLORS.secondaryText}}>No Saved Recipes</Text>
        }
        
      </View>
    </>
  );
}
