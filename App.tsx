/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import './global.css';
import { fetchEmployeeList } from './slice/employeeList';
import { useDispatch } from 'react-redux';
import { Provider } from 'react-redux';
import { Store } from '@reduxjs/toolkit';
import { store } from './store/store';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <AppContent />
      </SafeAreaProvider>
    </Provider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();
  const dispatch = useDispatch();

  const handleClick = () => {
    console.log('calling fetchEmployeeList function');
    dispatch(fetchEmployeeList());
  };
  return (
    <View className="flex-1 justify-center items-center">
      <Text>Hello World!</Text>
      <TouchableOpacity
        onPress={handleClick}
        className="bg-blue-600 p-4 border border-1 rounded-md"
      >
        <Text className="text-white font-bold">submit</Text>
      </TouchableOpacity>
    </View>
  );
}

export default App;
