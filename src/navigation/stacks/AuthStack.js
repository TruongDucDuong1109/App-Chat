import { createStackNavigator } from '@react-navigation/stack';
import { Login, Signup } from '../screens/index';

const Stack = createStackNavigator();

export default function AuthStack() {
    return (
        <Stack.Navigator initialRouteName="Login" screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
    )
}