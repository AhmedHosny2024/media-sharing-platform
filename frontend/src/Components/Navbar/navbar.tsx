import React, { useEffect } from 'react';
import AppsIcon from '@mui/icons-material/Apps';
import {
    useDispatch,
     useSelector } from "react-redux";
import  {MainState}  from '../../State';
import { Header, Icon, Name, SignContainer, SignUp,  SubHeader,  UserData, UserName } from './style';
import {bindActionCreators} from 'redux';
import { actionsCreators } from "../../State/index";
import { UploadButton } from './Upload/upload';
import SignupFrom from '../Signup/signup';
import SignInFrom from '../Signin/signin';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from '../../Server/Instance';
import { Alert, IconButton } from '@mui/material';
import { useSnackbar, VariantType } from 'notistack';

export default function Navbar() {
    const token =useSelector((state:MainState) => state.token); 
    const userName =useSelector((state:MainState) => state.username);

    const dispatch = useDispatch();
    const { ChangeToken,ChangeUserName } = bindActionCreators(actionsCreators,dispatch);
    
    const[login,setLogin]=React.useState(false)
    const GoToTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }


    //TODO just for testing
    // useEffect(() => {
    //     ChangeToken("Abdelrazik")
    //     ChangeUserName("Abdelrazik Abdelrazik")
    // }, [])

    useEffect(() => {
        GoToTop()
        setLogin(true);
    }, [token,userName,login])

    const { enqueueSnackbar } = useSnackbar();
    const Alert = (msg:string,variant: VariantType) => () => {
        enqueueSnackbar(msg, { variant,autoHideDuration: 2000 });
    };

    const SignOut = async () => {
        axios.post("auth/logout").then((res) => {
            ChangeToken("")
            ChangeUserName("")
            setLogin(false);
        }
        ).catch((err) => {
            if(err.response.data.message instanceof Array){
                err.response.data.message.forEach((msg:string) => {
                    Alert(msg,"error")();
                });
            }
            else{
                Alert(err.response.data.message,"error")();
            }
        }); 
    }
    return (
        <Header>
            <SubHeader>
            <Icon onClick={GoToTop}>
                <AppsIcon sx={{width:"99%",height:"99%",color:"white"} }/>
            </Icon>       
            <Name>
                MSP
            </Name>

            </SubHeader>  
            {token===""?
            <SignContainer>
                <SignupFrom/>
                <SignUp onClick={()=>document.getElementById("signup")?.click()}>
                    Sign Up
                </SignUp>
                <SignInFrom />
                <SignUp onClick={()=>document.getElementById("signin")?.click()}>
                    Log in
                </SignUp>
            </SignContainer>
            :
            <UserData>
                <UploadButton />
                <UserName>
                    {userName}
                </UserName>
                <IconButton onClick={SignOut}>
                    <LogoutIcon sx={{color:"white"}} />
                </IconButton>
            </UserData>
            }
            

        </Header>
    );
}

