import React from 'react';
import {StyleSheet, SafeAreaView, Text, Image, View} from 'react-native';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';

const Single = ({route}) => {
  console.log(route.params);
  const {title, description, filename, time_added: timeAdded} = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.singleItem}>
        <Text style={{color: 'white'}}>{title}</Text>
        <Image style={styles.image} source={{uri: uploadsUrl + filename}} />
        <Text style={{color: 'white'}}>{timeAdded}</Text>
        <Text style={{color: 'white'}}>{description}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
  },

  singleItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#181818',
    borderWidth: 3,
    borderColor: '#242526',
    margin: 15,
  },

  image: {
    width: 300,
    height: 400,
    margin: 10,
  },
});

Single.propTypes = {
  route: PropTypes.object,
};

export default Single;
