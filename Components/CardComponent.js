import { View, Text, TouchableOpacity, Image ,StyleSheet} from 'react-native'
import React from 'react'
import { Button, Card } from '@rneui/themed';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
export const CardComponent = (props) => {
  const { onPress, width = "100%", height = "100%",title="Add Actions",bg="blue" ,marginTop="5%"} = props;
  const navigation = useNavigation();
  return (
    <Card >
      <View style={{ position: "relative", alignItems: "center", }}>
        <Image
          style={{ width:100, height:100 }}
          resizeMode="contain"
          source={require("../assets/cartoon.png")}
        />
      <TouchableOpacity onPress={onPress}>
      <View style={styles.blackButton} width={width}  backgroundColor={bg} marginTop={marginTop}>
        <Text style={styles.whitetext}>{title}</Text>
      </View>
    </TouchableOpacity>
      </View>
    </Card>
  )
}

export const CardComponentBlankformoving = (props) => {
  const { onPress, width = "100%", height = "100%",title="Add Actions",bg="blue" ,marginTop="5%"} = props;
  return (
    <Card containerStyle={{width:"40%",justifyContent:"center"}}>
    <TouchableOpacity onPress={onPress} style={{alignItems:"center"}} >
        <AntDesign name="plus" size={40} color="black" />
    </TouchableOpacity>
    </Card>
  )
}

const styles = StyleSheet.create({
  blackButton: {
    padding:15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
  },
  whitetext: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
})
