import {useEffect, useState} from 'react';
import {baseUrl} from '../utils/variables';

const useMedia = () => {
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
      } catch (error) {
        console.error('loadMedia', error);
      }
    };

    useEffect(() => {
      loadMedia();
    }, []);

    //console.log('testing', mediaArray);
  return {/*mediaArray: mediaArray | same as --> */mediaArray};
};

export {useMedia};