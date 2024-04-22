import { View, Text, TextInput } from 'react-native';
import React from 'react';

type TextInputComponentProps = {
  placeholder: string;
  value: string;
  onChangeText: React.Dispatch<React.SetStateAction<string>>;
  width?: string;
};

const TextInputComponent = (props: TextInputComponentProps) => {
  const { placeholder, value, onChangeText, width } = props;
  return (
    <View
      className={`${
        width ? width : 'w-full'
      } p-2 rounded-lg border border-slate-500`}
    >
      <TextInput
        value={value}
        placeholder={placeholder}
        onChangeText={(text) => onChangeText(text)}
        className='text-lg'
      />
    </View>
  );
};

export default TextInputComponent;
