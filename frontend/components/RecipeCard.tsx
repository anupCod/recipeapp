import { fonts } from "@/constants/font";
import { ContentContext, RecipesContent } from "@/context/ContentProvider";
import { AuthContext } from "@/hooks/useAuth";
import { useHomeStyles } from "@/styles/home.styles";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useContext } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

type RecipeCardProps = {
  item: RecipesContent;
};
interface AddToFavoritesFn {
  (item: RecipesContent): void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ item }) => {
  const homeStyles = useHomeStyles()
  const {COLORS} = useContext(AuthContext)
  const router = useRouter();
  const { setFavorites } = useContext(ContentContext);

  const addToFavorites: AddToFavoritesFn = (item) => {
    setFavorites((prevFavorites: RecipesContent[]) => {
      // Check if the item is already in favorites
      const isFavorite = prevFavorites.some(
        (fav: RecipesContent) => fav.idMeal === item.idMeal
      );
      if (isFavorite) {
        // If it is, remove it from favorites
        return prevFavorites.filter(
          (fav: RecipesContent) => fav.idMeal !== item.idMeal
        );
      } else {
        // If not, add it to favorites
        return [...prevFavorites, item];
      }
    });
  };
  return (
    <TouchableOpacity
      style={homeStyles.recipeCard}
      onPress={() =>
        router.push({
          pathname: "/recipe/[name]",
          params: { name: item.strMeal },
        })
      }
    >
      
      <Image
        source={{ uri: item.strMealThumb }}
        style={{ height: 170, width: "100%", borderTopLeftRadius: 16 }}
      />
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        style={{
          textAlign: "center",
          paddingVertical: 6,
          color: "orangered",
          fontSize: 14,
          fontFamily:fonts.heading,
          paddingHorizontal: 6,
        }}
      >
        {item.strMeal}
      </Text>
      <TouchableOpacity
        style={{
          position: "absolute",
          top: 10,
          left: "78%",
          backgroundColor: COLORS.primaryText,
          padding: 4,
          borderRadius: 16,
        }}
        onPress={() => addToFavorites(item)}
      >
        <Ionicons name="bookmark" size={20} color="white" />
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          gap: 24,
          position: "absolute",
          bottom: 10,
          paddingHorizontal: 12,
        }}
      >
        <View style={{ flexDirection: "row", gap: 3, alignItems: "center" }}>
          <Ionicons name="time" size={16} color="black" />
          <Text style={{fontFamily:fonts.bodyRegular}}>30 Minutes</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 3, alignItems: "center" }}>
          <Ionicons name="people" size={16} color="black" />
          <Text style={{fontFamily:fonts.bodyRegular}}>4</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RecipeCard;
