import React, {Fragment, useState} from 'react'
import {Text, Pressable, View, StyleSheet, Modal} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';

function TimePicker({date, setDate}) {
    const [isPickerVisible, setIsPickerVisible] = useState(false)
    return <Fragment>
        <Modal
            visible={isPickerVisible}
            onRequestClose={()=>{setIsPickerVisible(false)}}
        >
            <DateTimePicker
                mode="time"
                display="clock"
                value={date}
                onChange={(event, date)=>{
                    setDate(date)
                    setIsPickerVisible(false)
                }}
            />
        </Modal>
        <Pressable onPress={()=>setIsPickerVisible(true)}>
            <Text style={style.textPicker}>{date.toString().slice(16, 21)}</Text>
        </Pressable>
    </Fragment>
}

function DayPicker({date, setDate}) {
    const [isPickerVisible, setIsPickerVisible] = useState(false)    
    return <Fragment>
        <Modal
            visible={isPickerVisible}
            onRequestClose={()=>{setIsPickerVisible(false)}}
        >
            <DateTimePicker
                mode="date"
                display="calendar"
                value={date}
                onChange={(event, date)=>{
                    setDate(date)
                    setIsPickerVisible(false)
                }}
            />
        </Modal>
        <Pressable onPress={()=>setIsPickerVisible(true)}>
            <Text style={style.textPicker}>{date.toString().slice(4, 10)}</Text>
        </Pressable>
    </Fragment>
}

export default function DatePicker({date, setDate}) {
    return <View style={style.view}>
        <Text>Due by</Text>
        <DayPicker date={date} setDate={setDate}/>
        <Text>at</Text>
        <TimePicker date={date} setDate={setDate}/>
    </View>
}

const style = StyleSheet.create({
    view: {
        flexDirection: 'row',
        justifyContent: "space-around",
        alignItems: 'center',
        marginVertical: 20,
    },

    textPicker: {
        fontSize: 16,
        fontWeight: 'bold'
    }
})