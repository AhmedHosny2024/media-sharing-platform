import Card from "./Card/card";
import { Container } from "./style";
import axios from '.././../Server/Instance';
import { useEffect, useState } from "react";
import { Post } from "../types";
export default function Mainpage() {
    const [data, setData] = useState<Post[]>([]);
    useEffect(() => {
        //TODO: Add the API call to get the posts
        axios.get('/post').then((res) => {
            setData(res.data);
        }).catch((err) => {
            console.log(err);
        })

    }, [])
    return (
        <Container>
            {
                data.map((post:Post) => {
                    return <Card key={post.id} data={post.data} id={post.id} likedBy={post.likedBy} userName={post.userName} createdAt={post.createdAt}/>
                })
            }
        </Container>
    )
}