const BASE_URI = 'https://www.themealdb.com/api/json/v1/1'

interface Category {
    idCategory: string;
    strCategory: string;
    strCategoryThumb: string;
    strCategoryDescription: string;
}

interface Meal {
    strMeal: string;
    strMealThumb: string;
    idMeal: string;
}


export type MealDetail = Meal & {
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strYoutube: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string;
  strIngredient7: string;
  strIngredient8: string;
  strIngredient9: string;
  strIngredient10: string;
  strIngredient11: string;
  strIngredient12: string;
  strIngredient13: string;
  strIngredient14: string;
  strIngredient15: string;
  strIngredient16: string | null;
  strIngredient17: string | null;
  strIngredient18: string | null;
  strIngredient19: string | null;
  strIngredient20: string | null;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strMeasure5: string;
  strMeasure6: string;
  strMeasure7: string;
  strMeasure8: string;
  strMeasure9: string;
  strMeasure10: string;
  strMeasure11: string;
  strMeasure12: string;
  strMeasure13: string;
  strMeasure14: string;
  strMeasure15: string;
  strMeasure16: string | null;
  strMeasure17: string | null;
  strMeasure18: string | null;
  strMeasure19: string | null;
  strMeasure20: string | null;
  strSource: string | null;
}

interface CategoriesResponse {
    categories: Category[];
}

interface MealsResponse {
    meals: Meal[];
}
interface MealsDetailResponse{
    meals:MealDetail[]
}
export const MealApi = {
    getCategories: async (): Promise<Category[]> => {
        try {
            const response = await fetch(`${BASE_URI}/categories.php`)
            if(!response.ok){
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            const data: CategoriesResponse = await response.json()
            return data.categories || []
        } catch(error) {
            console.error("Error fetching categories:",error)
            return []
        }
    },

    getFeaturedMeal:async():Promise<Meal|null>=>{
        try{
            const response = await fetch(`${BASE_URI}/random.php`)
            if(!response.ok){
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            const data:MealsDetailResponse = await response.json()
            return data.meals[0]
        }catch(error){
            console.error("Error fetching featured meal:", error)
            return null
        }
    },
    getPopularMeals:async():Promise<Meal[]> =>{
        try {
            const requests:Promise<MealsDetailResponse>[] = Array.from({length:14},()=>
                fetch(`${BASE_URI}/random.php`).then((res)=> res.json())
            )
            const responses = await Promise.all(requests)
            const meals = responses.map((data)=> data.meals[0])
            return meals
        } catch(error) {
            console.error('Error fetching 10 random meals:',error)
            return []
        }
    },

    filterByCategory : async (category: string): Promise<Meal[]> => {
        try {
            const response = await fetch(`${BASE_URI}/filter.php?c=${category}`)
            if(!response.ok){
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            const data: MealsResponse = await response.json()
            return data.meals || []
        } catch(error) {
            console.error("Error fetching meals by category:",error)
            return []
        }   
    },

    getMealByName: async(mealname:string):Promise<MealDetail[]>=> {
        try {
            const response = await fetch(`${BASE_URI}/search.php?s=${mealname}`)
            if(!response.ok){
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            const data:MealsDetailResponse = await response.json()
            return data.meals || []            
        } catch(error) {
            console.error("Error fetching the response",error)
            return []
        }
    }
}