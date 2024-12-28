// src/hooks/useBalance.ts
import { useState, useEffect } from 'react';
import { Address, formatEther } from 'viem';
import publicClient from '../clients/public';

export const useBalance = (address?: Address) => {
  const [balance, setBalance] = useState<string>('0');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBalance = async () => {
      if (!address) {
        console.log('No address provided');
        return;
      }

      try {
        setLoading(true);
        const result = await publicClient.getBalance({ address });
        setBalance(formatEther(result));
      } catch (error) {
        console.error('Error fetching balance:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
    // Refresh every 30 seconds
    const interval = setInterval(fetchBalance, 30000);

    return () => clearInterval(interval);
  }, [address]);

  return { balance, loading };
};
