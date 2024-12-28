import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { WalletConnectModal } from '@walletconnect/modal-react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppNavigator from './src/navigation/AppNavigator';
import providerMetadata from './src/clients/walletConnect';
import 'fastestsmallesttextencoderdecoder';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <AppNavigator />
        
        <WalletConnectModal
          projectId={providerMetadata.projectId}
          providerMetadata={providerMetadata.providerMetadata}
        />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
