import React ,{useState,useEffect} from 'react';
import axios from './intsance';
export const getPosts=(refresh)=>{
  const[errorMsg,setErrorMsg]=useState(null); 
  const[posts,setPosts]=useState(null);
  useEffect(()=>{
    axios.get('/post').then((res) => {
        setPosts(res.data);
    }).catch((err) => {
        setErrorMsg(err.response.data.message);
        console.log(err);
    })

    },[refresh]);
    return [errorMsg,posts];
}

