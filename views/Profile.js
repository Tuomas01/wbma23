import React, {useContext} from 'react';
import {StyleSheet, SafeAreaView, Text, Button, View} from 'react-native';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const {setIsLoggedIn} = useContext(MainContext);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{color: 'white', padding: 10}}>Profile</Text>
      <Button
        title="Logout!"
        onPress={async () => {
          console.log('Logging out!');
          setIsLoggedIn(false);
          try {
            await AsyncStorage.clear();
          } catch (e) {
            console.log('Clearning async storage failed', e);
          }
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
});

export default Profile;
