import './gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';

import {NavigationContainer} from '@react-navigation/native'
import Routes from '@/routes/index.routes';

export default function App() {
  return (
      <NavigationContainer>
        <Routes />
        <StatusBar style="auto" />
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
