import React, { useMemo } from 'react';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import CommonText from './commonText';
import { colors } from '../utils/colors';
import { FontSizes } from '../utils/fonts';

type ButtonProps = {
  fullWidth?: boolean;
  label: string;
  onPress: () => void;
  disabled?: boolean;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

const CommonButton: React.FC<ButtonProps> = ({
  fullWidth = false,
  label,
  onPress,
  disabled = false,
  buttonStyle,
  textStyle,
}) => {
  const containerStyle = useMemo(
    () => [
      fullWidth ? styles.fullWidthStyle : styles.normalStyle,
      disabled && styles.disabledButton,
      buttonStyle,
    ],
    [fullWidth, disabled, buttonStyle, styles],
  );

  const labelStyle = useMemo(
    () => [
      fullWidth ? styles.fullWidthLabel : styles.label,
      disabled && styles.disabledText,
      textStyle,
    ],
    [fullWidth, disabled, textStyle, styles],
  );

  return (
    <TouchableOpacity
      style={containerStyle}
      activeOpacity={0.8}
      onPress={disabled ? undefined : onPress}
    >
      <CommonText style={labelStyle}>{label}</CommonText>
    </TouchableOpacity>
  );
};

const baseButtonStyle = (): ViewStyle => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: colors.primary,
  shadowColor: colors.black,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 2,
  borderRadius: moderateScale(10),
  marginTop: moderateScale(16),
});

const styles = StyleSheet.create({
  fullWidthStyle: {
    ...baseButtonStyle(),
    width: '100%',
    height: moderateScale(50),
  },
  normalStyle: {
    ...baseButtonStyle(),
    paddingVertical: moderateScale(5),
    paddingHorizontal: moderateScale(8),
  },
  fullWidthLabel: {
    fontSize: FontSizes._18,
    color: colors.black,
    fontWeight: '500',
  },
  label: {
    fontSize: FontSizes._14,
    color: colors.black,
    fontWeight: '500',
  },
  disabledButton: {
    backgroundColor: colors.disabled,
    borderColor: colors.disabled,
  },
  disabledText: {
    color: colors.white,
  },
});

export default CommonButton;
