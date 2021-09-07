export const darkmode = false;
const Colors = darkmode
  ? {
      isDark: true,
      acceptGreen: '#AB6516',
      backgroundDefault: '#191919',
      backgroundColorModal: 'rgba(0, 0, 0, 0.7)',
      borderDefault: '#777',
      cancelGrey: '#393939',
      foregroundGrey: '#393939',
      iconDefault: '#2c2c2c',
      removeRed: '#ff9089',
      textDefault: '#eee',
    }
  : {
      isDark: false,
      acceptGreen: '#ffb55e',
      backgroundDefault: '#ffffff',
      backgroundColorModal: 'rgba(255, 255, 255, 0.5)',
      borderDefault: '#ccc',
      cancelGrey: '#d1d1d1',
      foregroundGrey: '#ededed',
      iconDefault: '#2c2c2c',
      removeRed: '#ff9089',
      textDefault: '#111',
    };

// if we decide to use this instead we have to make changes to app.js
const _Colors = {
  acceptGreen: darkmode ? '#AB6516' : '#ffb55e',
  backgroundDefault: darkmode ? '#191919' : '#ffffff',
  backgroundColorModal: darkmode
    ? 'rgba(0, 0, 0, 0.7)'
    : 'rgba(255, 255, 255, 0.5)',
  borderDefault: darkmode ? '#777' : '#ccc',
  cancelGrey: darkmode ? '#393939' : '#d1d1d1',
  foregroundGrey: darkmode ? '#393939' : '#ededed',
  iconDefault: darkmode ? '#2c2c2c' : '#2c2c2c',
  removeRed: darkmode ? '#ff9089' : '#ff9089',
  textDefault: darkmode ? '#eee' : '#111',
};

export default Colors;
