import  {store,persistor}  from './src/Redux/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import Home from './src/screens/Home';

export default function App() {

  return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Home/>
        </PersistGate>
      </Provider>
  );
}


