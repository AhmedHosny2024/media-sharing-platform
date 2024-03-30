import { styled } from "@mui/material";

export const SubContainer = styled("div")(({theme}) => ({
    display: "flex",
    justifyContent: "center",
    boxSizing: "border-box",
    flexDirection:"row",
    alignItems: "center",
    flexWrap: "wrap",
    [theme.breakpoints.down('sm')]: {
        display: 'flex',
        flexDirection: 'column',
        width:"fit-content",
    },
}));

export const LikeBtn = styled("button")<any>(({clicked}) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxSizing: "border-box",
    backgroundColor: clicked ? "red" : "transparent",
    cursor: "pointer",
    padding: "5px 10px",
    margin: "10px 0px",
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
    [theme.breakpoints.down('sm')]: {
        display: 'flex',
        flexDirection: 'column',
        width:"fit-content",
    },
}));
