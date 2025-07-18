import RecipeCard from "@/components/RecipeCard";
import { fonts } from "@/constants/font";
import { ContentContext } from "@/context/ContentProvider";
import { AuthContext } from "@/hooks/useAuth";
import { useContext } from "react";
import { FlatList, Text, View } from "react-native";

export default function RecipeScreen(){
    const {COLORS} = useContext(AuthContext)
    const {randomRecipes} = useContext(ContentContext);
    if(randomRecipes.length === 0) return null;
    return(
        <>
            <View style={{paddingHorizontal:6,backgroundColor:COLORS.background}}>
                <Text style={{color:COLORS.primaryText,fontSize:18,fontFamily:fonts.heading,marginVertical:12,textAlign:'center'}}>Popular Recipes</Text>
                <FlatList
                    data={randomRecipes}
                    keyExtractor={(item) => item.idMeal}
                    renderItem={({ item }) => <RecipeCard item={item} />}
                    numColumns={2}
                    columnWrapperStyle={{ gap:8}}
                    contentContainerStyle={{ gap: 10, paddingBottom: 100 }}
                />
            </View>
        </>
    )
}