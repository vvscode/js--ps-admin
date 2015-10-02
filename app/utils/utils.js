export default {
  humanize: function (str) {
    return ('' + str).split('_').join(' ');
  }
};
