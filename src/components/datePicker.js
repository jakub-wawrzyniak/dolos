import React, {Fragment, useState} from 'react';
import {Pressable, View, StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {formatDate, formatTime} from '../utils/dateFormatter';
import {P, Strong} from '../global/text';
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
            if (newDate) newDate.setSeconds(0, 0);
            setDate(newDate || date); // so it doesn't crash on cancel
          }}
        />
      )}
      <Pressable onPress={() => setIsPickerVisible(true)}>
        <Strong style={style.textPicker}>{formatTime(date)}</Strong>
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
        <Strong style={style.textPicker}>{formatDate(date)}</Strong>
      </Pressable>
    </Fragment>
  );
}

export default function DatePicker({date, setDate}) {
  return (
    <View style={style.view}>
      <P>Due by</P>
      <DayPicker date={date} setDate={setDate} />
      <P>at</P>
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
});
