import { Container, ImageContainer, LikeBtn, SubContainer, Video } from "./style";
import { useEffect, useRef, useState } from "react";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Auther from "./Auther/auther";
import { Post } from "../../types";
import { useSelector } from "react-redux";
import { MainState } from "../../../State";

export default function Card(props:Post) {
    const [current, setCurrent] = useState(0);
    const [maxImagesHeight, setMaxImagesHeight] = useState(350);
    const [clicked, setClicked] = useState(props.like);
    const postMediaRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const {data} = props;
    const valid =data.length>1;

    const token =useSelector((state:MainState) => state.token); 
    const logedIn = token!=="";
    
    useEffect(() => {
        data?.forEach((image) => {
            if (image.type === "image") {
                const img = new Image();
                img.src = image.src;
                img.onload = () => {
                    setMaxImagesHeight((maxImagesHeight) => {
                    const maxValue = Math.min(maxImagesHeight, img.height);
                    const postWidth = postMediaRef?.current?.offsetWidth || 0;
                    if (maxImagesHeight > img.height && img.width > postWidth) {
                        return img.height * (postWidth / img.width);
                    }
                    return maxValue;
                    });
            };
          }
          else {
            const video = document.createElement("video");
            video.src = image.src;
            video.onloadedmetadata = () => {
              setMaxImagesHeight((maxImagesHeight) => {
                const maxValue = Math.min(maxImagesHeight, video.videoHeight);
                const postWidth = postMediaRef?.current?.offsetWidth || 0;

                if (maxImagesHeight > video.videoHeight && video.videoWidth > postWidth) {
                  return video.videoHeight * (postWidth / video.videoWidth);
                }
                return maxValue;
              });
            };
          }
        });
      }, [data]);

    const handelLike = () => {
        setClicked(!clicked);
        //TODO: Add the API call to like the post
        // axios.patch("/like",{
        //     id:props.id
        // }).then((res) => {
        //     console.log(res);
        // }).catch((err) => {
        //     console.log(err);
        // });

    }
    return (<>
    <Auther key={props.id} userName={props.userName} createdAt={props.createdAt} />
    <Container>
        <SubContainer>  
            {valid&&<ArrowBackIosIcon onClick={() => setCurrent((current - 1+data.length) % data.length) }/>}
            { 
                
                (data[current].type==="image") ? 
                <ImageContainer  ref={postMediaRef} style={{ height: maxImagesHeight,margin:"0px 3px" }}>
                    <img src={process.env.PUBLIC_URL+ data[current].src} alt="media" style={{height: "inherit"}}/>
                </ImageContainer>
                : 
                <Video  ref={videoRef} style={{ height: maxImagesHeight,margin:"0px 2px" }} autoPlay>
                    <source src={process.env.PUBLIC_URL+data[current].src} type="video/mp4" style={{height: "inherit"}}/>
                </Video>   
                
            }
            {valid&&<ArrowForwardIosIcon onClick={() => setCurrent((current + 1) % data.length) }/>}
        </SubContainer>
    </Container>
    {logedIn&&<LikeBtn clicked={clicked} onClick={handelLike}>Like</LikeBtn>}
    </>
    )
}