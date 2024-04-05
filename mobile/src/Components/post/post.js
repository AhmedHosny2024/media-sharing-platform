import React, { useEffect, useRef, useState } from "react";
import Auther from "./auther";
import { View, StyleSheet,ScrollView, Text } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native";
import { SinglePost } from "./singlePost";
import axios from "../../Server/intsance";
import { useSelector } from "react-redux";

const Post = ({post,index}) => {   
    const userId=useSelector(state => state.user.id); 
    const token=useSelector(state => state.user.token);
    const refresh = useSelector(state => state.user.refresh);
    const valid = token!=="" ;
    const [like,setLike] = useState(post?.likedBy?.some(user => user.id === userId ));
    const [errorMsg,setErrorMsg] = useState(null);
    const[current,setCurrent] = useState(0);
    
    // const [mute,setMute] = useState(true);
    // const videoRef = useRef(null);
    // useEffect(() => {
    //     if (videoRef.current) {

    //         setTimeout(() => {
    //             setPlay(true);
    //         }, 1000);
    //         setPlay(false);
    //         setMute(false);
    //     }
    //   }, []);
    const [userName,setUserName] = useState("");
    const [createdAt,setCreatedAt] = useState("");
    const [data,setData] = useState([]);
    const[play,setPlay] = useState(false);
    useEffect(() => {
        setData(post?.data);
        setUserName(post?.userName);
        setCreatedAt(post?.createdAt);
        setLike(post?.likedBy?.some(user => user.id === userId ));
        console.log(like);
        console.log(post?.likedBy);
        console.log(userId);
    }, [post,token,userId,refresh]);

    const {container,button,header,count} = styles;



    const handelLike = () => {
        //TODO: send request to server to like the post
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axios.post(`post/${post?.id}/like`,{
            userId:userId
        }).then((res) => {
            if(res.status===200||res.status===201){
                console.log(res);
            }
        }).catch((err) => {
            setErrorMsg(err.response.data.message);
            console.log(err);
        });

        setLike(true);
    }
    const handelUnLike = () => {
        //TODO: send request to server to unlike the post
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axios.post(`post/${post?.id}/unlike`,{
            userId:userId
        }).then((res) => {
            if(res.status===200||res.status===201){
                console.log(res);
            }
        }).catch((err) => {
            setErrorMsg(err.response.data.message);
            console.log(err);
        });

        setLike(false);
    }
    return (    
            data&&data[current] &&<View key={index} style={container}>
                <View style={header}>
                    <Auther name={userName} createdAt={createdAt} />
                    {data.length>1&&<Text style={count}>
                        {current+1}/{data.length}
                    </Text>}
                </View>
                <ScrollView   
                    horizontal
                    pagingEnabled
                    scrollEnabled={data.length>1}
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={1}
                    // i need to the direction of the scroll to right or to left
                    onMomentumScrollEnd={(event) => {
                        // get the direction of scrolling left or right
                        const currentOffset = event.nativeEvent.contentOffset.x;
                        const direction = currentOffset > current ? "left" : "right";
                        setPlay(false);
                        if(direction === "left"){
                            setCurrent((current + 1)%data.length);
                        }
                        else{
                            setCurrent((current - 1 + data.length)%data.length);
                        }

                    }}                 
                >
                    <SinglePost data={data[current]}/>
                </ScrollView>
                { valid && (like ? 
                <TouchableOpacity style={button} onPress={handelUnLike}>
                    <Ionicons name="heart" size={40} color="red" />
                </TouchableOpacity>
                :
                <TouchableOpacity style={button} onPress={handelLike}>
                    <Ionicons name="heart-outline" size={40} color="black" />
                </TouchableOpacity>)
                }
            </View>

)}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        // padding: 20,
        // margin: 10,
    },
    button:{
        padding:20,
    },
    header:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
    },
    count:{
        fontSize: 15,
        padding: 10,
    },
});

export default Post;
