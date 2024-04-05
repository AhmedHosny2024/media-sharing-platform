import { ScrollView, StyleSheet, View ,Text,TouchableOpacity} from 'react-native';
import Navbar from './src/Components/navbar';

import MainPage from './src/Components/mainPage';
import Upload from './src/Components/upload';

import  {store,persistor}  from './src/Redux/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';

export default function App() {


  const {container,content} = styles;
  return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <Navbar/>
        <ScrollView style={container}>
          <View style={content}>
            <MainPage/>
          </View>
        </ScrollView>
        <Upload/>
        </PersistGate>
      </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content:{
    padding: 15,
    paddingTop:5,
    alignItems: "center",
    justifyContent: "center",
  },
});
