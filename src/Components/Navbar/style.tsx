import { Button, styled } from "@mui/material";

export const Header = styled("div")(() => ({
    top: 0,
    width: "100%",
    height: 65,
    zIndex: 1200,
    position: "fixed", 
    padding:"0px 15px",
    display: "flex",
    boxShadow: "#0000000a 0px 24px 24px",
    background: "linear-gradient(10.15deg, #ff2c00 -6.51%, #9000c3 120.19%)",
    justifyContent: "space-between",
    boxSizing: "border-box",
}));
export const Icon = styled("div")(() => ({
    width: 65,
    height: 65,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    
}));

export const SignContainer = styled("div")(() => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 1,
    flexDirection:"row"
}));


export const SignUp= styled(Button)(() => ({
    width: 120,
    height: 25,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    borderRadius: 25,
    backgroundColor: "white",
    color:"#e82326",
    border: "none",
    fontSize: 14,
    fontWeight: 500,
    margin: "2px",
    "&:hover": {
        background: "#e82326",
        color: "white",
    },
}));

export const UserName = styled("div")(() => ({
    width: 65,
    height: 65,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    color:"white",
    fontWeight:500,
    fontSize:20
}));
export const UserData = styled("div")(() => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 1,
    flexDirection:"row",
    color:"white",
}));

export const Name = styled("div")(() => ({
    display: "flex",
    justifyContent: "left",
    alignItems: "center",
    gap: 1,
    flexDirection:"row",
    color:"white",
    fontWeight:500,
    fontSize:30
}));

export const SubHeader = styled("div")(() => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 1,
    flexDirection:"row",
    color:"white",
}));