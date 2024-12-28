import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Address, parseEther } from 'viem';
import { useWalletConnectModal } from '@walletconnect/modal-react-native';
import { ActionButton } from '../components/ActionButton';
import { InfoCard } from '../components/InfoCard';
import { useBalance } from '../hooks/useBalance';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useNavigation } from '@react-navigation/native';
import publicClient from '../clients/public';

type TransactionScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Transaction'>;

const TransactionScreen: React.FC = () => {
  const navigation = useNavigation<TransactionScreenNavigationProp>();
  const { isConnected, address: wcAddress, provider } = useWalletConnectModal();
  const address = wcAddress as Address | undefined;
  const { balance } = useBalance(address);

  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const validateInputs = () => {
    if (!recipientAddress || !amount) {
      Alert.alert('Error', 'Please fill in all fields');
      return false;
    }

    const transferAmount = parseFloat(amount);
    if (isNaN(transferAmount) || transferAmount <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return false;
    }

    if (transferAmount > Number(balance)) {
      Alert.alert('Error', 'Insufficient balance');
      return false;
    }

    return true;
  };

  const handleSendTransaction = async () => {
    if (!validateInputs() || !provider || !address) return;

    try {
      setLoading(true);

      // Get the current gas price
      const gasPrice = await publicClient.getGasPrice();

      // Prepare transaction
      const transaction = {
        from: address,
        to: recipientAddress as Address,
        value: parseEther(amount),
        gasPrice
      };

      // Get gas estimate
      const gasEstimate = await publicClient.estimateGas(transaction);

      // Add gas limit to transaction
      const finalTransaction = {
        ...transaction,
        gas: gasEstimate,
      };

      // Send transaction
      const hash = await provider.request({
        method: 'eth_sendTransaction',
        params: [finalTransaction],
      });

      Alert.alert(
        'Transaction Sent',
        `Transaction has been submitted!\nHash: ${hash}`,
        [
          {
            text: 'View on Explorer',
            onPress: () => {
              // Open etherscan or relevant block explorer
              // You can use Linking.openURL() here
              console.log(`https://etherscan.io/tx/${hash}`);
            },
          },
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );

    } catch (error) {
      console.error('Transaction error:', error);
      Alert.alert('Error', 'Failed to send transaction. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Send Transaction</Text>

      {isConnected ? (
        <>
          <InfoCard label="Your Address" value={address || ''} />
          <InfoCard
            label="Available Balance"
            value={`${Number(balance).toFixed(4)} ETH`}
          />

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Recipient Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Ethereum address"
              value={recipientAddress}
              onChangeText={setRecipientAddress}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Amount (ETH)</Text>
            <TextInput
              style={styles.input}
              placeholder="0.0"
              value={amount}
              onChangeText={setAmount}
              keyboardType="decimal-pad"
            />
          </View>

          {loading ? (
            <ActivityIndicator size="large" color="#627eea" style={styles.loader} />
          ) : (
            <ActionButton
              icon="send"
              label="Send Transaction"
              onPress={handleSendTransaction}
              color="#627eea"
            />
          )}
        </>
      ) : (
        <Text style={styles.status}>Please connect your wallet to send transactions</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  inputContainer: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  loader: {
    marginTop: 20,
  },
  status: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  }
});

export default TransactionScreen;
