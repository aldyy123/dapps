import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Clipboard,
  Alert,
  SafeAreaView,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useWalletConnectModal } from '@walletconnect/modal-react-native';
import { Address } from 'viem';
import { InfoCard } from '../components/InfoCard';
import { useBalance } from '../hooks/useBalance';

const ReceiveScreen: React.FC = () => {
  const { isConnected, address: wcAddress } = useWalletConnectModal();
  const address = wcAddress as Address | undefined;
  const { balance } = useBalance(address);

  const handleCopyAddress = () => {
    if (address) {
      Clipboard.setString(address);
      Alert.alert('Success', 'Address copied to clipboard!');
    }
  };

  if (!isConnected || !address) {
    return (
      <View style={styles.container}>
        <Text style={styles.warningText}>
          Please connect your wallet to receive transactions
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Receive Crypto</Text>
        <InfoCard
          label="Current Balance"
          value={`${Number(balance).toFixed(4)} ETH`}
          icon="wallet"
          iconType="Feather"
          color="#4CAF50"
        />

        <View style={styles.qrContainer}>
          <QRCode
            value={address}
            size={200}
            backgroundColor="white"
            color="#000"
          />
        </View>

        <View style={styles.addressContainer}>
          <Text style={styles.addressLabel}>Your Address:</Text>
          <Text style={styles.addressText} numberOfLines={1} ellipsizeMode="middle">
            {address}
          </Text>
          <TouchableOpacity
            style={styles.copyButton}
            onPress={handleCopyAddress}
          >
            <Text style={styles.copyButtonText}>Copy Address</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            Share this QR code or address to receive crypto assets on the Ethereum network
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  qrContainer: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 16,
    marginVertical: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  addressContainer: {
    width: '100%',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
  },
  addressLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  addressText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 12,
  },
  copyButton: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  copyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  infoContainer: {
    marginTop: 20,
    padding: 16,
  },
  infoText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
    lineHeight: 20,
  },
  warningText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
    marginTop: 20,
  },
});

export default ReceiveScreen; 