import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { onAuthStateChanged } from 'firebase/auth';

import Login from './screens/Login';
import Chat from './screens/Chat';
import Adddata from './src';
import Signup from './screens/Signup';
import { createContext, useEffect, useState, useContext } from 'react';
import { setUser } from './redux/slices/user';
import { auth } from './config';
import { store } from './redux/store';
import { Provider, useSelector, useDispatch } from 'react-redux';


const Stack = createStackNavigator();
// const AuthenticateUserContext = createContext({});

// const AuthenticateUserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   return (
//     <AuthenticateUserContext.Provider value={{ user, setUser }}>
//       {children}
//     </AuthenticateUserContext.Provider>
//   )
// };

function ChatStack() {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  )
}

function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  )
}

function RootNavigator() {
  const { user } = useSelector(state => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,
      async authenticatedUser => {
        authenticatedUser ? dispatch(setUser(authenticatedUser)) : dispatch(setUser(null));
        setIsLoading(false);
      }
    );
    return () => unsubscribe();
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

export default function App() {
  return (
    // <AuthenticateUserProvider>
    //   <RootNavigator />
    // </AuthenticateUserProvider>
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  )
}



