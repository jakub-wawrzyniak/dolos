import {StyleSheet} from 'react-native';
import Colors from './colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingBottom: 15,
    paddingTop: 0,
    backgroundColor: Colors.backgroundDefault,
  },
  textDefault: {color: Colors.textDefault, fontSize: 12},
  textTitle: {color: Colors.textDefault, fontSize: 14, fontWeight: 'bold'},
  modalBackgroundTransparent: {
    // opacity is inherited so this is how we make it independent
    backgroundColor: Colors.backgroundColorModal,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
