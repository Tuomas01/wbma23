import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTag} from '../hooks/ApiHooks';
import {uploadsUrl} from '../utils/variables';
import {Card, Image, Text, Button} from '@rneui/themed';

const Profile = () => {
  const {getFilesByTag} = useTag();
  const {setIsLoggedIn, user, setUser} = useContext(MainContext);
  const [avatar, setAvatar] = useState('');

  const loadAvatar = async () => {
    try {
      const avatarArray = await getFilesByTag('avatar_' + user.user_id);
      setAvatar(avatarArray.pop().filename);
    } catch (error) {
      console.error('user avatar fetch failed', error.message);
    }
  };

  useEffect(() => {
    loadAvatar();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#151515',
      }}
    >
      <Card containerStyle={{borderRadius: 20}}>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text h2>Profile</Text>
          <Image
            source={{uri: uploadsUrl + avatar}}
            containerStyle={{
              width: 300,
              height: 300,
              borderWidth: 2,
              borderColor: 'black',
              marginBottom: 5,
            }}
          />
          <Text style={{marginBottom: 5}}>Username: {user.username}</Text>
          <Text style={{marginBottom: 5}}>Email: {user.email}</Text>
          <Text style={{marginBottom: 5}}>Full name: {user.full_name}</Text>
          <Button
            title="Logout!"
            buttonStyle={{borderRadius: 10, backgroundColor: '#320064'}}
            onPress={async () => {
              console.log('Logging out!');
              setUser({});
              setIsLoggedIn(false);
              try {
                await AsyncStorage.clear();
              } catch (e) {
                console.log('Clearning async storage failed', e);
              }
            }}
          />
        </View>
      </Card>
    </SafeAreaView>
  );
};

export default Profile;
