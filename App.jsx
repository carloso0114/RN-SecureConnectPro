import React, { useState, useEffect} from 'react';
import {
  SafeAreaView, Text, FlatList, View
} from 'react-native';
import firestore from '@react-native-firebase/firestore';


function App() {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore().collection('Users').onSnapshot(snapshot => {
      const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUserList(users);
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView>
      <FlatList
        data={userList}
        renderItem={({ item }) => (
          <View>
            <Text>ID: {item.id}</Text>
            <Text>Phone: {item.phone}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

export default App;
