import AsyncStorage from '@react-native-async-storage/async-storage';
import {ButtonGroup} from '@rneui/base';
import {View, TouchableOpacity, Alert} from 'react-native';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import {useContext} from 'react';
import {MainContext} from '../contexts/MainContext';
import {useMedia} from '../hooks/ApiHooks';
import {Card, Image, Text} from '@rneui/themed';

const ListItem = ({singleMedia, navigation}) => {
  const {user, setUpdate, update} = useContext(MainContext);
  const {deleteMedia} = useMedia();
  const item = singleMedia;

  const doDelete = () => {
    try {
      Alert.alert('Delete', 'this file permanently', [
        {text: 'Cancel'},
        {
          text: 'OK',
          onPress: async () => {
            const token = await AsyncStorage.getItem('userToken');
            const response = await deleteMedia(item.file_id, token);
            response && setUpdate(!update);
          },
        },
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Single', item);
      }}
    >
      <Card containerStyle={{borderRadius: 20}}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Image
            source={{uri: uploadsUrl + item.thumbnails?.w160}}
            containerStyle={{
              width: 100,
              height: 100,
              borderRadius: 75,
              borderWidth: 2,
              borderColor: 'black',
            }}
          ></Image>
          <View>
            <Text style={{marginLeft: 10}}>{item.title}</Text>
            <Text style={{marginLeft: 10}}>{item.description}</Text>
          </View>
          {item.user_id === user.user_id && (
            <ButtonGroup
              containerStyle={{width: 200}}
              buttons={['Modify', 'Delete']}
              rounded
              onPress={(index) => {
                if (index === 0) {
                  navigation.navigate('Modify', {file: item});
                } else {
                  doDelete();
                }
              }}
            />
          )}
        </View>
      </Card>
    </TouchableOpacity>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
};

export default ListItem;
