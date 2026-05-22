import { StyleSheet, Text, TextInput, View } from "react-native"
import { colors } from "../utils/colors";
import { FontSizes } from "../utils/fonts";
import CustomTextInput from "../common/customInput";
import CommonButton from "../common/commonButton";
import CommonText from "../common/commonText";
import { Metrics } from "../utils/metrics";
import { useRef, useState } from "react";
import { emailRegex } from "../utils/regex";
import Container from "../common/container";
import { AllNavParamList } from "../navigation/AllNavParamList";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { loginApi } from "../api/authApis";
import { setAuthToken } from "../api/client";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Props {
    navigation: NativeStackNavigationProp<AllNavParamList, 'Login'>;
}

const Login = ({ navigation }: Props) => {
    const [email, setEmail] = useState("asingla@yopmail.in");
    const [password, setPassword] = useState("Test@123");
    const [emailErr, setEmailErr] = useState('');
    const [passErr, setPassErr] = useState('');
    const passRef = useRef<TextInput>(null);

    const handleLogin = async () => {
        let err = 0;
        if (!email) {
            setEmailErr("Email is required");
            err++;
        }
        else if (!emailRegex.test(email)) {
            setEmailErr("Email is invalid");
            err++;
        }
        if (!password) {
            setPassErr("Password is required");
            err++;
        }
        if (err === 0) {
            try {
                const data = await loginApi(email, password);
                const token = data?.access_token;
                setAuthToken(token);
                await AsyncStorage.setItem('authToken', token);
                navigation.replace('SearchPage');
            } catch (e: any) {
                setEmailErr(e.message);
            }
        }
    }
    return (
        <Container contentStyle={styles.container}>
            <CommonText style={styles.title}>Login</CommonText>
            <CustomTextInput
                label="Username"
                value={email}
                placeholder="Enter your username"
                onChangeText={(text) => {
                    setEmail(text)
                }}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyLabel="next"
                error={emailErr}
                onSubmitEditing={() => passRef.current?.focus()}
                submitBehavior="submit"
            />
            <CustomTextInput
                ref={passRef}
                label="Password"
                value={password}
                secureTextEntry={true}
                placeholder="Enter your password"
                autoCapitalize="none"
                onChangeText={(text) => {
                    setPassword(text);
                }}
                error={passErr}
            />
            <CommonButton
                label="Login"
                onPress={() => handleLogin()}
                fullWidth={true}
            />
        </Container>
    )
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.black,
        padding: Metrics._16,
    },
    title: {
        fontSize: FontSizes._28,
        color: colors.white,
        fontWeight: 'bold',
        marginBottom: Metrics._32
    },
});