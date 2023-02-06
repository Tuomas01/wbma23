import AsyncStorage from '@react-native-async-storage/async-storage';
import {Card, Text, Button, Input} from '@rneui/themed';
import {Controller, useForm} from 'react-hook-form';

const Update = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {username: '', password: '', email: ''},
  });

  const UpdateUser = async (updatedData) => {
    console.log('UpdateUser button pressed', updatedData);
    // const data = {username: 'tuomheik', password: 'newpass1234'};
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      console.log('testing profile:', userToken);
      // const loginResult = await postLogin(loginData);
      // console.log('logIn', loginResult);
    } catch (error) {
      console.error('UpdateUser', error);
    }
  };

  return (
    <Card
      containerStyle={{
        display: 'flex',
        justifyContent: 'center',
        width: '75%',
        borderRadius: 20,
      }}
    >
      <Text h2 h2Style={{textAlign: 'center'}}>
        Update User
      </Text>
      <Controller
        control={control}
        rules={{required: {value: true, message: 'is required'}}}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Username"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.username && errors.username.message}
          />
        )}
        name="username"
      />
      <Controller
        control={control}
        rules={{required: {value: true, message: 'is required'}}}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={true}
            errorMessage={errors.password && errors.password.message}
          />
        )}
        name="password"
      />
      <Controller
        control={control}
        rules={{required: {value: true, message: 'is required'}}}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={true}
            errorMessage={errors.password && errors.password.message}
          />
        )}
        name="email"
      />
      <Button
        buttonStyle={{borderRadius: 10, backgroundColor: '#320064'}}
        title="Update"
        onPress={handleSubmit(UpdateUser)}
      />
    </Card>
  );
};

export default Update;
