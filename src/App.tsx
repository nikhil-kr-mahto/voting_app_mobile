import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import store from './redux/store';
import CommonNavigator from './navigation/CommonNavigator';

function App() {
    return (
        <Provider store={store}>
            <SafeAreaProvider>
                <StatusBar barStyle={'dark-content'} />
                <NavigationContainer>
                    <CommonNavigator />
                </NavigationContainer>
            </SafeAreaProvider>
        </Provider>
    );
}

export default App;