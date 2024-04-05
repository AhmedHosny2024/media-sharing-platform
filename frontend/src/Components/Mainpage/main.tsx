import Card from "./Card/card";
import { Container } from "./style";
import axios from '.././../Server/Instance';
import { useEffect, useState } from "react";
import { Post } from "../types";
/**
 * @description Main page component
 * @returns Main page component
 */
export default function Mainpage() {
    const [data, setData] = useState<Post[]>([]);
    useEffect(() => {
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
                    return <Card key={post.id} post={post}/>
                })
            }
        </Container>
    )
}