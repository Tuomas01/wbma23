import {useEffect, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {baseUrl} from '../utils/variables';
import ListItem from './ListItem';

const List = () => {
  const [mediaArray, setMediaArray] = useState([]);
  /* this is the same as this ^
  const stateArray = useState([]);
  const mediaArray = stateArray[0];
  const setMediaArray = stateArray[1];
  */

  const loadMedia = async () => {
    try {
      const response = await fetch(baseUrl + 'media');
      const allMedia = await response.json();
      const media = await Promise.all(
        allMedia.map(async (file) => {
          const fileResponse = await fetch(baseUrl + 'media/' + file.file_id);
          return await fileResponse.json();
        })
      );

      setMediaArray(media);
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
