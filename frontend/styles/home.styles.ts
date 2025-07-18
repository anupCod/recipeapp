/* import { useTheme } from "@/hooks/useTheme";
import { Dimensions, StyleSheet } from "react-native";


const width = Dimensions.get("window").width;
const COLORS = useTheme()

export const homeStyles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 16,
  },

  //for styling HomeHeader component
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16, // vertical center alignment
  },
  headerCaptionContainer: {
    maxWidth: width - 82, // space = padding + image width + margin between the
  },
  headerCaption: {
    fontSize: 20,
    fontWeight:600,
    color:COLORS.primaryText
  },
  headerImage: {
    width: 46,
    height: 46,
    borderRadius: 46,
    resizeMode: "cover", // keep aspect ratio, cover entire area
  },

  //for categorized recipe
  recipeCard: {
    width: (width - 32) / 2,
    height: 240,
    position:'relative',
    borderRadius:16,
    backgroundColor:COLORS.cardBackground,
    marginBottom: 12,
    shadowColor: COLORS.shadow, // 🟢 Required for iOS
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
}); */

// hooks/useHomeStyles.js
import { Dimensions, StyleSheet } from "react-native";
import {useContext} from 'react'
import { AuthContext } from "@/hooks/useAuth";

const width = Dimensions.get("window").width;

export const useHomeStyles = () => {
  const {COLORS} = useContext(AuthContext);

  return StyleSheet.create({
    container: {
      backgroundColor: COLORS.background,
      flex: 1,
      paddingHorizontal: 10,
      paddingVertical: 16,
    },
    headerContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
    },
    headerCaptionContainer: {
      maxWidth: width - 82,
    },
    headerCaption: {
      fontSize: 20,
      fontWeight: "600",
      color: COLORS.primaryText,
    },
    headerImage: {
      width: 46,
      height: 46,
      borderRadius: 46,
      resizeMode: "cover",
    },
    recipeCard: {
      width: (width - 32) / 2,
      height: 240,
      position: "relative",
      borderRadius: 16,
      backgroundColor: COLORS.cardBackground,
      marginBottom: 12,
      shadowColor: COLORS.shadow,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.4,
      shadowRadius: 2,
    },
  })
};

