const timeUtil = (() => {
  return {
    getTimeFromDuration,
  }

  function getTimeFromDuration(duration) {
    let date = new Date(null);
    date.setSeconds(duration);
    return date.toISOString().substr(11, 8);
  }
})();

export default timeUtil;