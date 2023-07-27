import React, { useCallback, useEffect, useState } from 'react'
import { View, Text,StyleSheet, TouchableOpacity ,Dimensions, Animated} from 'react-native'
import { CardComponent, CardComponentBlank } from '../Components/CardComponent'
import { MovingImage } from '../Components/MovingImage'
import { StatusBar } from 'expo-status-bar'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons';
const HomeScreen = ({route}) => {
    const destinationData = route.params
    // console.log("fsdf",destinationData)
    const navigation = useNavigation();
    const [XValue,setXValue] = useState(0)
    const [YValue,setYValue] = useState(0)
    const [hello, setHello] = useState(false)
    const [text,setText] = useState("")
    const [resultedArray,setResultedArray] = useState([])
    const handleReset = () => {
        setXValue(132);
        setYValue(102);
      };
    const handleFocusEffect = useCallback(() => {
        if (destinationData) {
          setResultedArray(destinationData.destinationData);
        }
      }, [destinationData]); // Pass the dependencies in the array
    
      useEffect(() => {
        // Attach the handleFocusEffect function to the focus event
        const unsubscribe = navigation.addListener('focus', handleFocusEffect);
    
        // Clean up the event listener when the component is unmounted
        return () => unsubscribe();
      }, [handleFocusEffect]);

    let handleData = (xvalue, yvalue) => {
        console.log('value',xvalue, yvalue);
        setXValue(xvalue)
        setYValue(yvalue)
    }
    const handleActions = async () => {
      for (const item of resultedArray) {
        if (item.text === 'Move X by 10 steps') {
          // Code for moving X value
          const newX = XValue + 10;
          const newY = YValue;
          setXValue(newX);
          setYValue(newY);
          console.log('Move X by 10 steps executed');
        } else if (item.text === 'Say Hello') {
          // Code for saying hello
          setHello(true);
          console.log('Say Hello executed');
          await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait for 2 seconds
          setHello(false);
        } else if (item.text === 'go to random position') {
          // Code for going to a random position
          const newX = XValue ;
          const newY = YValue+90;
          setXValue(newX);
          setYValue(newY);
          console.log("helio")
        }
       
      }
    };
    

  return (
    <>
      <View style={styles.container}>
        {/* <Text>hello</Text> */}
        <TouchableOpacity onPress={handleReset} style={{ position: 'absolute', top: 10, right: 10, alignSelf: 'flex-start' }}>
          <AntDesign name="reload1" size={40} color="black" />
        </TouchableOpacity>
        <MovingImage data={handleData} xPos={XValue} yPos={YValue} sayHello={hello} />

        <TouchableOpacity onPress={()=>{handleActions()}} style={{position:'absolute', bottom:10 ,right:10,alignSelf:"flex-end"}}>

        <AntDesign name="play" size={40} color="black" />
        </TouchableOpacity>
        <StatusBar />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: '4%', marginTop: '4%', height: '10%' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '25%', alignItems: 'center' }}>
          <Text>Sprit</Text>
          <Text style={{ backgroundColor: 'white', elevation: 5, marginVertical: '2%', marginHorizontal: '4%', borderRadius: 10, padding: '5%' }}>Rabbit</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '25%', alignItems: 'center' }}>
          <Text>X</Text>
          <Text style={{ backgroundColor: 'white', elevation: 5, marginVertical: '2%', marginHorizontal: '4%', borderRadius: 10, padding: '5%' }}>{Math.floor(XValue)}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '25%', alignItems: 'center' }}>
          <Text>Y</Text>
          <Text style={{ backgroundColor: 'white', elevation: 5, marginVertical: '2%', marginHorizontal: '4%', borderRadius: 10, padding: '5%' }}>{Math.floor(YValue)}</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row' }}>
        {/* Display the moving image */}

        {/* You can add other components here */}
         <CardComponent onPress={()=>navigation.navigate("AddFunction")}/>
        <CardComponentBlank onPress={()=>navigation.navigate("SpritAdd")} /> 
      </View>
      </>
  )
}

export default HomeScreen
const styles = StyleSheet.create({
    container: {
      marginTop: '10%',
      backgroundColor: '#fff',
      height: '50%',
    },
    image: {
      width: 100,
      height: 100,
    },
  });