import {useEffect, useState, useContext} from 'react';
import {baseUrl, appId} from '../utils/variables';
import {MainContext} from '../contexts/MainContext';

const doFetch = async (url, options) => {
  const response = await fetch(url, options);
  const json = await response.json();
  if (!response.ok) {
    const message = json.error
      ? `${json.message}: ${json.error}`
      : json.message;
    throw new Error(message || response.status);
  }
  return json;
};

const useMedia = (myFilesOnly) => {
  const [mediaArray, setMediaArray] = useState([]);
  /* this is the same as this ^
    const stateArray = useState([]);
    const mediaArray = stateArray[0];
    const setMediaArray = stateArray[1];
    */
  const {update, user} = useContext(MainContext);

  const loadMedia = async () => {
    try {
      // const response = await fetch(baseUrl + 'media');
      // const json = await response.json();
      let json = await useTag().getFilesByTag(appId);
      // keep users files if MyFilesOnly
      if (myFilesOnly) {
        json = json.filter((file) => file.user_id === user.user_id);
      }
      json.reverse();
      const media = await Promise.all(
        json.map(async (file) => {
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
  }, [update]);

  const postMedia = async (fileData, token) => {
    const options = {
      method: 'post',
      headers: {
        'x-access-token': token,
        'Content-Type': 'multipart/form-data',
      },
      body: fileData,
    };
    try {
      return await doFetch(baseUrl + 'media', options);
    } catch (error) {
      throw new Error('postMedia: ' + error.message);
    }
  };

  const deleteMedia = async (id, token) => {
    try {
      return await doFetch(baseUrl + 'media/' + id, {
        headers: {'x-access-token': token},
        method: 'delete',
      });
    } catch (error) {
      throw new Error('deleteMedia, ' + error.message);
    }
  };

  const putMedia = async (id, data, token) => {
    const options = {
      method: 'put',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    try {
      return await doFetch(baseUrl + 'media/' + id, options);
    } catch (error) {
      throw new Error('putMedia: ' + error.message);
    }
  };

  // console.log('testing', mediaArray);
  return {
    /* mediaArray: mediaArray | same as --> */ mediaArray,
    postMedia,
    deleteMedia,
    putMedia,
  };
};

const useAuthentication = () => {
  const postLogin = async (userCredentials) => {
    // user credentials format: {username: 'someUsername', password: 'somePassword'}
    const options = {
      // TODO: add method, headers and body for sending json data with POST
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userCredentials),
    };
    try {
      // TODO: use fetch to send request to login endpoint and return the result as json, handle errors with try/catch and response.ok
      return await doFetch(baseUrl + 'login', options);
    } catch (e) {
      console.log('postLogin', e);
      throw new Error(e.message);
    }
  };

  return {postLogin};
};

const useUser = () => {
  const getUserByToken = async (token) => {
    const options = {
      method: 'GET',
      headers: {'x-access-token': token},
    };
    try {
      return await doFetch(baseUrl + 'users/user', options);
    } catch (e) {
      console.log('getUserByToken', e);
      throw new Error(e.message);
    }
  };

  const postUser = async (userData) => {
    const options = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    };
    try {
      console.log(':DDDDpost', baseUrl + 'users', options);
      return await doFetch(baseUrl + 'users', options);
    } catch (error) {
      throw new Error('postUser: ' + error.message);
    }
  };

  const checkUsername = async (username) => {
    try {
      const result = await doFetch(baseUrl + 'users/username/' + username);
      return result.available;
    } catch (error) {
      throw new Error('checkUsername: ' + error.message);
    }
  };

  const putUser = async (userData, userToken) => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    };
    try {
      console.log(':DDDD', baseUrl + 'users', options);
      return await doFetch(baseUrl + 'users', options);
    } catch (error) {
      throw new Error('putUser: ' + error.message);
    }
  };

  const getUserById = async (id, token) => {
    try {
      return await doFetch(baseUrl + 'users/' + id, {
        headers: {'x-access-token': token},
      });
    } catch (error) {
      throw new Error('getUserById, ' + error.message);
    }
  };

  return {getUserByToken, postUser, putUser, checkUsername, getUserById};
};

const useTag = () => {
  const getFilesByTag = async (tag) => {
    try {
      return await doFetch(baseUrl + 'tags/' + tag);
    } catch (error) {
      throw new Error('getFilesByTag, ' + error.message);
    }
  };

  const postTag = async (data, token) => {
    const options = {
      method: 'post',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    try {
      return await doFetch(baseUrl + 'tags', options);
    } catch (error) {
      throw new Error('postTag: ' + error.message);
    }
  };

  return {getFilesByTag, postTag};
};

const useFavourite = () => {
  const postFavourite = async (fileId, token) => {
    const options = {
      method: 'post',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({file_id: fileId}),
    };
    try {
      return await doFetch(baseUrl + 'favourites', options);
    } catch (error) {
      throw new Error('posFavourite: ' + error.message);
    }
  };
  const getFavouritesByFileId = async (fileId) => {
    try {
      return await doFetch(baseUrl + 'favourites/file/' + fileId);
    } catch (error) {
      throw new Error('getFavouriterByFileId error, ' + error.message);
    }
  };
  const getFavouritesByUser = async (token) => {
    // TODO: implement this
  };
  const deleteFavourite = async (fileId, token) => {
    const options = {
      method: 'delete',
      headers: {
        'x-access-token': token,
      },
    };
    try {
      return await doFetch(baseUrl + 'favourites/file/' + fileId, options);
    } catch (error) {
      throw new Error('deleteFavourite error, ' + error.message);
    }
  };

  return {
    postFavourite,
    getFavouritesByFileId,
    getFavouritesByUser,
    deleteFavourite,
  };
};

export {useMedia, useAuthentication, useUser, useTag, useFavourite};
