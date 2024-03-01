import React, { useState, useEffect, useRef } from "react";
import {
  Modal,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import NetInfo from "@react-native-community/netinfo";

export const Main = () => {
  const insets = useSafeAreaInsets();
  const [source, setSource] = useState('https://yogabills.herokuapp.com') 

  const [isConnected, setIsConnected] = useState(true); // Assuming initially connected
  // const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // useEffect(() => {
  //   setModalVisible(!isConnected); // Show modal when disconnected
  // }, [isConnected]);

  const refreshState = () => {
    if (isConnected) {
      setSource('https://yogabills.herokuapp.com')
    }
  };

  return (
    <View style={styles.container}>
      <Modal animationType="slide" transparent={true} visible={!isConnected}>
        <ImageBackground
          source={require("../../assets/lost-connection.jpg")}
          style={styles.bgContainer}
        >
          <TouchableOpacity onPress={refreshState}>
            <Image
              style={styles.refreshIcon}
              source={require("../../assets/refresh.png")}
            />
          </TouchableOpacity>
        </ImageBackground>
      </Modal>
      {isConnected && (
        <WebView
          source={{ uri: source }}
          startInLoadingState={true}
          style={{ marginTop: insets.top }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  refreshBtn: {
    marginBottom: "15%",
    alignItems: "center",
    width: "20%",
  },
  refreshIcon: {
    width: 100,
    height: 100,
  },
});
