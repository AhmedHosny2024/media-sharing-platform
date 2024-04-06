import { useSnackbar, VariantType } from "notistack";
import {  useState } from "react";
import { Container, Header, InputBoxContainer, SecondContainer, SignInBtn, Style, SubmitBtn } from "./style";
import { Box, FormControl, IconButton, Input, InputAdornment, InputLabel, Modal, Typography } from "@mui/material";
import AppsIcon from '@mui/icons-material/Apps';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from '../../Server/Instance';
import { useDispatch } from "react-redux";
import {bindActionCreators} from 'redux';
import { actionsCreators } from "../../State/index";
/**
 * @description Log In form component
 * @function (handleSubmit) - function to handle submit button
 * @function (handleOpen) - function to handle open modal
 * @function (handleClose) - function to handle close modal
 * @function (Alert) - function to handle alert message
 * @returns Log In form component
 */
export default function SignInFrom() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const dispatch = useDispatch();
    const { ChangeToken,ChangeUserName, ChangeId } = bindActionCreators(actionsCreators,dispatch);

    const { enqueueSnackbar } = useSnackbar();
    const Alert = (msg:string,variant: VariantType) => () => {
        enqueueSnackbar(msg, { variant,autoHideDuration: 2000 });
    };

    function handleSubmit() {
        if(email===""){
            Alert("Email is required","error");
            console.log("Email is required");
            return;
        }
        if(password===""){
            console.log("Password is required");
            Alert("Password is required","error");
            return;
        }
        try {
            setLoading(true);
            // TODO: Add the API call to sign in the user
            axios.post("/auth/login",{
                email: email,
                password: password
            }).then(async (res) => {
                console.log("signin ",res);
                await ChangeToken(res.data.access_token);
                await ChangeUserName(res.data.userData.userName);
                await ChangeId(res.data.userData.id);
                await Alert("Login Success","success");
                handleClose();
                // window.location.reload();
            }).catch((err) => {
                //check if error message is list or just a string
                if(err.response.data.message instanceof Array){
                    err.response.data.message.forEach((msg:string) => {
                        Alert(msg,"error")();
                    });
                }
                else
                    {
                        Alert(err.response.data.message,"error")();
                    }
            });
    
        } catch {
            Alert("Check Email or password  ","error");
        }
        setLoading(false);
    }

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
    <>
        <SignInBtn onClick={handleOpen} id="signin">Logn In</SignInBtn>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Container sx={{ ...Style ,display: 'flex', alignItems: 'center' ,justifyContent:"center",flexDirection:"column"  }}>
                <Header>
                    <AppsIcon sx={{fontSize:'3rem',color:'#c9175f'}}/>
                    <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    sx={{
                    m: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    textDecoration: 'none',
                    }}
                    >
                        Media Sharing 
                    </Typography>
                </Header>
                <SecondContainer sx={{m:"8px 8px 8px 0px"}}>
                    <InputBoxContainer  variant="standard" color="secondary">
                        <InputLabel htmlFor="User Name">Email</InputLabel>
                        <Input
                            id="Email"
                            type='text' 
                            defaultValue={email}
                            onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                                setEmail(e.target.value);
                            }}
                        />
                    </InputBoxContainer>
                </SecondContainer>

                <SecondContainer sx={{m:"8px 8px 8px 0px"}}>
                    <FormControl sx={{  width: '25ch' }} color="secondary" variant="standard">
                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                        <Input
                            id="standard-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            defaultValue={password}
                            onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                                setPassword(e.target.value);
                            }}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            }
                        />
                    </FormControl>
                </SecondContainer>
            
            <Box sx={{display:'flex', justifyContent:'space-evenly',my:2}}>
                <SubmitBtn variant="contained" sx={{m:1}} onClick={handleSubmit} disabled={loading}>Submit</SubmitBtn>
            </Box>

            </Container>
        </Modal>    
    </>
    );
}