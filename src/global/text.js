import Colors from './colors';
import {StyleSheet} from 'react-native';
import React from 'react';
import {Text} from 'react-native';

const factory = name => {
  return ({style, children}) => {
    if (!Array.isArray(style)) style = [style];
    return <Text style={[styles.all, styles[name], ...style]}>{children}</Text>;
  };
};

const styles = StyleSheet.create({
  all: {
    color: Colors.textDefault,
    textAlignVertical: 'center',
  },
  h1: {fontSize: 20},
  h2: {fontSize: 18},
  h3: {fontSize: 16},
  h4: {fontSize: 14, textTransform: 'uppercase'},
  strong: {fontSize: 16, fontWeight: 'bold'},
  p: {fontSize: 14},
  small: {fontSize: 12},
});

const H1 = factory('h1');
const H2 = factory('h2');
const H3 = factory('h3');
const H4 = factory('h4');
const Strong = factory('strong');
const P = factory('p');
const Small = factory('small');
export {H1, H2, H3, H4, Strong, P, Small};
