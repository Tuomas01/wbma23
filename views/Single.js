import React from 'react';
import {SafeAreaView, View} from 'react-native';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import {Card, Text, Image} from '@rneui/themed';

const Single = ({route}) => {
  console.log(route.params);
  const {title, description, filename, time_added: timeAdded} = route.params;
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
          <Text h2 h2Style={{marginBottom: 5}}>{title}</Text>
          <Image
            source={{uri: uploadsUrl + filename}}
            containerStyle={{
              width: 300,
              height: 300,
              borderWidth: 2,
              borderColor: 'black',
              marginBottom: 5,
            }}
          />
          <Text>{timeAdded}</Text>
          <Text>{description}</Text>
        </View>
      </Card>
    </SafeAreaView>
  );
};

Single.propTypes = {
  route: PropTypes.object,
};

export default Single;
