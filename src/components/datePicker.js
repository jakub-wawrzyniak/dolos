import React, {Fragment, useState} from 'react';
import {Text, Pressable, View, StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

// ! if dialog box were to open twice: https://github.com/react-native-datetimepicker/datetimepicker/issues/54#issuecomment-552951685

function TimePicker({date, setDate}) {
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  return (
    //? why fragment and not just view? @wojtek
    <Fragment>
      {isPickerVisible && (
        <DateTimePicker
          mode="time"
          display="clock"
          value={date}
          onChange={(event, newDate) => {
            setIsPickerVisible(false); // * THIS HAS TO BE BEFORE setDate
            newDate.setSeconds(0, 0); // so we set to only full minutes
            setDate(newDate || date); // so it doesn't crash on cancel
          }}
        />
      )}
      <Pressable onPress={() => setIsPickerVisible(true)}>
        <Text style={style.textPicker}>{date.toString().slice(16, 21)}</Text>
      </Pressable>
    </Fragment>
  );
}

function DayPicker({date, setDate}) {
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  return (
    <Fragment>
      {isPickerVisible && (
        <DateTimePicker
          mode="date"
          display="calendar"
          value={date}
          onChange={(event, newDate) => {
            setIsPickerVisible(false); // * THIS HAS TO BE BEFORE setDate
            // otherwise, the dialog opens twice (like in the link on the top)
            setDate(newDate || date); // so it doesn't crash on cancel
          }}
        />
      )}
      <Pressable onPress={() => setIsPickerVisible(true)}>
        <Text style={style.textPicker}>{date.toString().slice(4, 10)}</Text>
      </Pressable>
    </Fragment>
  );
}

export default function DatePicker({date, setDate}) {
  return (
    <View style={style.view}>
      <Text>Due by</Text>
      <DayPicker date={date} setDate={setDate} />
      <Text>at</Text>
      <TimePicker date={date} setDate={setDate} />
    </View>
  );
}

const style = StyleSheet.create({
  view: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 20,
  },

  textPicker: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
