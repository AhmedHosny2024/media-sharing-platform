import { Button, styled } from "@mui/material";

export const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
    backgroundColor: 'transparent',
  });

export const Upload = styled(Button)(() => ({
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
    "&:hover": {
        // background: "linear-gradient(10.15deg, #ff2c00 -6.51%, #9000c3 120.19%)",
        background: "transparent",
        color: "white",
    },
    boxShadow: "0px 0px 5px 0px #0000000a",
}));