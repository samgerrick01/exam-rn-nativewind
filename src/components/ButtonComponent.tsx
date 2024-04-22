import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

type ButtonComponentProps = {
  children: React.ReactNode;
  onPress: () => void;
  width?: string;
};
const ButtonComponent = (props: ButtonComponentProps) => {
  const { children, onPress, width } = props;
  return (
    <TouchableOpacity
      className={`${
        width ? width : 'w-full'
      } border border-black rounded-lg justify-center items-center`}
      onPress={onPress}
    >
      <Text>{children}</Text>
    </TouchableOpacity>
  );
};

export default ButtonComponent;
