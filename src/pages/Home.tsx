import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useWalletConnectModal } from '@walletconnect/modal-react-native';
import { ActionButton } from '../components/ActionButton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomePage() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { isConnected } = useWalletConnectModal();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>

        {isConnected ? (
          <>
            <View style={styles.actionButtons}>
              <ActionButton
                icon="arrow-up-circle"
                label="Send"
                onPress={() => navigation.navigate('Transaction')}
                color="#4CAF50"
                iconType="Feather"
              />
              <ActionButton
                icon="arrow-down-circle"
                label="Receive"
                onPress={() => navigation.navigate('Receive')}
                color="#2196F3"
                iconType="Feather"
              />
            </View>

            <View style={styles.bottomButtons}>
              <ActionButton
                icon="bar-chart-2"
                label="Market"
                onPress={() => navigation.navigate('CryptoList')}
                color="#FF9800"
                iconType="Feather"
              />
              <ActionButton
                icon="log-out"
                label="Disconnect"
                color="#F44336"
                iconType="Feather"
              />
            </View>
          </>
        ) : (
          <View style={styles.connectContainer}>
            <ActionButton
              icon="wallet"
              label="Connect Wallet"
              color="#4CAF50"
              iconType="Feather"
            />
            <Text style={styles.connectText}>
              Connect your wallet to access all features
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollView: {
    flex: 1,
  },
  balanceCard: {
    padding: 24,
    borderRadius: 20,
    margin: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  balanceLabel: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 8,
  },
  ethBalance: {
    fontSize: 18,
    color: '#fff',
    opacity: 0.9,
    marginTop: 4,
  },
  networkInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  networkItem: {
    alignItems: 'center',
  },
  networkLabel: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
  },
  networkValue: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
    marginTop: 4,
  },
  actionButtons: {
    padding: 16,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    margin: 16,
  },
  assetsContainer: {
    padding: 16,
  },
  bottomButtons: {
    padding: 16,
    gap: 12,
  },
  connectContainer: {
    padding: 24,
    alignItems: 'center',
  },
  connectText: {
    color: '#fff',
    opacity: 0.7,
    marginTop: 16,
    textAlign: 'center',
  },
});
