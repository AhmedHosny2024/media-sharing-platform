import { Avatar, styled } from "@mui/material";

export const Container = styled("div")(() => ({
    display: "flex",
    boxSizing: "border-box",
    flexDirection:"row",
    justifyContent: "flex-start",
    margin: "10px 10px",    

}));
export const UserIcon = styled(Avatar)(() => ({
    width: "25px",
    height: "25px",
    borderRadius: "50%",
    overflow: "hidden",
    boxSizing: "border-box",
    margin: "0 2px",
}));
export const UserName = styled("div")(() => ({
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    boxSizing: "border-box",
}));
export const UserInfo = styled("div")(() => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    alignContent: "left",
}));
export const PostDate = styled("div")(() => ({
    fontSize: "0.8rem",
    color: "grey",
    textAlign: "end",
    boxSizing: "border-box",
    margin: "8px 10px",
}));