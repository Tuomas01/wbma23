import {StatusBar} from 'expo-status-bar';
import Navigator from './navigators/Navigator';
import Home from './views/home';

const App = () => {
  //  console.log('App starting')
  return (
    <>
      <Navigator />
      <StatusBar style="auto" />
    </>
  );
};

export default App;
