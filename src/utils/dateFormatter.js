const formatDate = date => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  return `${months[date.getMonth()]} ${date.getDate()}`;
};

const formatTime = date => {
  const [h, min] = [date.getHours(), date.getMinutes()];
  const ampm = 0 < h <= 12 ? 'AM' : 'PM';
  const minutes = min < 10 ? `0${min}` : `${min}`;
  const hours = h == 0 ? 12 : h < 13 ? h : h - 12;
  return `${hours}:${minutes} ${ampm}`;
};

export {formatDate, formatTime};
