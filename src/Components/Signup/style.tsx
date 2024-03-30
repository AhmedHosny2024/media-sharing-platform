import { styled } from '@mui/system';
import { Box, Button, FormControl } from "@mui/material";

export const Style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };
export const SubmitButton = styled(Button)(() => ({
    width: "100%",
    marginTop: "20px",
    backgroundColor: "#f50057",
    color: "white",
    "&:hover": {
        backgroundColor: "#f50057",
    }
  }));

export const Header =styled(Box)(() => ({
  display:"flex" , 
  alignItems:"center",
  my:8,
  color:"#c9175f",
}));


export const InputBoxContainer = styled(FormControl)(() => ({
  m: 1, 
  width: '25ch' ,
}));

export const SubmitBtn= styled(Button)(() => ({
  width: "100%",
  marginTop: "20px",
  backgroundColor: "#f50057",
  color: "white",
  "&:hover": {
      backgroundColor: "#f50057",
  }
}));


export const Container = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    display: 'flex',
    flexDirection: 'column',
    width:"fit-content",
  },
  backgroundColor: 'white',
}));
export const SecondContainer = styled(Box)(({ theme }) => ({
  width:"40%",
  [theme.breakpoints.down('sm')]: {
    width:"100%",
  },
}));