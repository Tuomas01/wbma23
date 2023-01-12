import {StatusBar} from 'expo-status-bar';
import {StyleSheet, SafeAreaView, Platform} from 'react-native';
import List from './components/List';

const App = () => {
  //  console.log('App starting')
  return (
    <>
      <SafeAreaView style={styles.container}>
        <List />
      </SafeAreaView>
      <StatusBar style="auto" />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? 30 : 0,
  },
});

export default App;
