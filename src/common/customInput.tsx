import React, { Ref, useState } from 'react';
import {
  TextInput,
  View,
  TextInputProps,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { Eye, EyeOff } from 'lucide-react-native';
import { Metrics } from '../utils/metrics';
import { FontSizes } from '../utils/fonts';
import { colors } from '../utils/colors';
import CommonText from './commonText';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  ref?: Ref<TextInput> | undefined;
  containerStyle?: StyleProp<ViewStyle> | undefined;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  secureTextEntry = false,
  ref = undefined,
  containerStyle = {},
  maxLength = 50,
  ...rest
}) => {
  const [isSecure, setIsSecure] = useState(secureTextEntry);

  return (
    <View style={[containerStyle, styles.inputBox]}>
      {label && <CommonText style={styles.label}>{label}</CommonText>}
      <View style={styles.inputContainer}>
        {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}
        <TextInput
          placeholderTextColor={colors.placeholderText}
          secureTextEntry={isSecure}
          style={styles.input}
          maxLength={maxLength}
          ref={ref}
          {...rest}
        />

        {secureTextEntry ? (
          <TouchableOpacity
            onPress={() => setIsSecure(!isSecure)}
            style={styles.iconRight}
          >
            {isSecure ? (
              <EyeOff size={moderateScale(20)} color={colors.white} />
            ) : (
              <Eye size={moderateScale(20)} color={colors.white} />
            )}
          </TouchableOpacity>
        ) : (
          rightIcon && <View style={styles.iconRight}>{rightIcon}</View>
        )}
      </View>

      {error && <CommonText style={styles.error}>{error}</CommonText>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    width: '100%',
    marginBottom: Metrics._20,
  },
  label: {
    marginBottom: Metrics._12,
    fontSize: FontSizes._16,
    color: colors.white
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(8),
    height: moderateScale(48),
    paddingVertical: moderateScale(4),
    paddingHorizontal: moderateScale(16),
    borderColor: colors.border2,
  },
  input: {
    flex: 1,
    fontSize: FontSizes._12,
    color: colors.white,
  },
  iconLeft: {
    marginRight: Metrics._4,
  },
  iconRight: {
    marginLeft: Metrics._4,
  },
  error: {
    marginTop: Metrics._4,
    fontSize: FontSizes._12,
    color: colors.error,
  },
});

export default Input;
