import { useState, useEffect } from 'react';
import { WalletClient } from 'viem';
import { BlockchainState } from '../types/blockchain';
import publicClient from '../clients/public';

export const useBlockchain = (walletClient: WalletClient | null) => {
  const [state, setState] = useState<BlockchainState>({
    blockNumber: 0n,
    gasPrice: 0n,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!walletClient) return;
      
      try {
        const [block, gasPriceData] = await Promise.all([
          publicClient.getBlockNumber(),
          publicClient.getGasPrice(),
        ]);
        
        
        console.log('block', block);
        console.log('gasPriceData', gasPriceData);

        setState({
          blockNumber: block,
          gasPrice: BigInt(gasPriceData),
        });
      } catch (error) {
        console.error('Error fetching blockchain data:', error);
      }
    };

    fetchData();
  }, [walletClient]);

  return state;
};