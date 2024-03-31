import Card from "./Card/card";
import { Container } from "./style";
import axios from '.././../Server/Instance';
import { useEffect, useState } from "react";
import { Post, PostType } from "../types";
export default function Mainpage() {
    const [data, setData] = useState<Post[]>([]);

    const posttype1:PostType[]=[
        {
            type: "video",
            src: "test.mkv"
        },
        {
            type: "image",
            src: "0.jpg"
        } ,
    ];
    const posttype2:PostType[]=[
        {
            type: "video",
            src: "test.mkv"
        } ,
        {
            type: "image",
            src: "test.jpg"
        },
        {
            type: "video",
            src: "test2.mkv"
        },
        {
            type: "image",
            src: "test.jpg"
        } ,
    ];
    const tempdata:Post[] =[
        {
            id:1,
            userName: "user1",
            createdAt: "2021-09-01",
            like: true,
            data:posttype1,
        },
        {
            id:2,
            userName: "user2",
            createdAt: "2021-09-01",
            like: false,
            data:posttype2,
        },  
    ];
    
    useEffect(() => {
        //TODO: Add the API call to get the posts
        // axios.get('/').then((res) => {
        //     console.log(res.data);
        //     setData(res.data);
        // }).catch((err) => {
        //     console.log(err);
        // })
        setData(tempdata);

    }, [])
    return (
        <Container>
            {
                data.map((post:Post) => {
                    return <Card key={post.id} data={post.data} id={post.id} like={post.like} userName={post.userName} createdAt={post.createdAt}/>
                })
            }
        </Container>
    )
}