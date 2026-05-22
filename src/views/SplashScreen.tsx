import { StyleSheet, Text, View } from "react-native"
import { colors } from "../utils/colors";
import { FontSizes } from "../utils/fonts";
import { useEffect } from "react";
import { AllNavParamList } from "../navigation/AllNavParamList";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setAuthToken } from "../api/client";

interface Props {
    navigation: NativeStackNavigationProp<AllNavParamList, 'SplashScreen'>;
}

const SplashScreen = ({ navigation }: Props) => {

    useEffect(() => {
        const checkAuth = async () => {
            const token = await AsyncStorage.getItem('authToken');
            if (token) {
                setAuthToken(token);
                navigation.replace('SearchPage');
            } else {
                navigation.replace('Login');
            }
        };
        setTimeout(checkAuth, 3000);
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Voter Command</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.black,
    },
    title: {
        fontSize: FontSizes._28,
        color: colors.white,
        fontWeight: 'bold'
    },
});

export default SplashScreen;