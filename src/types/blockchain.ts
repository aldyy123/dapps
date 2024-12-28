// src/types/blockchain.ts
import { Address, Chain } from 'viem';

export interface TransactionData {
  to: Address;
  value: bigint;
  gasLimit: bigint;
  gasPrice: bigint;
  from: Address;
}

export interface BlockchainState {
  blockNumber: bigint;
  gasPrice: bigint;
}