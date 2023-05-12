import { View, Text } from 'react-native'
import React from 'react'
import Splash from './src/Splash'
import Stacknavigations from './src/Stacknavigations'
import { NativeBaseProvider } from 'native-base'

const App = () => {
  return (

    <NativeBaseProvider>
  
      <Stacknavigations />
      
    </NativeBaseProvider>
    
  )
}

export default App