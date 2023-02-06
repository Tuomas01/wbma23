import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTag} from '../hooks/ApiHooks';
import {uploadsUrl} from '../utils/variables';
import {Card, Image, Text, Button} from '@rneui/themed';
import UpdateForm from '../components/UpdateForm';

const Profile = () => {
  const {getFilesByTag} = useTag();
  const {setIsLoggedIn, user, setUser} = useContext(MainContext);
  const [avatar, setAvatar] = useState('');
  const [toggleProfile, setToggleProfile] = useState(true);

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
        alignItems: 'center',
        backgroundColor: '#151515',
      }}
    >
      {toggleProfile ? (
        <Card
          containerStyle={{
            display: 'flex',
            alignItems: 'center',
            width: '75%',
            borderRadius: 20,
          }}
        >
          <Text h2>Profile</Text>
          <Image
            source={{uri: uploadsUrl + avatar}}
            containerStyle={{
              aspectRatio: 1,
              width: '100%',
              borderWidth: 2,
              borderColor: 'black',
              marginBottom: 5,
            }}
          />
          <Text style={{marginBottom: 5, textAlign: 'left'}}>
            Username: {user.username}
          </Text>
          <Text style={{marginBottom: 5, textAlign: 'left'}}>
            Email: {user.email}
          </Text>
          <Text style={{marginBottom: 5, textAlign: 'left'}}>
            Full name: {user.full_name}
          </Text>
          <Button
            title="Logout"
            buttonStyle={{
              borderRadius: 10,
              backgroundColor: '#320064',
              width: '100%',
            }}
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
        </Card>
      ) : (
        <UpdateForm />
      )}
      <Card
        containerStyle={{
          display: 'flex',
          justifyContent: 'center',
          width: '75%',
          borderRadius: 20,
        }}
      >
        <Text style={{marginBottom: 5, textAlign: 'center'}}>
          {toggleProfile
            ? 'Update your profile.'
            : 'Get back to the profile page.'}
        </Text>
        <Button
          title={toggleProfile ? 'Update' : 'Back to profile'}
          buttonStyle={{
            borderRadius: 10,
            backgroundColor: '#320064',
          }}
          onPress={() => {
            setToggleProfile(!toggleProfile);
          }}
        />
      </Card>
    </SafeAreaView>
  );
};

export default Profile;
