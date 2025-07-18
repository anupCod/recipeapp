import { MealApi } from "@/services/recipeApi";
import React, { createContext, useEffect, useState } from "react";

export type CategoriesContent = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
};
export type RecipesContent = {
    strMeal:string;
    strMealThumb:string;
    idMeal:string;
}
interface ContentContextType {
  categories: CategoriesContent[];
  setCategories: React.Dispatch<React.SetStateAction<CategoriesContent[]>>;
  loading: boolean;
  selectedCategory: string | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
  recipes: RecipesContent[];
  setRecipes: React.Dispatch<React.SetStateAction<RecipesContent[]>>;
  favorites: RecipesContent[],
  setFavorites: React.Dispatch<React.SetStateAction<RecipesContent[]>>;
  featuredRecipe:RecipesContent | null;
  randomRecipes:RecipesContent[] 
}
export const ContentContext = createContext<ContentContextType>(
  {} as ContentContextType
);

type ContentProviderProps = {
  children: React.ReactNode;
};

export const ContentProvider = ({ children }: ContentProviderProps) => {
  const [categories, setCategories] = useState<CategoriesContent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string|null>(null);
  const [recipes, setRecipes] = useState<RecipesContent[]>([])
  const [favorites,setFavorites] = useState<RecipesContent[]>([])
  const [featuredRecipe, setFeaturedRecipe] = useState<RecipesContent | null>(null);
  const [randomRecipes, setRandomRecipes] = useState<RecipesContent[]>([]);
  const loadData = async () => {
    try {
      setLoading(true);
      const [apiCategories,featured,randoms] = await Promise.all([MealApi.getCategories(),MealApi.getFeaturedMeal(),MealApi.getPopularMeals()]) ;
      setCategories(apiCategories);
      setFeaturedRecipe(featured)
      setRandomRecipes(randoms)
      if(apiCategories.length>0){
        const firstLoadRecipe  = apiCategories[0].strCategory
        setSelectedCategory(firstLoadRecipe)
        const meals = await MealApi.filterByCategory(firstLoadRecipe)
        setRecipes(meals)
      } 
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <ContentContext.Provider
      value={{
        categories,
        setCategories,
        loading,
        selectedCategory,
        setSelectedCategory,
        recipes,
        setRecipes,
        favorites,
        setFavorites,
        featuredRecipe,
        randomRecipes
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};
