import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Introduction from '../../screens/Introduction/Introduction'

const Stack = createNativeStackNavigator()

const IntroductionNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Introduction" component={Introduction} />
    </Stack.Navigator>
  )
}

export default IntroductionNavigator
