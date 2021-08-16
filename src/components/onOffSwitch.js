import {Pressable, Text, StyleSheet} from 'react-native'
import React from 'react'
import Colors from '../global/colors'

export default function OnOffSwitch({
    onTitle,
    offTitle,
    isOn,
    setIsOn,
}) {
    const toggle = () => setIsOn(isOn => !isOn)
    return <Pressable onPress={toggle} style={style.pressable}>
        <Text style={[style.text, isOn && style.selected]}>{onTitle}</Text>
        <Text style={[style.text, !isOn && style.selected]}>{offTitle}</Text>
    </Pressable>
}

const style = StyleSheet.create({
    pressable: {
        flexDirection: 'row',
        justifyContent: "space-evenly",
        alignItems: "center",
        maxHeight: 35,
        backgroundColor: Colors.cancelGrey,
        borderRadius: 50,
        margin: 5,
    },
    text: {
        height: "100%",
        textAlignVertical: 'center',
        borderRadius: 50,
        paddingHorizontal: 18,
        backgroundColor: Colors.cancelGrey,
    },
    selected: {
        backgroundColor: Colors.acceptGreen,
    }
})