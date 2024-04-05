import { styled } from "@mui/material";

export const SubContainer = styled("div")(({theme}) => ({
    display: "flex",
    justifyContent: "center",
    boxSizing: "border-box",
    flexDirection:"row",
    alignItems: "center",
    [theme.breakpoints.down('sm')]: {
        flexWrap: "wrap",
        display: 'flex',
        flexDirection: 'column',
        width:"auto",
        justifyContent: "center",
        alignItems: "center",  
    },
}));

export const Video = styled("video")(({theme}) => ({
    width: "100%",
    height: "100%",
    [theme.breakpoints.down('sm')]: {
        width: "100%",
        height: "100%",
    },
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}));
export const ImageContainer = styled("div")(({theme}) => ({
    width: "100%",
    height: "100%",
    [theme.breakpoints.down('sm')]: {
        width: "50%",
        height: "100%",
    },
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}));
export const LikeBtn = styled("button")<any>(({clicked}) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxSizing: "border-box",
    backgroundColor: clicked ? "red" : "transparent",
    cursor: "pointer",
    padding: "5px 10px",
    margin: "10px 15px",
    borderRadius: "5px",
    outline: "none",
    "&:hover": {
        border: "solid 1px red",
        color: clicked? "white":"red" ,

    },
    border : clicked ? "solid 1px red" : "solid 1px gray",
    color: clicked ? "white" : "gray",
    fontWeight: "bold",
    width:65,
}));

export const Container = styled("div")(({theme}) => ({
    width: "-webkit-fill-available",
    [theme.breakpoints.down('sm')]: {
        display: 'flex',
        flexDirection: 'column',
        width:"fit-content",
    },
}));

export const CardContainer = styled("div")(({theme}) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems:"flex-start",
    width: "100%",
    [theme.breakpoints.down('sm')]: {
        width: "100%",
    },
}));
