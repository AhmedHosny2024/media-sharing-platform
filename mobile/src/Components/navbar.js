import React, { useEffect, useState } from "react";
import { StatusBar, View,StyleSheet,Text, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import axios from "../Server/intsance";
import Login from "./logIn";
import SignUp from "./signUp";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { changeToken,changeName,changeId,changeRefresh} from "../Redux/slice/userSlicer";

/**
 * @function (Logout) - Function to logout the user
 * @returns Navbar with the MSP logo and the login and sign up buttons
 */
const Navbar = () => {
    // StatusBar.setBarStyle('light-content', true);
    const name=useSelector(state => state.user.userName);
    const token=useSelector(state => state.user.token);
    const dispatch = useDispatch();
    const valid = token==="" ;
    const {nav,signs,User,msp} = styles;
    const refresh = useSelector(state => state.user.refresh);
    const Logout =async () => {
        // TODO: send request to server to logout
        console.log("Logout");
        axios.post("auth/logout",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((res) => {
            dispatch(changeId(-1));
            dispatch(changeToken(""));
            dispatch(changeName(""));
            dispatch(changeRefresh(!refresh));
        })
        .catch((err) => {
            console.error(err);
        });
    }
    return (
        <LinearGradient colors={['#ff2c00', '#9000c3']} start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={nav}>
            <View style={signs}>
                <Ionicons name="apps-sharp" size={50} color="white" />
                <Text style={msp}>MSP</Text>
            </View>
            {
            valid ?
            <View style={signs}>
                <Login/>
                <SignUp/>
            </View>:
            <>
                <View style={signs}>
                    <Text style={User}>{name}</Text>
                    <TouchableOpacity  onPress={Logout}>
                        <MaterialIcons name="logout" size={40} color="white" />
                    </TouchableOpacity>
                </View> 
            </>
            }
    </LinearGradient>
    );
}

const styles = StyleSheet.create({
    nav: {
        marginTop: StatusBar.currentHeight||0,
        justifyContent: "space-between",
        width: "100%",
        flexDirection: "row",
        padding: 10,
        alignItems: "center",
        paddingTop:20
    },
    icon:{
        color: "white",
        padding: 10,
    },
    signs:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    User:{
        color: "white",
        fontSize: 20,
        fontWeight: 'bold',
        margin:10,
        padding: 5,
    },
    msp:{
        color:"white",
        fontWeight:'500',
        fontSize:30,
        margin:5
    }
});

export default Navbar;