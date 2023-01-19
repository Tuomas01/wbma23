import React, {useContext, useEffect} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuthentication} from '../hooks/ApiHooks';
import {getUserByToken} from '../hooks/ApiHooks';
import {useUser} from '../hooks/ApiHooks';
import LoginForm from '../components/LoginForm';


const Login = ({navigation}) => {
  const {setIsLoggedIn} = useContext(MainContext);
  const {getUserByToken} = useUser();

  const checkToken = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      // if no token available, do nothing
      if (userToken === null) return;
      const userData = await getUserByToken(userToken);
      console.log(userData);
      setIsLoggedIn(true);
    } catch (e) {
      console.log('No valid token');
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <View style={styles.container}>
<<<<<<< Updated upstream
      <Text>Login</Text>
      <Button title="Sign in!" onPress={logIn} />
=======
      <LoginForm />
>>>>>>> Stashed changes
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
