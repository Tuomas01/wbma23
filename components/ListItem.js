import {View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import {Card, Image, Text} from '@rneui/themed';

const ListItem = ({singleMedia, navigation}) => {
  const item = singleMedia;
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Single', item);
      }}
    >
      <Card containerStyle={{borderRadius: 20}}>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'wrap'}}>
          <Image
            source={{uri: uploadsUrl + item.thumbnails?.w160}}
            containerStyle={{width: 100, height: 100, borderRadius: 75, borderWidth: 2,
              borderColor: 'black'}}
          ></Image>
          <View>
            <Text style={{marginLeft: 10}}>{item.title}</Text>
            <Text style={{marginLeft: 10}}>{item.description}</Text>
          </View>
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
