import { AuthContext } from "@/hooks/useAuth";
import { MealApi, MealDetail } from "@/services/recipeApi";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View
} from "react-native";
import YoutubeIframe from "react-native-youtube-iframe";


type RecipeDetail = MealDetail;
type items = {
    ingredient: string;
    measure: string;
}
const width = Dimensions.get("window").width;
const height = Dimensions.get("screen").height;

const RecipeDetails = () => {
  const {COLORS} = useContext(AuthContext)
  const [recipeDetail, setRecipeDetail] = useState<RecipeDetail[]>(
    {} as RecipeDetail[]
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [playing,setPlaying] = useState<boolean>(true)
  const [instructionSteps,setInstructionSteps] = useState<string[]>([])
  const [ingredients,setIngredients] = useState<items[]>([])
  const { name } = useLocalSearchParams() as { name: string };
  useEffect(() => {
    const loadRecipeDetails = async () => {
      try {
        setLoading(true);
        const apiRecipeDetail = await MealApi.getMealByName(name);
        if (apiRecipeDetail.length > 0) {
          let detail:RecipeDetail = apiRecipeDetail[0]
          setRecipeDetail([detail]);

          const steps = detail.strInstructions
            .split(/* /\r?\n|\.\s+/ *//\r\n/)
            .map(step => step.trim())
            .filter(step => step.length > 0);

          setInstructionSteps(steps)
          const items: items[] = [];
          for(let i = 1; i <= 20; i++) {
            const ing: string = (detail as any)[`strIngredient${i}`];
            const meas: string = (detail as any)[`strMeasure${i}`];
            if(ing && ing.trim() !== "") {
                items.push({ ingredient: ing.trim(), measure: meas ? meas.trim() : "" });
            }
          }
          setIngredients(items)
          
        } else {
          setRecipeDetail([]);
        }
      } catch (error) {
        console.error("Error fetching recipe detail:", error);
      } finally {
        setLoading(false);
      }
    };

    if (name) {
      loadRecipeDetails();
    }
  }, [name]);
  const onStateChange = useCallback((state: string) => {
    if(state === 'ended'){
        setPlaying(false)
        Alert.alert('Video has finished Playing!')
    }
  },[])
  if (loading) return <ActivityIndicator size="large" color="orange" />;
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:16}} style={{flex:1}}>
      <View style={{position:'relative',backgroundColor:'black'}}>
        <Image
          source={{ uri: recipeDetail[0]?.strMealThumb }}
          style={{ height: height / 2, width: width,opacity:0.6 }}
        />
        
        <Pressable
          style={{
            position:'absolute',
            top: 20,
            left: "3%",
            backgroundColor: "white",
            opacity: 0.8,
            padding: 13,
            borderRadius: '100%',
          }}
          onPress={()=>router.back()}
        >
          <Ionicons name="arrow-back" size={23} color="orangered" />
        </Pressable>
        <View
          style={{
            position: "absolute",
            top: 20,
            left: "84%",
            backgroundColor: "orangered",
            padding: 13,
            borderRadius: '100%',
          }}
        >
          <Ionicons name="bookmark" size={23} color="white" />
        </View>
        <View style={{position:'absolute',bottom:40,gap:10,left:'4%',width:width-20}}>
            <View style={{backgroundColor:'orangered',width:80,paddingVertical:8,alignSelf:'flex-start',borderRadius:16}}>
                <Text style={{color:'white',textAlign:'center',fontWeight:'bold'}}>{recipeDetail[0]?.strCategory}</Text>
            </View>
          <Text style={{fontSize:23,fontWeight:'bold',color:'white',letterSpacing:1}}>{recipeDetail[0]?.strMeal}</Text>
          <View style={{ flexDirection: "row",gap:4 }}>
            <Ionicons name="location-outline" size={18} color="white" />
            <Text style={{color:'white',fontWeight:'bold'}}>{recipeDetail[0]?.strArea}</Text>
          </View>
        </View>
      </View>
      <View style={{position:'relative',bottom:20,width:width,paddingTop:30,borderTopLeftRadius:16,borderTopRightRadius:16,alignItems:'center',backgroundColor:COLORS.background,height:'auto',gap:10}}>
        <View style={{flexDirection:'row',gap:15}}>
            <View style={{alignItems:'center',justifyContent:'center',backgroundColor:'white',shadowOffset:{width:0,height:2},shadowColor:'grey',shadowOpacity:0.2,shadowRadius:5,width:width/2-20,height:160}}>
                <Ionicons name="time" size={35} color='grey' />
                <Text style={{fontSize:18,color:'orangered',fontWeight:"bold"}}>30 minutes</Text>
                <Text>Preparation Time</Text>
            </View>
            <View style={{alignItems:'center',justifyContent:'center',backgroundColor:'white',shadowOffset:{width:0,height:2},shadowColor:'grey',shadowOpacity:0.2,shadowRadius:5,width:width/2-20,height:160}}>
                <Ionicons name="people" size={35} color="green" />
                <Text style={{fontSize:18,color:'orangered',fontWeight:"bold"}}>4</Text>
                <Text>Servings</Text>
            </View>
        </View>
        <View style={{alignSelf:'flex-start',padding:16}}>
            <View style={{flexDirection:'row',alignItems:'center',gap:5,marginBottom:16}}>
                <Ionicons name="logo-youtube" size={23} color="orangered" />
                <Text style={{fontSize:18,fontWeight:'bold',color:'orangered'}}>Tutorial Video</Text>
            </View>
            {
                Platform.OS === 'web' ? 
                <Text>Youtube link not supported</Text>:
                <YoutubeIframe
                    height = {200}
                    width = {width-30}
                    playing={playing}
                    videoId = {recipeDetail[0].strYoutube.slice(recipeDetail[0].strYoutube.indexOf('=')+1)}
                    onChangeState = {onStateChange}
                />
            }  
        </View>
        <View style={{alignSelf:'flex-start',paddingHorizontal:16}}>
            <View style={{flexDirection:'row',alignItems:'center',gap:3,marginBottom:14}}>
                <Ionicons name='list' size={23} color='orangered' />
                <Text style={{fontSize:18,fontWeight:'bold',color:'orangered'}}>Ingredients</Text>
            </View>
            {ingredients.map((ingredient,index) => (
                <View key={index} style={{flexDirection:'row',alignItems:'center',paddingLeft:16,justifyContent:'space-between',width:width-30,marginBottom:14,borderRadius:12,backgroundColor:'white',shadowColor:'grey',shadowOffset:{height:0,width:0},shadowOpacity:0.4,shadowRadius:4,elevation:10}}>
                    <Text style={{fontWeight:'500'}}>{ingredient.ingredient}</Text>
                    <Text style={{backgroundColor:COLORS.button,width:115,textAlign:'center',color:'white',paddingVertical:12,borderTopEndRadius:12,borderBottomEndRadius:12}}>{ingredient.measure}</Text>
                </View>
            ))}
        </View>
        <View style={{alignSelf:'flex-start',padding:16}}>
            <View style={{flexDirection:'row',alignItems:'center',gap:3,marginBottom:14}}>
                <Ionicons name='list' size={23} color='orangered' />
                <Text style={{fontSize:18,fontWeight:'bold',color:'orangered'}}>Instructions</Text>
            </View>
            {
                instructionSteps.map((step,index)=>(
                    <View key={index} style={{marginBottom:14,padding:12,borderRadius:6,backgroundColor:'white',shadowColor:'grey',shadowOffset:{height:0,width:0},shadowOpacity:0.4,shadowRadius:4,elevation:10}}>
                        <Text style={{marginBottom:4,fontSize:15,color:'orangered',fontWeight:'500'}}>Step {index+1}</Text>
                        <Text style={{textAlign:'justify'}}>{step}</Text>
                    </View>
                ))
            }
        </View>
        
      </View>
    </ScrollView>
  );
};

export default RecipeDetails;
