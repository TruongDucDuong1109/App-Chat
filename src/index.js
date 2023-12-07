import { View, Text, TextInput, Button } from 'react-native';
import React, { useState } from 'react';
import { db } from '../config';
import { ref, set } from 'firebase/database';

const Adddata = () => {
  const [title, settitle] = useState('');
  const [body, setbody] = useState('');

  const add = () => {
    const postsRef = ref(db, 'posts/' + title);

    set(postsRef, {
      title: title,
      body: body
    })
      .then(() => {
        console.log('Dữ liệu được thêm thành công!');
        settitle('');
        setbody('');
      })
      .catch((error) => {
        console.error('Lỗi khi thêm dữ liệu: ', error.message);
      });
  };

  return (
    <View>
      <Text>Thêm dữ liệu</Text>
      <TextInput
        placeholder='Tiêu đề'
        value={title}
        onChangeText={(text) => settitle(text)}
      />
      <TextInput
        placeholder='Nội dung'
        value={body}
        onChangeText={(text) => setbody(text)}
      />
      <Button title='Thêm Dữ Liệu' onPress={add} />
    </View>
  );
};

export default Adddata;
