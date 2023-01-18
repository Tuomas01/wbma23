import {StyleSheet, SafeAreaView, Platform, View} from 'react-native';
import List from '../components/List';
import PropTypes from 'prop-types';

const Home = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.listItem}>
        <List navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
  },

  listItem: {
    backgroundColor: '#181818',
    borderWidth: 3,
    borderColor: '#242526',
    padding: 10,
    margin: 15,
  },
});

Home.propTypes = {
  navigation: PropTypes.object,
};

export default Home;
