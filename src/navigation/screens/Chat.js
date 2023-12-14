import React, { useState, useEffect, useLayoutEffect, useCallback } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { TouchableOpacity, Text } from "react-native";
import { collection, addDoc, orderBy, query, onSnapshot } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth, database } from "../../../config";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { sendMessage } from "../../redux/slices/messageSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Chat() {
  const { message } = useSelector(state => state.message);
  const navigation = useNavigation();
  const dispatch = useDispatch();

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
  }, []);

  // useLayoutEffect(() => {
  //   const collectionRef = collection(database, "chats");
  //   const q = query(collectionRef, orderBy("createdAt", "desc"));

  //   const unsubscribe = onSnapshot(q, (snapshot) => {
  //     dispatch(sendMessage(
  //       snapshot.docs.map((doc) => ({
  //         _id: doc.id, // Sử dụng doc.id như làm định danh duy nhất
  //         createdAt: doc.data().createdAt.toDate(),
  //         text: doc.data().text,
  //         user: doc.data().user,
  //       }))
  //     ))
  //   });
  //   return () => unsubscribe();
  // }, []);

  const onSend = useCallback(
    async (messages = []) => {
      dispatch(sendMessage(messages))
      const { _id, createdAt, text, user } = messages[0];
      await addDoc(collection(database, "chats"), {
        _id, createdAt, text, user,
      });
    }, []);

  return (
    <GiftedChat
      messages={message}
      onSend={(newMessages) => onSend(newMessages)}
      user={{
        _id: auth?.currentUser?.email,
      }}
    />
  );
}
