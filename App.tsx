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
  FlatList,
  TextInput,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import './global.css';
import {
  fetchEmployeeList,
  fetchEachEmployeeByID,
  employeeData,
  currentEmployeeData,
} from './slice/employeeList';
import { useDispatch, useSelector } from 'react-redux';
import { Provider } from 'react-redux';
import { Store } from '@reduxjs/toolkit';
import { store } from './store/store';
import { useEffect, useState } from 'react';
import { employee } from './slice/employeeList';

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
  const [userId, setUserID] = useState(1);

  const handleClick = () => {
    dispatch(fetchEmployeeList());
  };
  const handleUser = () => {
    dispatch(fetchEachEmployeeByID(userId));
  };

  const dataEmployeeList = useSelector(employeeData);
  const dataCurrentEmployee = useSelector(currentEmployeeData);

  const Item = ({ title }) => {
    return (
      <View>
        <Text className="font-bold">{title}</Text>
      </View>
    );
  };

  const UserDetail = ({ user }: { user: employee }) => {
    return (
      <View>
        <Text className="font-bold text-red-600">{user.name}</Text>
        <Text className="font-bold  text-red-600">{user.phone}</Text>
        <Text className="font-bold  text-red-600">{user.email}</Text>
        <Text className="font-bold  text-red-600">{user.address?.city}</Text>
        <Text className="font-bold  text-red-600">{user.address?.street}</Text>
      </View>
    );
  };

  useEffect(() => {}, []);
  return (
    <View
      className="flex-1 justify-start items-start gap-2 p-4 font-bold"
      style={{ paddingTop: safeAreaInsets.top }}
    >
      <Text className="font-extrabold text-2xl">Employee List</Text>
      <View className="flex-0">
        <TouchableOpacity
          onPress={handleClick}
          className="bg-blue-600 p-4 border border-1 rounded-md"
        >
          <Text className="text-white font-bold">Fetch All Employees</Text>
        </TouchableOpacity>
        <FlatList
          data={dataEmployeeList}
          renderItem={({ item }) => <Item title={item.id + '. ' + item.name} />}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{ flexGrow: 0 }}
          style={{ flexGrow: 0 }}
        />
      </View>
      <View className="flex-row gap-2">
        <TouchableOpacity
          onPress={handleUser}
          className="bg-orange-600 p-4 border border-1 rounded-md"
        >
          <Text className="text-white font-bold">
            Fetch selected user history
          </Text>
        </TouchableOpacity>
        <TextInput
          placeholder="Enter user id"
          value={userId}
          onChangeText={setUserID}
          className="font-extrabold"
        ></TextInput>
      </View>
      {dataCurrentEmployee && <UserDetail user={dataCurrentEmployee} />}
    </View>
  );
}

export default App;
