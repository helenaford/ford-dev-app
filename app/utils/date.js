import moment from 'moment';

moment.updateLocale('en', {
  relativeTime: {
    s: '%ds',
    m: '1m',
    mm: '%dm',
    h: '1h',
    hh: '%dh',
    d: '1d',
    dd: '%dd',
    M: '1m',
    MM: '%dm',
    y: '1y',
    yy: '%dy',
  },
});

export const timeLeftInSeconds = timestamp => {
  const timeLeft =
    timestamp -
    moment()
      .utc()
      .valueOf();

  return timeLeft.valueOf() / 1000;
};

export const displayTime = timestamp => {
  if (!timestamp) return '';
  return moment(timestamp.millis || timestamp).fromNow(true);
};
