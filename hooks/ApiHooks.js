import {useEffect, useState} from 'react';
import {baseUrl} from '../utils/variables';

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

  // console.log('testing', mediaArray);
  return {/* mediaArray: mediaArray | same as --> */ mediaArray};
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

  return {getUserByToken, postUser, checkUsername};
};

const useTag = () => {
  const getFilesByTag = async (tag) => {
    try {
      return await doFetch(baseUrl + 'tags/' + tag);
    } catch (error) {
      throw new Error('getFilesByTag, ' + error.message);
    }
  };
  return {getFilesByTag};
};

export {useMedia, useAuthentication, useUser, useTag};
