import React, { ReactNode } from 'react';
import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';
import { FontSizes } from '../utils/fonts';
import { colors } from '../utils/colors';

type Props = {
  style?: StyleProp<TextStyle>;
  children: ReactNode;
  onTextPress?: () => void;
  numberOfLines?: number;
};

const CommonText = ({ style, children, onTextPress, numberOfLines = 1 }: Props) => {
  return (
    <Text
      allowFontScaling={false}
      style={[styles.text, style]}
      onPress={onTextPress}
      numberOfLines={numberOfLines}
      ellipsizeMode='tail'
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: FontSizes._16,
    color: colors.black,
  },
});

export default CommonText;
