// src/components/ActionButton.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

interface ActionButtonProps {
  icon: string;
  label: string;
  onPress: () => void;
  color?: string;
  iconType?: 'MaterialCommunityIcons' | 'FontAwesome' | 'Ionicons' | 'MaterialIcons' | 'AntDesign' | 'Feather' | 'FontAwesome5';
}

const IconComponents = {
  MaterialCommunityIcons,
  FontAwesome,
  Ionicons,
  MaterialIcons,
  AntDesign,
  Feather,
  FontAwesome5
};

export const ActionButton = ({
  icon,
  label,
  onPress,
  color = '#007BFF',
  iconType = 'MaterialCommunityIcons',
}: ActionButtonProps) => {
  const IconComponent = IconComponents[iconType];

  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={onPress}>
      <IconComponent name={icon} size={24} color="#fff" style={styles.icon} />
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 15,
    width: '100%',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
  icon: {
    marginRight: 5,
  },
});
