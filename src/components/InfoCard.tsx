// src/components/InfoCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

interface InfoCardProps {
  label: string;
  value: string;
  icon?: string;
  iconType?: 'FontAwesome5' | 'MaterialCommunityIcons' | 'Feather';
  color?: string;
}

const IconComponents = {
  FontAwesome5,
  MaterialCommunityIcons,
  Feather,
};

export const InfoCard = ({
  label,
  value,
  icon,
  iconType = 'FontAwesome5',
  color = '#627eea',
}: InfoCardProps) => {
  const IconComponent = IconComponents[iconType];

  return (
    <View style={styles.card}>
      <View style={styles.leftContent}>
        {icon && (
          <View style={[styles.iconContainer, { backgroundColor: `${color}20` }]}>
            <IconComponent name={icon} size={24} color={color} />
          </View>
        )}
        <Text style={styles.label}>{label}</Text>
      </View>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  label: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  value: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
});