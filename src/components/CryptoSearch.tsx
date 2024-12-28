import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

interface CryptoSearchProps {
  onSearch: (text: string) => void;
}

export const CryptoSearch = ({ onSearch }: CryptoSearchProps) => {
  return (
    <TextInput
      style={styles.searchInput}
      placeholder="Search cryptocurrencies..."
      onChangeText={onSearch}
    />
  );
}; 