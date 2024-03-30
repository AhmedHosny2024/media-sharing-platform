import { Container, LikeBtn, SubContainer } from "./style";
import { useEffect, useRef, useState } from "react";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Auther from "./Auther/auther";

export default function Card() {
    const [current, setCurrent] = useState(0);
    const [maxImagesHeight, setMaxImagesHeight] = useState(350);
    const [clicked, setClicked] = useState(false);
    const postMediaRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const data:any[] =[
        {
            type: "vedio",
            src: "test.mkv"
        },
        {
            type: "image",
            src: "0.jpg"
        },
        
        
        {
            type: "vedio",
            src: "test2.mkv"
        },
        {
            type: "image",
            src: "Xray.jpg"
        },
    ];
    
    const valid =data?.length>1;

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
                    console.log(img.height * (postWidth / img.width));
                    return img.height * (postWidth / img.width);
                }
                    console.log(maxValue);
                return maxValue;
                });
            };
          }
          else {
            const video = document.createElement("video");
            video.src = image;
            video.onloadedmetadata = () => {
              setMaxImagesHeight((maxImagesHeight) => {
                const maxValue = Math.min(maxImagesHeight, video.videoHeight);
                const postWidth = postMediaRef?.current?.offsetWidth || 0;

                if (maxImagesHeight > video.videoHeight && video.videoWidth > postWidth) {
                    console.log(video.videoHeight * (postWidth / video.videoWidth));
                  return video.videoHeight * (postWidth / video.videoWidth);
                }
                console.log(maxValue);
                return maxValue;
              });
            };
          }
        });
        console.log(maxImagesHeight);
      }, [data]);

    const handelLike = () => {
        setClicked(!clicked);
    }
    return (<>
    <Auther />
    <Container>
        <SubContainer>  
            {valid&&<ArrowBackIosIcon onClick={() => setCurrent((current - 1+data.length) % data.length) }/>}
            { 
                
                (data[current].type==="image") ? 
                <div  ref={postMediaRef} style={{ height: maxImagesHeight,margin:"0px 3px" }}>
                    <img src={process.env.PUBLIC_URL+ data[current].src} alt="media" style={{height: "inherit"}}/>
                </div>
                : 
                <video  ref={videoRef} style={{ height: maxImagesHeight,margin:"0px 2px" }} autoPlay>
                    <source src={process.env.PUBLIC_URL+data[current].src} type="video/mp4" style={{height: "inherit"}}/>
                </video>   
                
            }
            {/* {current} */}
            {valid&&<ArrowForwardIosIcon onClick={() => setCurrent((current + 1) % data.length) }/>}
        </SubContainer>
        <LikeBtn clicked={clicked} onClick={handelLike}>Like</LikeBtn>
    </Container>
    </>
    )
}