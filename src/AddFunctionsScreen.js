import React, { useState, useCallback ,useEffect} from 'react';
import { View, Text, StyleSheet, PanResponder, Animated, ToastAndroid, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const DraggableItem = ({ item, onDrop }) => {
    const [pan] = useState(new Animated.ValueXY());

    const panResponder = useCallback(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event(
                [null, { dx: pan.x, dy: pan.y }],
                { useNativeDriver: false }
            ),
            onPanResponderRelease: (e, gestureState) => {
                if (gestureState.moveY > DESTINATION_FLATLIST_Y_POSITION) {
                    onDrop(item); // Pass the item to the onDrop function to handle the drop action
                }
                pan.setValue({ x: 0, y: 0 }); // Reset the Animated value after the release
            },
        }),
        [item, onDrop]
    );

    return (
        <Animated.View style={[styles.itemContainer, pan.getLayout()]} {...panResponder.panHandlers}>
            <Text>{item.text}</Text>
        </Animated.View>
    );
};

const DESTINATION_FLATLIST_Y_POSITION = 50; // Adjust this value to fit your layout

const AddFunctionsScreen = () => {

    const [sourceData] = useState([
        { id: '1', text: 'Move X by 10 steps', draggable: true }, // Set 'draggable: true' for the item you want to be draggable
        { id: '2', text: 'Say Hello', draggable: true }, // Other items are not draggable
        { id: '3', text: 'go to random position', draggable: true },

        // Add more items as needed
    ]);
    const navigation = useNavigation();

    const loadDestinationDataFromStorage = async () => {
        try {
            const data = await AsyncStorage.getItem('destinationData');
            if (data) {
                setDestinationData(JSON.parse(data));
            }
        } catch (error) {
            console.error('Error loading destinationData from AsyncStorage:', error);
        }
    };

    useEffect(() => {
        // Load destinationData from AsyncStorage when the component mounts
        loadDestinationDataFromStorage();
    }, []);

    const handleDeleteItem = async (itemId) => {
        try {
          // Remove the item from destinationData state
          setDestinationData((prevData) =>
            prevData.filter((item) => item.uniqueId !== itemId)
          );
      
          // Update the AsyncStorage with the updated data
          await AsyncStorage.setItem(
            'destinationData',
            JSON.stringify(destinationData.filter((item) => item.uniqueId !== itemId))
          );
          console.log('destinationData removed from AsyncStorage.');
        } catch (error) {
          console.error('Error deleting destinationData from AsyncStorage:', error);
        }
      };
      
    const generateUniqueID = () => {
        return '_' + Math.random().toString(36).substr(2, 9);
    };

    const [destinationData, setDestinationData] = useState([]);
    console.log(destinationData)
    const draggableData = sourceData.filter((item) => item.draggable);

    const onDropItem = useCallback((item) => {
        if (destinationData.length >= 10) {
            ToastAndroid.showWithGravityAndOffset(
                'You can add upto 10 action at a time',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50,
            );
            return;

        }
        const newItem = { ...item, uniqueId: generateUniqueID() };
        setDestinationData((prevDestinationData) => [...prevDestinationData, newItem]);
        AsyncStorage.setItem('destinationData', JSON.stringify([...destinationData, newItem]))
            .then(() => {
                console.log('destinationData saved to AsyncStorage.');
            })
            .catch((error) => {
                console.error('Error saving destinationData to AsyncStorage:', error);
            });
    }, [destinationData]);

    return (
        <View style={styles.container}>
            <View style={styles.list}>
                {draggableData.map((item) => (
                    <DraggableItem key={item.id} item={item} onDrop={onDropItem} />
                ))}
            </View>
            <View style={styles.list}>
                {destinationData.map((item) => (
                    <View style={styles.itemContainer} key={item.uniqueId}>
                        <TouchableOpacity onPress={() => handleDeleteItem(item.uniqueId)} style={styles.deleteButton}>
                            <Ionicons name="md-trash" size={24} color="red" />
                        </TouchableOpacity>
                        <Text>{item.text}</Text>
                    </View>

                ))}
                <Button
                    title="Done"
                    // onPress={() =>(navigation.navigate("Home",{destinationData:destinationData}))}
                    onPress={() => {
                        navigation.navigate("Home",{
                          destinationData, // Pass destinationData as a parameter
                        });
                      }}
                    containerStyle={{
                        width: 100,
                        marginHorizontal: 50,
                        marginVertical: 10,
                        position: "absolute",
                        bottom: 10
                    }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 40,
        paddingHorizontal: 20
    },
    list: {
        flex: 1,
        height: '100%',
        borderColor: 'black',
        borderWidth: 1
    },
    itemContainer: {
        padding: 16,
        backgroundColor: '#fefefe',
        margin: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    deleteButton: {
        position: 'absolute',
        right: -7,
        top: -7

    }
});

export default AddFunctionsScreen;
