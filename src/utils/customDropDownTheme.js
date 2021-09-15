// in order to see the changes to have to reload the app
// hot realoading on save didn't seem to work in my case. idk.
// this is here so we can customize the appearance of the dropdown component.
// see foodloggerscreen

import {StyleSheet} from 'react-native';
export const ICONS = {
  // todo input icons, look in icons.js for names of nice icons I chose. @wojtek
  ARROW_DOWN: null,
  ARROW_UP: null,
  TICK: null,
  CLOSE: null,
};

export default StyleSheet.create({
  container: {
    width: '100%',
  },
  // main label - this what we see on collapsed component
  style: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'black',
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  label: {
    flex: 1,
    color: 'black',
  },
  labelContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  arrowIcon: {
    width: 20,
    height: 20,
  },
  tickIcon: {
    width: 20,
    height: 20,
  },
  closeIcon: {
    width: 30,
    height: 30,
  },
  badgeStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'dodgerblue',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  badgeDotStyle: {
    width: 10,
    height: 10,
    borderRadius: 10 / 2,
    marginRight: 8,
    backgroundColor: 'grey',
  },
  badgeSeparator: {
    width: 5,
  },
  listBody: {
    height: '100%',
  },
  listBodyContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  dropDownContainer: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 8,
    borderColor: 'black',
    borderWidth: 1,
    width: '100%',
    overflow: 'hidden',
    zIndex: 1000,
  },
  modalContentContainer: {
    flexGrow: 1,
  },
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    height: 40,
  },
  listItemLabel: {
    flex: 1,
    color: 'black',
  },
  iconContainer: {
    marginRight: 10,
  },
  arrowIconContainer: {
    marginLeft: 10,
  },
  tickIconContainer: {
    marginLeft: 10,
  },
  closeIconContainer: {
    marginLeft: 10,
  },
  listParentLabel: {},
  listChildLabel: {},
  listParentContainer: {},
  listChildContainer: {
    paddingLeft: 40,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  searchTextInput: {
    flexGrow: 1,
    flexShrink: 1,
    margin: 0,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderColor: 'black',
    borderWidth: 1,
    color: 'black',
  },
  itemSeparator: {
    height: 1,
    backgroundColor: 'black',
  },
  flatListContentContainer: {
    flexGrow: 1,
  },
  customItemContainer: {},
  customItemLabel: {
    fontStyle: 'italic',
  },
  listMessageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  listMessageText: {},
  selectedItemContainer: {},
  selectedItemLabel: {},
});
