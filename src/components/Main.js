import React, { useState, useEffect } from 'react';
import { Modal, Text, View, Button, ImageBackground, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import NetInfo from '@react-native-community/netinfo';

export const Main = () => {
  const insets = useSafeAreaInsets();
  const [isConnected, setIsConnected] = useState(true); // Assuming initially connected
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    setModalVisible(!isConnected); // Show modal when disconnected
  }, [isConnected]);

  const refreshState = () => {
    if (isConnected) {
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <ImageBackground
          source={require('../../assets/lost-connection.jpg')}
          style={styles.bgContainer}
        >

          <TouchableOpacity
            onPress={refreshState}
            style={styles.refreshBtn}>
            <Image
              style={styles.refreshIcon}
              source={require('../../assets/refresh.png')} />
          </TouchableOpacity>
        </ImageBackground>
      </Modal>
      <WebView
        source={{ uri: 'https://yogabills.herokuapp.com/' }}
        startInLoadingState={true}
        style={{ marginTop: insets.top }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  bgContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  refreshBtn: {
    marginBottom: '15%',
    alignItems: 'center',
    width: '20%'
  },
  refreshIcon: {
    width: 100,
    height: 100
  }
})
