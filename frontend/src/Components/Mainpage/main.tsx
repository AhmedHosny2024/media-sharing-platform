import Card from "./Card/card";
import { Container } from "./style";
import axios from '.././../Server/Instance';
import { useEffect, useState } from "react";
import { Post } from "../types";
import { useSelector } from "react-redux";
import { MainState } from "../../State";
/**
 * @description Main page component
 * @returns Main page component
 */
export default function Mainpage() {
    const token = useSelector((state:MainState) => state.token);
    const [data, setData] = useState<Post[]>([]);
    useEffect(() => {
      axios.get('/post').then((res) => {
        setData(res.data);
      }).catch((err) => {
        console.log(err);
      })     
    }, [token])
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