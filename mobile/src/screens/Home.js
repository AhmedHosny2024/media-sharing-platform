import React from "react";
import Navbar from "../Components/navbar";
import { ScrollView, StyleSheet, View } from "react-native";
import MainPage from "../Components/mainPage";
import Upload from "../Components/upload";
const Home = () => {
    const {container,content} = styles;

    return (
    <>
        <Navbar/>
        <ScrollView style={container}>
          <View style={content}>
            <MainPage/>
          </View>
        </ScrollView>
        <Upload/>
    </>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    content:{
      padding: 15,
      paddingTop:5,
      alignItems: "center",
      justifyContent: "center",
    },
  });
export default Home;