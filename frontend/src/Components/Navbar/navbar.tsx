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
import { IconButton } from '@mui/material';
import { log } from 'console';

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
    useEffect(() => {
        ChangeToken("Abdelrazik")
        ChangeUserName("Abdelrazik Abdelrazik")
    }, [])

    useEffect(() => {
        GoToTop()
        setLogin(true);
    }, [token,userName,login])

    const SignOut = () => {
        ChangeToken("")
        ChangeUserName("")
        setLogin(false);
        console.log("Sign out")
        console.log(token)
        console.log(userName)
        //TODO: Add the API call to sign out
        // axios.post("/signout").then((res) => {
        //     console.log(res);
        // }).catch((err) => {
        //     console.log(err);
        // });
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

