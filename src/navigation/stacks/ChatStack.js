import { createStackNavigator } from '@react-navigation/stack';
import { Chat } from '../screens/index';

const Stack = createStackNavigator();

export default function ChatStack() {
    return (
        <Stack.Navigator >
            <Stack.Screen name="Chat" component={Chat} />
        </Stack.Navigator>
    )
}