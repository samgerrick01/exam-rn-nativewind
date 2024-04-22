import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';

interface Props {
  route: string;
  isFocused: boolean;
}

const BottomTabIcon = ({ route, isFocused }: Props) => {
  const renderIcon = (route: string, isFocused: boolean) => {
    switch (route) {
      case 'Home':
        return (
          <FontAwesome
            name='home'
            size={24}
            color={isFocused ? '#0067FF' : '#ffffff'}
          />
        );
      case 'Search':
        return (
          <FontAwesome
            name='search'
            size={24}
            color={isFocused ? '#0067FF' : '#ffffff'}
          />
        );
      case 'Setting':
        return (
          <FontAwesome
            name='gear'
            size={24}
            color={isFocused ? '#0067FF' : '#ffffff'}
          />
        );
      case 'Profile':
        return (
          <FontAwesome
            name='user'
            size={24}
            color={isFocused ? '#0067FF' : '#ffffff'}
          />
        );
      default:
        break;
    }
  };

  return <View>{renderIcon(route, isFocused)}</View>;
};

export default BottomTabIcon;
