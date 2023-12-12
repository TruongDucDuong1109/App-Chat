import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { setUser } from '../redux/slices/user';
import { auth } from '../../config';
import { useSelector, useDispatch } from 'react-redux';
import AuthStack from './stacks/AuthStack';
import ChatStack from './stacks/ChatStack';

export default function RootNavigator() {
    const { user } = useSelector(state => state.user);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        onAuthStateChanged(auth, u => {
            console.log('user', u);
            dispatch(setUser(u));
        });
    }, [user]);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="blue" />
            </View>
        )
    }

    return (
        <NavigationContainer>
            {user ? <ChatStack /> : <AuthStack />}
        </NavigationContainer>
    )
}