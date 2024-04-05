import React, { useState } from "react";
import { Pressable, StyleSheet, View,Dimensions, Image, } from "react-native";
import { Video } from 'expo-av';
import {BASE_URL} from "@env";


export const SinglePost = ({data}) => {

    const [play,setPlay] = useState(false);
    const {media,mesiaImage,mediaVideo,poster} = styles;
    return (
        <View style={media}>
            {data.type.includes("image") ?
            <Image source={{uri:BASE_URL+"/post/"+data.url.replace(/\\/g, "/")}} style={[media,mesiaImage]}/>
            :
            <View style={[media]}>
                <Pressable onPress={()=>setPlay(!play)} >
                    <Video
                        // ref={videoRef}
                        source={{uri:BASE_URL+"/post/"+data.url.replace(/\\/g, "/")} } 
                        shouldPlay={play}
                        isLooping
                        style={[media,mediaVideo]}
                        resizeMode="cover"
                        usePoster={true}
                        posterSource={require("../../../assets/poster.png")}
                        posterStyle={poster}
                    />
                </Pressable>
            </View>
            }
        </View>
    
    );
}


const styles = StyleSheet.create({
    media:{
        width: Dimensions.get("window").width,
        height: 300,
        paddingLeft: 10,
        paddingRight: 20,
    },
    mesiaImage:{
        width: "100%",
        resizeMode: "cover",
    },
    mediaVideo:{
        width: "100%",
        height: "100%",
        justifyContent: "center",
        resizeMode: "center",
    },
    poster:{
        width: "10%",
        height: "10%",
        margin:"25%",
        marginLeft: "35%",
        padding: 10,
    }
});
