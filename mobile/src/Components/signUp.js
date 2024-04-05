import React, { useState } from "react";
import { Modal, Pressable, View,Text, StyleSheet,TextInput ,TouchableWithoutFeedback,Keyboard} from "react-native";
import { Formik } from "formik";
import { Ionicons } from '@expo/vector-icons';
import * as yup from "yup";
import axios from "../Server/intsance";
import { useDispatch } from "react-redux";
import { changeToken,changeName,changeId,changeRefresh } from "../Redux/slice/userSlicer";
import { useSelector } from "react-redux";

const validationSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required().min(8),
    userName: yup.string().required().min(3),
    phone: yup.string().required().min(11).max(11).test("checkPhone","Phone must be start with 01", (val) => {
        return val.startsWith("01");
    }).test("checkPhone","Phone must be number", (val) => {
        return val.match(/^[0-9]+$/);
    }).test("checkPhone","Phone must be valid number", (val) => {
        return val.startsWith("010") || val.startsWith("011") || val.startsWith("012") || val.startsWith("015");
    }),
});
const SignUp = () => {
    const[visible,setVisible] = useState(false);
    const[errorMsg,setErrorMsg]=useState(null); 
    const refresh = useSelector(state => state.user.refresh);
    const dispatch = useDispatch();
    const {botton,moddelToggle,container,input,actions,actionsBtn,error} = styles;
    const handelSubmit = (values) => {
        console.log(values);
        if(values.email !== "" && values.password !== "" && values.userName !== "" && values.phone !== ""){
            //TODO : send request to server and get 
            // userName
            // id
            // access_token
            axios.post("/auth/signup",{
                email: values.email,
                password: values.password,
                userName: values.userName,
                phone: values.phone
            }).then((res) => {
                if(res.status === 200||res.status === 201){
                    // save the token in redux
                    dispatch(changeToken(res.data.access_token));
                    dispatch(changeName(res.data.userData.userName));
                    dispatch(changeId(res.data.userData.id));
                    dispatch(changeRefresh(!refresh));

                    console.log(res.data);
                }
            }).catch((err) => {
                //check if error message is list or just a string
                setErrorMsg(err.response.data.message);
                console.log(err.response.data);
            });
            setVisible(false);
        }
    }
    return (
        <>
        <Pressable style={botton} onPress={()=>setVisible(!visible)}>
            <Text style={{color:"red",fontWeight:500}}>Sign Up</Text>
        </Pressable>
        <Modal visible={visible} animationType="slide" >
                <>
                <Ionicons name="apps-sharp" size={60} color="red" style={moddelToggle}/>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={container}>
                    <Formik
                        initialValues={{email:"",password:"",userName:"",phone:""}}
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
                                    <TextInput
                                        style={input}
                                        placeholder="Enter Your User Name"
                                        onChangeText={props.handleChange("userName")}
                                        value={props.values.userName}
                                        keyboardType="default"  
                                    />
                                    <Text style={error}>{props.touched.userName && props.errors.userName}</Text>
                                    <TextInput
                                        style={input}
                                        placeholder="Enter Your phone"
                                        onChangeText={props.handleChange("phone")}
                                        value={props.values.phone}
                                        keyboardType="phone-pad"
                                        
                                    />
                                    <Text style={error}>{props.touched.phone && props.errors.phone}</Text>
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
        marginTop:30,
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
        marginBottom: 2,
        marginTop: 2,
        color: "red",
        textAlign: 'left',
        marginLeft: 10,
    },
});
export default SignUp;