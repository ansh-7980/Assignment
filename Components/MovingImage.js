import React, { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Animated, PanResponder } from 'react-native';

export const MovingImage = ({ data, xPos, yPos, sayHello }) => {
    // console.log(typeof data);
    
    const position = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
    const panResponder = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (event, gesture) => {
          Animated.event([null, { dx: position.x, dy: position.y }], {
            useNativeDriver: false,
          })(event, gesture);
  
          // Update state with the latest x and y positions
          
          data(position.x._value, position.y._value)
        },
        onPanResponderRelease: () => {
          // You can add any additional logic here for when the user releases the image
        },
      })
    ).current;
  
    useEffect(() => {
        // When the xPos and yPos props change, update the animated position accordingly
        position.setValue({ x: xPos, y: yPos });
        
      }, [xPos, yPos,sayHello]);
    return (
        <Animated.View
        style={[
          styles.container,
          {
            transform: [{ translateX: position.x }, { translateY: position.y }],
          },
        ]}
        {...panResponder.panHandlers}
      >
        <Animated.Image
          source={require('./../assets/cartoon.png')}
          style={styles.image}
        />
          {sayHello && <Text style={{marginLeft:-30, marginTop:10,}}>Hello!!!</Text>}
      </Animated.View>
      );
    };
    
    const styles = StyleSheet.create({
        container: {
            flex:1,
            flexDirection: 'row',
          marginTop: '10%',
          height: '50%',
        },
        image: {
          width: 100,
          height: 100,
        },
      });