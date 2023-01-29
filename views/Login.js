import React, {useContext, useEffect, useState} from 'react';
import {Card, Text, Button} from '@rneui/themed';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../hooks/ApiHooks';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Login = ({navigation}) => {
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {getUserByToken} = useUser();
  const [toggleForm, setToggleForm] = useState(true);

  const checkToken = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      // if no token available, do nothing
      if (userToken === null) return;
      const userData = await getUserByToken(userToken);
      console.log(userData);
      setUser(userData);
      setIsLoggedIn(true);
    } catch (e) {
      console.log('No valid token');
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    /* <View style={styles.container}>
      <Text style={{color: 'white', padding: 10}}>Login</Text>
      <Button title="Sign in!" onPress={logIn} />
    </View> */
    <TouchableOpacity
      onPress={() => Keyboard.dismiss()}
      style={{flex: 1, backgroundColor: '#151515'}}
      activeOpacity={1}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
      >
        {toggleForm ? <LoginForm /> : <RegisterForm />}
        <Card
          containerStyle={{
            display: 'flex',
            justifyContent: 'center',
            width: '75%',
            borderRadius: 20,
          }}
        >
          <Text>
            {toggleForm
              ? 'No account yet? Please register.'
              : 'Already have an account? Please login.'}
          </Text>
          <Button
            type="outline"
            title={toggleForm ? 'Go to register' : 'Go to login'}
            onPress={() => {
              setToggleForm(!toggleForm);
            }}
          />
        </Card>
      </KeyboardAvoidingView>
    </TouchableOpacity>
  );
};

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
