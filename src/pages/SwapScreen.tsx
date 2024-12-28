import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useWalletConnectModal } from '@walletconnect/modal-react-native';
import { Address } from 'viem';
import { InfoCard } from '../components/InfoCard';
import { useBalance } from '../hooks/useBalance';
import Icon from 'react-native-vector-icons/Feather';

interface TokenOption {
  symbol: string;
  name: string;
  icon: string;
  balance: string;
}

const TOKENS: TokenOption[] = [
  { symbol: 'ETH', name: 'Ethereum', icon: 'ethereum', balance: '0' },
  { symbol: 'USDT', name: 'Tether USD', icon: 'dollar-sign', balance: '0' },
  { symbol: 'USDC', name: 'USD Coin', icon: 'dollar-sign', balance: '0' },
  { symbol: 'DAI', name: 'Dai Stablecoin', icon: 'dollar-sign', balance: '0' },
];

const SwapScreen: React.FC = () => {
  const { isConnected, address: wcAddress } = useWalletConnectModal();
  const address = wcAddress as Address | undefined;
  const { balance } = useBalance(address);

  const [fromToken, setFromToken] = useState(TOKENS[0]);
  const [toToken, setToToken] = useState(TOKENS[1]);
  const [amount, setAmount] = useState('');
  const [estimatedOutput, setEstimatedOutput] = useState('0');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (fromToken.symbol === 'ETH') {
      setFromToken(prev => ({ ...prev, balance }));
    }
  }, [balance]);

  const handleSwapTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
    setAmount('');
    setEstimatedOutput('0');
  };

  const handleEstimateSwap = async () => {
    if (!amount || parseFloat(amount) <= 0) return;
    
    setLoading(true);
    try {
      // Here you would typically call your DEX aggregator API
      // For demo, we'll just use a mock calculation
      const mockRate = 1800; // 1 ETH = 1800 USDT
      const estimated = parseFloat(amount) * mockRate;
      setEstimatedOutput(estimated.toString());
    } catch (error) {
      console.error('Error estimating swap:', error);
      Alert.alert('Error', 'Failed to estimate swap');
    } finally {
      setLoading(false);
    }
  };

  const handleSwap = async () => {
    if (!isConnected || !address) {
      Alert.alert('Error', 'Please connect your wallet first');
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    setLoading(true);
    try {
      // Here you would implement the actual swap logic
      // This would typically involve:
      // 1. Getting the best route from a DEX aggregator
      // 2. Preparing the transaction
      // 3. Sending it to the wallet for approval
      Alert.alert('Success', 'Swap executed successfully!');
    } catch (error) {
      console.error('Swap failed:', error);
      Alert.alert('Error', 'Swap failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Swap Tokens</Text>

      <View style={styles.swapCard}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>From</Text>
          <TextInput
            style={styles.input}
            value={amount}
            onChangeText={(text) => {
              setAmount(text);
              handleEstimateSwap();
            }}
            placeholder="0.0"
            keyboardType="decimal-pad"
          />
          <Text style={styles.balance}>
            Balance: {fromToken.balance} {fromToken.symbol}
          </Text>
        </View>

        <TouchableOpacity style={styles.switchButton} onPress={handleSwapTokens}>
          <Icon name="repeat" size={24} color="#4CAF50" />
        </TouchableOpacity>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>To (Estimated)</Text>
          <Text style={styles.estimatedOutput}>
            {estimatedOutput} {toToken.symbol}
          </Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#4CAF50" style={styles.loader} />
        ) : (
          <TouchableOpacity
            style={[styles.swapButton, !isConnected && styles.disabledButton]}
            onPress={handleSwap}
            disabled={!isConnected}
          >
            <Text style={styles.swapButtonText}>
              {isConnected ? 'Swap' : 'Connect Wallet to Swap'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 24,
  },
  swapCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#2C2C2C',
    borderRadius: 8,
    padding: 12,
    color: '#fff',
    fontSize: 18,
  },
  balance: {
    color: '#888',
    fontSize: 14,
    marginTop: 4,
  },
  switchButton: {
    alignSelf: 'center',
    padding: 8,
    margin: 8,
  },
  estimatedOutput: {
    fontSize: 18,
    color: '#fff',
    padding: 12,
    backgroundColor: '#2C2C2C',
    borderRadius: 8,
  },
  swapButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  disabledButton: {
    backgroundColor: '#1E1E1E',
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  swapButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loader: {
    marginTop: 16,
  },
});

export default SwapScreen; 