import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity,Alert } from "react-native";
import * as ImagePicker from 'expo-image-picker'; 
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { useSelector } from "react-redux";
import { changeRefresh } from "../Redux/slice/userSlicer";
import { useDispatch } from "react-redux";

/**
 * @function (postServer) - Function to send the image to the server
 * @function (handleUpload) - Function to load the image 
 * @function (handleUploadCamera) - Function to take a photo from the camera
 * @returns Upload button to upload image to the server or take a photo from camera
 */
const Upload = () => {
    const {upload} = styles;
    const refresh = useSelector(state => state.user.refresh);
    const token =useSelector(state=>state.user.token); 
    const id=useSelector(state=>state.user.id);
    const userName=useSelector(state=>state.user.userName);
    const dispatch = useDispatch();
    const [permission, setPermission] = useState(null);
    const[camera,setCamera]=useState(false);

    useEffect(() => {
      (async () => {
        try {
          const { status } = await ImagePicker.requestCameraPermissionsAsync();
          setPermission(status === 'granted');
        } catch (error) {
          console.error("Error requesting camera permissions", error);
        }
      })();
    }, []);
  
    // Function to upload the image to the server
    const postServer=(data)=>{
      const date = new Date();
      const day = date.getDate();
      const month = date.getMonth() + 1; 
      const year = date.getFullYear();
      const createdAt = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`
    //   console.log(data);

      axios.post('http://192.168.1.5:3333/post/upload', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
      },
      params: {
        userId: id,
        createdAt: createdAt,
        userName: userName
      },
        })
        .then((res) => {
        // console.log("response is ", res);
        if (res.status === 200 || res.status === 201) {
            // console.log("Image uploaded successfully");
            dispatch(changeRefresh(!refresh));
        }
        })
        .catch((err) => {
        // console.log("Error uploading image:", err);
        Alert.alert("Error", "Failed to upload image. Please try again.");
        });
    
  
    }
    const handleUpload = async() => {
      if(!permission){
        // console.log("Permission Denied");
        Alert.alert("Permission Denied", "Please enable camera permission to upload image.");
        return;
      }
      else{
        const cameraRes=await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          aspect: [4, 3],
          quality: 1,
          allowsMultipleSelection: true,
        });
        if(!cameraRes.cancelled){
          // Create a new FormData object
          let formData = new FormData();
  
          // Use Promise.all to wait for all fetch requests to complete
          cameraRes.assets.forEach((asset, index) => {
            // Check if the file type is valid
            if (asset.mimeType === 'image/png' || asset.mimeType === 'image/jpeg' || asset.mimeType === 'video/mp4') {
              // Create a new object with the file URI, type, and name
              let file = {
                uri: asset.uri,
                name: asset.filename || `file${index}.${asset.mimeType.split('/')[1]}`,
                type: asset.mimeType
              };          
              // Append the file object to the FormData object
              formData.append("data", file);
            } else {
              console.log(`${asset.filename} not image or video`);
              return;
            }
          });
            postServer(formData)
        }
        else{
          console.log("Cancelled");
        }
      }
    }
    const handleUploadCamera = async() => {
      if(!permission){
        // console.log("Permission Denied");
        Alert.alert("Permission Denied", "Please enable camera permission to upload image.");
        return;
      }
      else{
        // if i want to take a photo from camera
        const cameraRes = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        if(!cameraRes.cancelled){
          // Create a new FormData object
          let formData = new FormData();
  
          // Use Promise.all to wait for all fetch requests to complete
          cameraRes.assets.forEach((asset, index) => {
            // Check if the file type is valid
            if (asset.mimeType === 'image/png' || asset.mimeType === 'image/jpeg' || asset.mimeType === 'video/mp4') {
              // Create a new object with the file URI, type, and name
              let file = {
                uri: asset.uri,
                name: asset.filename || `file${index}.${asset.mimeType.split('/')[1]}`,
                type: asset.mimeType
              };          
              // Append the file object to the FormData object
              formData.append("data", file);
            } else {
              console.log(`${asset.filename} not image or video`);
              return;
            }
          });
            postServer(formData)
        }
        else{
          console.log("Cancelled");
        }
      }
    }

    return (
    token!=="" &&
    (!camera ? 
        <TouchableOpacity onPress={handleUpload} onLongPress={()=>{setCamera(true)}}>
            <MaterialIcons name="cloud-upload" size={50} color="#ff2c00" style={upload} />
        </TouchableOpacity>
        :
        <TouchableOpacity onPress={handleUploadCamera} onLongPress={()=>{setCamera(false)}}>
            <MaterialIcons name="camera" size={50} color="#9000c3" style={upload} />
        </TouchableOpacity>
    )
    );
}
const styles = StyleSheet.create({
    upload:{
      position: "absolute",
      bottom: 40,
      right: 20,
    }
  });

export default Upload;