import { fonts } from "@/constants/font";
import { ContentContext } from "@/context/ContentProvider";
import React, { useContext } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import CategoryCard from "./CategoryCard";
import { AuthContext } from "@/hooks/useAuth";

const Categories = () => {
  const { COLORS } = useContext(AuthContext);
  const { categories, loading } = useContext(ContentContext);
  return (
    <View>
      <Text style={{ color: COLORS.primaryText, fontSize: 18, fontFamily:fonts.heading }}>
        Categories Screen
      </Text>
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.button} />
      ) : (
        <FlatList
          data={categories}
          keyExtractor={(item) => item.idCategory}
          renderItem={({ item }) => <CategoryCard category={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingVertical: 10,
            shadowColor: "#000", // 🟢 Required for iOS
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.2,
            shadowRadius: 4,
          }}
        />
      )}
    </View>
  );
};

export default Categories;
