import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

const Splash = () => {
    const navigation = useNavigation()

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate("Home")
        }, 5000)
    }, [])
  return (
    <View style={{flex:1, justifyContent:"center", alignItems:'center'}}>
      <Text style={{color:"#0373fc", fontSize:20}}>NotePad</Text> 
    </View>
  )
}

export default Splash