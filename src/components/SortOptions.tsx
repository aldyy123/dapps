import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface SortOptionsProps {
  onSort: (option: string) => void;
}

export const SortOptions = ({ onSort }: SortOptionsProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onSort('market_cap')}>
        <Text>Market Cap</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSort('price')}>
        <Text>Price</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSort('change')}>
        <Text>24h Change</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
}); 