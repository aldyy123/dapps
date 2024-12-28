// src/hooks/useTransactions.ts
import { useState } from 'react';
import { Address, WalletClient } from 'viem';
import publicClient from '../clients/public';

export const useTransactions = (walletClient: WalletClient | null, address?: Address) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const handleTransaction = async () => {
    if (!address || !walletClient) {
      setStatus('Wallet not connected');
      return;
    }

    const toAddress = '0xRecipientAddressHere' as Address;
    const amount = '0.1';

    setLoading(true);

    try {
      const value = BigInt(parseFloat(amount) * 1e18);
      
      const estimatedGas = await publicClient.estimateGas({
        to: toAddress,
        value,
      });

      const txHash = await walletClient.request({
        method: 'eth_sendTransaction',
        params: [{
          to: toAddress,
          value,
          gasLimit: estimatedGas,
          from: address,
        }],
      });

      setStatus(`Transaction sent! Tx Hash: ${txHash}`);
    } catch (error) {
      console.error('Transaction failed:', error);
      setStatus('Transaction failed');
    } finally {
      setLoading(false);
    }
  };

  return { handleTransaction, loading, status };
};