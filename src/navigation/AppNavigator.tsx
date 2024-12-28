import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from '../pages/Home';
import TransactionScreen from '../pages/TransactionScreen';
import { RootStackParamList } from './types';
import CryptoList from '../components/CryptoList';
import CryptoDetailScreen from '../screens/CryptoDetailScreen';
import ReceiveScreen from '../pages/ReceiveScreen';
import SwapScreen from '../pages/SwapScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = React.memo(function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#e8f5e9',
        },
        headerTintColor: '#333',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomePage}
        options={{ title: 'Blockchain Interaction' }}
      />
      <Stack.Screen
        name="Transaction"
        component={TransactionScreen}
        options={{ title: 'Send Transaction' }}
      />
      <Stack.Screen
        name="CryptoList"
        component={CryptoList}
        options={{
          title: 'Crypto Market',
          headerStyle: {
            backgroundColor: '#f8f9fa',
          },
        }}
      />

      <Stack.Screen
        name="CryptoDetailScreen"
        component={CryptoDetailScreen}
        options={{ title: 'Crypto Detail' }}
      />

      <Stack.Screen
        name="Receive"
        component={ReceiveScreen}
        options={{ title: 'Receive Crypto' }}
      />

      <Stack.Screen
        name="Swap"
        component={SwapScreen}
        options={{ title: 'Swap Tokens' }}
      />
    </Stack.Navigator>
  );
});

export default AppNavigator;
