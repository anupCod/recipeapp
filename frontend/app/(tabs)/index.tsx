import Categories from "@/components/Categories";
import CategorizeRecipe from "@/components/CategorizeRecipe";
import FeaturedRecipe from "@/components/FeaturedRecipe";
import HomeHeader from "@/components/HomeHeader";
import { useHomeStyles } from "@/styles/home.styles";
import { ScrollView } from "react-native";


export default function IndexScreen(){
    const homeStyles = useHomeStyles()
    return(
        <ScrollView style={homeStyles.container}>
            <HomeHeader />
            <FeaturedRecipe />
            <Categories />
            <CategorizeRecipe/>
        </ScrollView>
    )
}