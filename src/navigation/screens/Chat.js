import React, { useState, useEffect, useLayoutEffect, useCallback } from "react";
import { GiftedChat, Bubble, Send } from "react-native-gifted-chat";
import {
  TouchableOpacity, Text,
  Button, Image,
  View, StyleSheet
} from "react-native";
import { collection, addDoc, orderBy, onSnapshot, query } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth, database } from "../../../config";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { sendMessage } from "../../redux/slices/messageSlice";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
// Firebase Storage to upload file
import storage from "@react-native-firebase/storage";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";

export default function Chat() {
  const { message } = useSelector(state => state.message);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  //State handle upload file
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleChoose = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    const uri = result.assets[0].uri;
    const fileName = uri.substring(uri.lastIndexOf('/') + 1);
    setImage(uri);
    setImageUrl(fileName);
  };

  const onSignOut = () => {
    signOut(auth)
      .catch((error) => console.log(error));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={onSignOut}>
          <AntDesign name="logout" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useLayoutEffect(() => {
    const collectionRef = collection(database, "chats");
    const q = query(collectionRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      sendMessage(
        snapshot.docs.map((doc) => ({
          _id: doc.id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        }))
      );
    });

    return () => unsubscribe();
  }, []);

  const onSend = useCallback(async (messages = []) => {
    const myMsg = messages[0];
    myMsg.createdAt = new Date();
    myMsg.user = {
      _id: myMsg.user._id,
      name: myMsg.user.name,
    };
    if (imageUrl !== '') {
      return myMsg.text = '';
    }
    const reference = storage().ref(imageUrl);
    const pathToFile = `${FileSystem.documentDirectory}${imageUrl}`;
    await reference.putFile(pathToFile);
    myMsg.image = imageUrl;

    await addDoc(collection(database, 'chats'), myMsg);
    dispatch(sendMessage(myMsg))
    setImage(null);
    setImageUrl('');
  }, []);

  console.log(message)

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={message}
        onSend={messages => onSend(messages)}
        user={{
          _id: auth?.currentUser?.email,
        }}
        renderSend={() => (
          <View
            style={{ flexDirection: 'row', alignItems: 'center', height: 60 }}>
            {imageUrl !== '' ? (
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  backgroundColor: '#fff',
                  marginRight: 10,
                }}>
                <Image
                  source={{ uri: image }}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    position: 'absolute',
                  }}
                />
                <TouchableOpacity
                  onPress={() => { setImageUrl(''); }}
                  style={{ width: 16, height: 16, tintColor: '#fff' }}
                >
                </TouchableOpacity>
              </View>
            ) : null}
            <TouchableOpacity
              style={{ marginRight: 20 }}
              onPress={() => {
                handleChoose();
              }}>
              <Image
                source={require('../images/image.png')}
                style={{ width: 24, height: 24 }}
              />
            </TouchableOpacity>
            <Send {...props} containerStyle={{ justifyContent: 'center' }}>
              <Icon
                style={{
                  width: 24,
                  height: 24,
                  marginRight: 10,
                  tintColor: 'orange',
                }}
                name="send"
                size={24}
              />
            </Send>
          </View>
        )}
        alwaysShowSend
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
