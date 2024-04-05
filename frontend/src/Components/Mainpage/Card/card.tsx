import { CardContainer, Container, ImageContainer, LikeBtn, SubContainer, Video } from "./style";
import { useEffect, useRef, useState } from "react";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Auther from "./Auther/auther";
import { Post } from "../../types";
import { useSelector } from "react-redux";
import { MainState } from "../../../State";
import axios from '../../../Server/Instance';
import {  Skeleton } from "@mui/material";
type postProps = {
    post:Post
}
/**
 * 
 * @param props - Post{data:PostData[],id:string,likedBy:PostLikedBy[],userName:string,createdAt:string}
 * @function handelLike - function to handle like button
 * @function GetHeightAndWidth - function to get the height and width of the media to make all media in the same post have same dimentions
 * @returns 
 */
export default function Card(props:postProps) {
    const [current, setCurrent] = useState(0);
    const [maxImagesHeight, setMaxImagesHeight] = useState(350);
    const [maxImageWidth, setMaxImagesWidth] = useState(350);
    const minHeight = 100;
    const minWidth = 100;
    const postMediaRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const {data} = props.post;
    const {id} = props.post;
    const valid =data.length>1;
    const userId = useSelector((state:MainState) => state.id);
    const [clicked, setClicked] = useState(props.post.likedBy.some(user => user.id === userId ));
    const token =useSelector((state:MainState) => state.token); 
    const logedIn = token!=="";

    const[loading,setLoading] = useState(true);


    const handelLike = () => {
      //TODO: Add the API call to like the post
      if(!clicked){
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axios.post(`post/${id}/like`,{
            userId:userId
        }).then((res) => {
            if(res.status===200||res.status===201){
                // console.log(res);
            }
        }).catch((err) => {
            console.log(err);
        });
      }
      else{
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axios.post(`post/${id}/unlike`,{
            userId:userId
        }).then((res) => {
            if(res.status===200||res.status===201){
                // console.log(res);
            }
        }).catch((err) => {
            console.log(err);
        });
      }
      setClicked(!clicked);
    }

    const GetHeightAndWidth= ()=>{
        data?.forEach((image) => {    
        if (image.type.includes("image")) {
            image.type = "image";
            const img = new Image();
            img.src = process.env.REACT_APP_BASE_URL+image.url;
            img.onload = () => {
                setLoading(true)
                setMaxImagesHeight((maxImagesHeight) => {
                const maxValue = Math.min(maxImagesHeight, img.height);
                const postWidth = postMediaRef?.current?.offsetWidth || 0;
                let newHeight = maxValue;
                if (maxImagesHeight > img.height && img.width > postWidth && postWidth>0 &&img.height > minHeight) {
                    newHeight= img.height * (postWidth / img.width);
                }
                return newHeight;
                });
                setMaxImagesWidth((maxImagesWidth) => {
                const maxValue = Math.min(maxImagesWidth, img.width );
                const postWidth = postMediaRef?.current?.offsetWidth || 0;
                let newWidth = maxValue;
                if (maxImagesWidth > img.width && img.width > postWidth && postWidth>0&&img.width > minWidth) {
                    newWidth= img.width * (postWidth / img.width);
                }
                return newWidth;
                });
                setLoading(false);
              };
      }
      else {
        const video = document.createElement("video");
        video.src = process.env.REACT_APP_BASE_URL+image.url;
        video.onloadedmetadata = () => {
            setLoading(true)
          setMaxImagesHeight((maxImagesHeight) => {
            const maxValue = Math.min(maxImagesHeight, video.videoHeight);
            const postWidth = postMediaRef?.current?.offsetWidth || 0;
            let newHeight = maxValue;
            if (maxImagesHeight > video.videoHeight && video.videoWidth > postWidth &&postWidth>0&& video.videoHeight > minHeight) {
                newHeight= video.videoHeight * (postWidth / video.videoWidth);
            }
            return newHeight;
          });
          setMaxImagesWidth((maxImagesWidth) => {
            const maxValue = Math.min(maxImagesWidth, video.videoWidth);
            const postWidth = postMediaRef?.current?.offsetWidth || 0;
            let newWidth = maxValue;
            if (maxImagesWidth > video.videoWidth && video.videoWidth > postWidth &&postWidth>0&& video.videoWidth > minWidth) {
                newWidth= video.videoWidth * (postWidth / video.videoWidth);
            }
            return newWidth;
          });
          setLoading(false);
        };
      }
    });
    }

    useEffect(() => {
        GetHeightAndWidth();
        setLoading(true)
    }, [data, current] );
    
    const getCurrentMedia = () => {
        if (loading) {
            return (
                <Skeleton variant="rectangular" width="100%">
                    <div style={{ height: maxImagesHeight, margin: "0px 3px", width: maxImageWidth }} />
                </Skeleton>
            )
        }
      if (data[current].type === "image") {
          return (
              <ImageContainer ref={postMediaRef} style={{ height: maxImagesHeight, margin: "0px 3px", width: maxImageWidth }}>
                  <img src={process.env.REACT_APP_BASE_URL+data[current].url} alt="media" style={{ height: "inherit" }} />
              </ImageContainer>
          );
      } else {
          return (
              <Video ref={videoRef} style={{ height: maxImagesHeight, margin: "0px 2px", width: maxImageWidth }}  controls autoPlay muted>
                  <source src={process.env.REACT_APP_BASE_URL+data[current].url} type={"video/mp4"} style={{ height: "inherit" }} />
              </Video>
          );
      }
  }
 
    return (
    <CardContainer >
    <Auther key={props.post.id} userName={props.post.userName} createdAt={props.post.createdAt} />
    <Container>
        <SubContainer>  
            {valid&&<ArrowBackIosIcon onClick={() => setCurrent((current - 1+data.length) % data.length) }/>}
             
            {getCurrentMedia()}
            
            {valid&&<ArrowForwardIosIcon onClick={() => setCurrent((current + 1) % data.length) }/>}
        </SubContainer>
    </Container>
    {logedIn&&<LikeBtn clicked={clicked} onClick={handelLike}>Like</LikeBtn>}
    </CardContainer>
    )
}