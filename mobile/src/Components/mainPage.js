import React, { useEffect, useState } from "react";
import Post from "./post/post";
import { getPosts } from "../Server/getPosts";
import { useSelector } from "react-redux";

const MainPage = () => {
    const [data, setData] = useState();
    const refresh = useSelector(state => state.user.refresh); 
    const [errorMsg,posts]=getPosts(refresh);
    console.log("heer:",refresh);
    useEffect(() => {
        setData(posts)
    },[posts,refresh]);
    return (
        data?.map((item,index) => {
            return (
                <Post key={index} post={item} index={index}/>
            )
        })
    );
}

export default MainPage;