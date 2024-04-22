import BottomTabNavigator from '@src/components/tabs/BottomTabNavigator';
import QueryProvider from '@src/providers/QueryProvider';
import FirstScreen from '@src/screens/FirstScreen';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <QueryProvider>
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
    </QueryProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
