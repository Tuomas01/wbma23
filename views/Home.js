import {SafeAreaView, View} from 'react-native';
import List from '../components/List';
import PropTypes from 'prop-types';
import {Card} from '@rneui/themed';

const Home = ({navigation}) => {
  return (
    <View style={{display: 'flex', justifyContent: 'center', alignContent: 'center', backgroundColor: '#151515'}}>
      <Card containerStyle={{borderRadius: 20, marginBottom: 15, backgroundColor: '#151515'}}>
        <List navigation={navigation} />
      </Card>
    </View>
  );
};

Home.propTypes = {
  navigation: PropTypes.object,
};

export default Home;
