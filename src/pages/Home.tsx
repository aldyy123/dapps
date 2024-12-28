import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Address, createWalletClient, custom } from 'viem';
import { useWalletConnectModal } from '@walletconnect/modal-react-native';
import { DEFAULT_CHAIN } from '../constants/chains';
import { useBlockchain } from '../hooks/useBlockchain';
import { InfoCard } from '../components/InfoCard';
import { ActionButton } from '../components/ActionButton';
// import { useTransactions } from '../hooks/useTransactions';
import { useBalance } from '../hooks/useBalance';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import LinearGradient from 'react-native-linear-gradient';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomePage() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { open, isConnected, provider, address: wcAddress } = useWalletConnectModal();
  const address = wcAddress as Address | undefined;

  const walletClient = useMemo(
    () =>
      provider
        ? createWalletClient({
            chain: DEFAULT_CHAIN,
            transport: custom({
              request: ({ method, params }) => provider.request({ method, params }),
            }),
          })
        : null,
    [provider],
  );

  const { blockNumber, gasPrice } = useBlockchain(walletClient);
  // const { handleTransaction, loading, status } = useTransactions(walletClient, address);
  const { balance } = useBalance(address);

  const handleDisconnect = () => provider?.disconnect();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <LinearGradient
          colors={['#1a237e', '#0d47a1']}
          style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={styles.balanceAmount}>${(Number(balance) * 1800).toFixed(2)}</Text>
          <Text style={styles.ethBalance}>{Number(balance).toFixed(4)} ETH</Text>
          
          <View style={styles.networkInfo}>
            <View style={styles.networkItem}>
              <Text style={styles.networkLabel}>Block</Text>
              <Text style={styles.networkValue}>{blockNumber?.toString() || '0'}</Text>
            </View>
            <View style={styles.networkItem}>
              <Text style={styles.networkLabel}>Gas Price</Text>
              <Text style={styles.networkValue}>{Number(gasPrice) / 1e9} Gwei</Text>
            </View>
          </View>
        </LinearGradient>

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
              {/* <ActionButton
                icon="refresh-ccw"
                label="Swap"
                onPress={() => navigation.navigate('Swap')}
                color="#9C27B0"
                iconType="Feather"
              /> */}
            </View>

            <Text style={styles.sectionTitle}>Your Assets</Text>
            <View style={styles.assetsContainer}>
              <InfoCard
                label="Bitcoin"
                value={`$${(Number(balance) * 0.5 * 1800).toFixed(2)}`}
                icon="bitcoin"
                iconType="FontAwesome5"
                color="#f7931a"
              />
              <InfoCard
                label="Ethereum"
                value={`$${(Number(balance) * 0.3 * 1800).toFixed(2)}`}
                icon="ethereum"
                iconType="FontAwesome5"
                color="#627eea"
              />
              <InfoCard
                label="Litecoin"
                value={`$${(Number(balance) * 0.2 * 1800).toFixed(2)}`}
                icon="litecoin"
                iconType="FontAwesome5"
                color="#345d9d"
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
                onPress={handleDisconnect}
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
              onPress={open}
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
