import React from 'react';
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
import { Typography } from '@mui/material';


export default function Navbar() {
    const token =useSelector((state:MainState) => state.token); 
    const dispatch = useDispatch();
    const { ChangeToken } = bindActionCreators(actionsCreators,dispatch);
    ChangeToken("")
    console.log(token)

    const GoToTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
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
                    {token}
                </UserName>
            </UserData>
            }
            

        </Header>
    );
}

