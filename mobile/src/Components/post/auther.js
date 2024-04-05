import React from "react";
import { View,Text,StyleSheet } from "react-native";
import { Avatar } from 'react-native-elements';
import moment from "moment";

/**
 * 
 * @param {name,createdAt} props - name of the auther and the date of the post
 * @returns  - Auther component with the name and the date of the post
 */
const Auther = (props) => {
    const{name,createdAt} = props;
    const {container,name:nameStyle,date,avatar} = styles;
    return (
        <View style={container}>
            <Avatar title={name[0]} style={avatar}/>
            <Text style={nameStyle}>{name}</Text>
            <Text style={date}>{moment(createdAt).format("YYYY-MM-DD")}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        justifyContent: "left",
        alignItems: "center",
    },
    name:{
        fontSize:20,
        fontWeight:'500',
        padding:0,
        marginRight:5,
    },
    date:{
        fontSize:15,
        fontWeight:'300',
    },
    avatar:{
        width: 50,
        height: 50,
        borderRadius: 50,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: "#c7c7c7",
    }

});

export default Auther;