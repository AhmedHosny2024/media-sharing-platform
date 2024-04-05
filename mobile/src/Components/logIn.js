import React, { useState } from "react";
import { Modal, Pressable, View,Text, StyleSheet,TextInput ,TouchableWithoutFeedback,Keyboard} from "react-native";
import { Formik } from "formik";
import { Ionicons } from '@expo/vector-icons';
import * as yup from "yup";
import axios from "../Server/intsance";
import { useDispatch } from "react-redux";
import { changeToken,changeName,changeId,changeRefresh} from "../Redux/slice/userSlicer";
import { useSelector } from "react-redux";


const validationSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required().min(8),
});
const Login = () => {
    const[visible,setVisible] = useState(false);
    const[errorMsg,setErrorMsg]=useState(null);
    const refresh = useSelector(state => state.user.refresh);
    const dispatch = useDispatch();
    const {botton,moddelToggle,container,input,actions,actionsBtn,error} = styles;
    const handelSubmit = (values) => {
        console.log(values);
        if(values.email !== "" && values.password !== ""){
            //TODO : send request to server and get 
            // userName
            // id
            // access_token
            axios.post("/auth/login",{
                email: values.email,
                password: values.password,
            }).then((res) => {
                if(res.status === 200||res.status === 201){
                    // save the token in redux
                    dispatch(changeToken(res.data.access_token));
                    dispatch(changeName(res.data.userData.userName));
                    dispatch(changeId(res.data.userData.id));
                    dispatch(changeRefresh(!refresh));
                }
            }).catch((err) => {
                //check if error message is list or just a string
                setErrorMsg(err.response.data.message);
                console.log(err.response.data.message);
            });
            setVisible(false);
        }
    }
    return (
        <>
        <Pressable style={botton} onPress={()=>setVisible(!visible)}>
            <Text style={{color:"red",fontWeight:500}}>Log In</Text>
        </Pressable>
        <Modal visible={visible} animationType="slide" >
                <>
                <Ionicons name="apps-sharp" size={60} color="red" style={moddelToggle}/>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={container}>
                    <Formik
                        initialValues={{email:"",password:""}}
                        onSubmit={handelSubmit}
                        validationSchema={validationSchema}
                        >
                            {(props) => (
                                <View style={container}>
                                    <TextInput
                                        style={input}
                                        placeholder="Enter Your Email"
                                        onChangeText={props.handleChange("email")}
                                        value={props.values.email}
                                        keyboardType="email-address"
                                        
                                    />
                                    <Text style={error}>{props.touched.email && props.errors.email}</Text>
                                    <TextInput
                                        style={input}
                                        onChangeText={props.handleChange("password")}
                                        value={props.values.password}
                                        secureTextEntry={true}
                                        placeholder="Enter Your Password"
                                    />
                                    <Text style={error}>{props.touched.password && props.errors.password}</Text>
                                    <View style={actions}>
                                        <Pressable onPress={()=>setVisible(false)}>
                                            <Text style={[actionsBtn,{color:"white",backgroundColor:"red"}]}>Cancel</Text>
                                        </Pressable>
                                        <Pressable onPress={props.handleSubmit}>
                                            <Text style={[actionsBtn,{color:"white",backgroundColor:"lightblue"}]}>Submit</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            )}
                    </Formik>
                </View>
            </TouchableWithoutFeedback>
            </>
        </Modal>
        </>
    );
}
const styles = StyleSheet.create({
    botton:{
        backgroundColor: "white",
        padding: 8,
        margin: 10,
        borderRadius: 7,
        cursor: "pointer",
    },
    moddelToggle:{
        marginTop:70,
        borderWidth: 1,
        borderColor: "#f2f2f2",
        padding: 10,
        borderRadius: 10,
        alignSelf: "center",
    },
    modelContent:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        fontSize: 18,
        borderRadius: 6,
        margin: 5,
    },
    actions:{
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    actionsBtn:{
        margin: 10,
        padding: 10,
        borderRadius: 10,
        fontWeight:'500',
    },
    error: {
        color: 'crimson',
        fontWeight: '500',
        marginBottom: 5,
        marginTop: 2,
        color: "red",
        textAlign: 'left',
        marginLeft: 10,
    },
});
export default Login;