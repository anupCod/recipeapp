import { AuthContext } from '@/hooks/useAuth'
import React, { useContext } from 'react'
import { StatusBar, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type SafeScreenProps = {
    children:React.ReactNode
}
const SafeScreen = ({children}:SafeScreenProps) => {
    const {isDarkMode,COLORS} = useContext(AuthContext)
    const insets = useSafeAreaInsets()
  return (
    <View style={{paddingTop:insets.top,flex:1,backgroundColor:COLORS.background}}>
        <StatusBar backgroundColor={COLORS.button} barStyle={isDarkMode?"light-content":"dark-content"} />
        {children}
    </View>
  )
}

export default SafeScreen