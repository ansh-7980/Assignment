import React, { useCallback, useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated ,FlatList,Image,Button} from 'react-native'
import { CardComponent, CardComponentBlankformoving } from '../Components/CardComponent'
import { MovingImage } from '../Components/MovingImage'
import { StatusBar } from 'expo-status-bar'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons';
import ImageSelectionModal from '../Components/ImageSelectionModal'
const HomeScreen = ({ route }) => {
  const destinationData = route.params
  // console.log("fsdf",destinationData)
  const navigation = useNavigation();
  const [XValue, setXValue] = useState(0)
  const [YValue, setYValue] = useState(0)
  const [hello, setHello] = useState(false)
  const [text, setText] = useState("")
  const [imageSource, setImageSource] = useState(null);
  const [resultedArray, setResultedArray] = useState([])
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const handleDeleteImage = (index) => {
    setSelectedImages((prevSelectedImages) => {
      const updatedImages = [...prevSelectedImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };
  const handleImageSelect = (image) => {
    setSelectedImages((prevSelectedImages) => [
      ...prevSelectedImages,
      { imageSource: image, xPos: XValue + prevSelectedImages.length , yPos: YValue + prevSelectedImages.length },
    ]);
    setImageSource(null);
  };
  
  
  
  const handleReset = () => {
    setXValue(126);
    setYValue(85);
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
    console.log('value', xvalue, yvalue);
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
        const newX = XValue;
        const newY = YValue + 90;
        setXValue(newX);
        setYValue(newY);
        console.log("go to random position executed");
      }
      // Add a delay between each action
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second before executing the next action
    }
  };
  
  
  return (
    <>
      <View style={styles.container}>
        {/* <Text>hello</Text> */}
        <TouchableOpacity onPress={handleReset} style={{ position: 'absolute', top: 10, right: 10, alignSelf: 'flex-start' }}>
          <AntDesign name="reload1" size={40} color="black" />
        </TouchableOpacity>
        {selectedImages.map((item, index) => (
          <MovingImage
          key={index}
          data={handleData}
          xPos={item.xPos}
          yPos={item.yPos}
          sayHello={hello}
          imageSource={item.imageSource}
          />
          ))}

        <TouchableOpacity onPress={() => { handleActions() }} style={{ position: 'absolute', bottom: 10, right: 10, alignSelf: "flex-end" }}>

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
        <FlatList
          data={selectedImages}
          horizontal
          renderItem={({ item, index }) => (
            <View style={{ alignItems: "center" }}>
              <Image source={item.imageSource} style={{ width: 120, height: 120, margin: 5 }} />
              {/* Delete Icon */}
              <Button title='Add actions' onPress={()=>navigation.navigate("AddFunction")}/>
              <TouchableOpacity style={{ position: 'absolute', top: 5, right:1,backgroundColor:"white" }} onPress={() => handleDeleteImage(index)}>
                <AntDesign name="close" size={30} color="red" />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />

        {/* Modal to select an image */}
        {/* ... (other JSX code) */}
        
        {selectedImages.length < 2 ? (
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <View style={styles.blackButton}>
              <AntDesign name="plus" size={40} color="black" />
            </View>
          </TouchableOpacity>
        ) : (
          null
        )}
      </View>
      <ImageSelectionModal visible={modalVisible} onSelectImage={handleImageSelect} onClose={() => setModalVisible(false)} />
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
  blackButton: {
    // padding:15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width:120,
    backgroundColor:"white",
    elevation:5,
    height:160,
    marginTop:"3%"
  },
  whitetext: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});