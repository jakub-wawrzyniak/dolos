//? maybe lets try to keep them alphabetically?
const darkmode = true;
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
      backgroundDefault: 'white',
      backgroundColorModal: 'rgba(255, 255, 255, 0.5)',
      borderDefault: '#ccc',
      cancelGrey: '#d1d1d1',
      foregroundGrey: '#ededed',
      iconDefault: '#2c2c2c',
      removeRed: '#ff9089',
      textDefault: '#111',
    };

export default Colors;
