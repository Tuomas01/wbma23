import {Image, Text, View, TouchableOpacity, StyleSheet} from 'react-native';
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
      <View style={styles.container}>
        <Image
          style={{width: 100, height: 100, borderRadius: 75}}
          source={{uri: uploadsUrl + item.thumbnails?.w160}}
        ></Image>
        <View>
          <Text style={{color: 'white', marginLeft: 10}}>{item.title}</Text>
          <Text style={{color: 'white', marginLeft: 10}}>{item.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: Platform.OS === 'android' ? 30 : 0,
  },
});

export default ListItem;
