import {useEffect, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import ListItem from './ListItem';

const List = () => {
  const url =
    'https://raw.githubusercontent.com/mattpe/wbma/master/docs/assets/test.json';
  const [mediaArray, setMediaArray] = useState([]);
  /* this is the same as this ^
  const stateArray = useState([]);
  const mediaArray = stateArray[0];
  const setMediaArray = stateArray[1];
  */

  const loadMedia = async () => {
    try {
    const response = await fetch(url);
    const json = await response.json();
    setMediaArray(json);
    } catch {
      console.log('loadMedia', error);
    }
  };

  useEffect(() => {
    loadMedia();
  }, []);

  console.log('testing', mediaArray);

  return (
    <FlatList
      data={mediaArray}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => <ListItem singleMedia={item} />}
    />
  );
};

export default List;
