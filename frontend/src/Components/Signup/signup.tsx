import { useSnackbar, VariantType } from "notistack";
import {  useState } from "react";
import { Container, Header, InputBoxContainer, SecondContainer, SignUpBtn, Style, SubmitBtn } from "./style";
import { Box, FormControl, IconButton, Input, InputAdornment, InputLabel, Modal, Typography } from "@mui/material";
import AppsIcon from '@mui/icons-material/Apps';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from '../../Server/Instance';
import { useDispatch } from "react-redux";
import {bindActionCreators} from 'redux';
import { actionsCreators } from "../../State/index";
/**
 * @description Signup form component
 * @function (handelChangePhone) - function to handle phone input
 * @function (handleSubmit) - function to handle submit button
 * @function (handleOpen) - function to handle open modal
 * @function (handleClose) - function to handle close modal
 * @function (Alert) - function to handle alert message
 * @returns  Signup form component
 */
export default function SignupFrom() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const { ChangeToken,ChangeUserName,ChangeId } = bindActionCreators(actionsCreators,dispatch);

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const { enqueueSnackbar } = useSnackbar();
    const Alert = (msg:string,variant: VariantType) => () => {
        enqueueSnackbar(msg, { variant,autoHideDuration: 2000 });
    };

    function handleSubmit() {
        if(email===""){
            Alert("Email is required","error")();
            return;
        }
        if(password===""){
            Alert("Password is required","error")();
            return;
        }
        if(userName===""){
            Alert("User Name is required","error")();
            return;
        }
        if(phone===""){
            Alert("Phone is required","error")();
            return;
        }
        try {
            setLoading(true);
            axios.post("/auth/signup",{
                email: email,
                password: password,
                userName: userName,
                phone: phone
            }).then(async (res) => {
                if(res.status === 200||res.status === 201){
                    await ChangeToken(res.data.access_token);
                    await ChangeUserName(res.data.userData.userName);
                    await ChangeId(res.data.userData.id);
                    await Alert("Account created successfully","success")();
                    await handleClose();
                    // window.location.reload();
                }
            }).catch((err) => {
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
        }
        catch (e) {
            Alert("Failed to create an account","error")();
        }
        setLoading(false);
    }

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handelChangePhone = (value:string) => {
        if (value.match(/^[0-9\b]+$/) && value.length === 11 && value[0] === '0' && value[1] === '1' && (value[2]==="0" || value[2]==="1"||value[2]==="2"||value[2]==="5") ) {
            setPhone(value);
        }
        else{
            setPhone("");
        }
    }

    return (
    <>
        <SignUpBtn onClick={handleOpen}  id="signup">Sign Up</SignUpBtn>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box sx={{ ...Style ,display: 'flex', alignItems: 'center' ,justifyContent:"center",flexDirection:"column"  }}>
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
                <Container sx={{display:"flex" , alignItems:"center",justifyContent:'space-evenly',width: 500}}>
                    <SecondContainer sx={{m:2}}>
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

                    <SecondContainer>
                        <FormControl sx={{ m: 0, width: '25ch' }} color="secondary" variant="standard">
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
                </Container>
                <Container sx={{display:"flex" , alignItems:"center",justifyContent:'space-evenly',width: 500}}>
                    <SecondContainer sx={{m:2}}>
                        <FormControl sx={{ m: 0, width: '25ch' }} color="secondary" variant="standard">
                            <InputLabel htmlFor="User Name">User Name</InputLabel>
                            <Input
                                id="User Name"
                                type='text' 
                                defaultValue={userName}
                                onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                                    setUserName(e.target.value);
                                }}
                            />
                        </FormControl>
                    </SecondContainer>

                    <SecondContainer >
                        <FormControl sx={{ m: 0, width: '25ch' }} color="secondary" variant="standard">
                            <InputLabel htmlFor="User Name">Phone</InputLabel>
                            <Input
                                id="Phone"
                                type='text' 
                                defaultValue={phone}
                                onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                                handelChangePhone(e.target.value);
                                }}
                            />
                        </FormControl>
                    </SecondContainer>
                </Container>
                <Box sx={{display:'flex', justifyContent:'space-evenly',my:1}}>
                    <SubmitBtn variant="contained" sx={{m:1}} onClick={handleSubmit} disabled={loading}>Submit</SubmitBtn>
                </Box>
            </Box>
        </Modal>    
    </>
    );
}