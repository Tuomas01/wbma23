import {Image, Text, View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';

const ListItem = ({singleMedia, navigation}) => {
  const item = singleMedia;
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Single', item);
      }}
    >
      <Image
        style={{width: 100, height: 100, borderRadius: 75}}
        source={{uri: uploadsUrl + item.thumbnails?.w160}}
      ></Image>
      <View>
        <Text style={{color: 'white'}}>{item.title}</Text>
        <Text style={{color: 'white'}}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
};

export default ListItem;
