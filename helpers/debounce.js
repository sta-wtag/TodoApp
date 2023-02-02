const debounce = (func, timeout) => {
  let timer;

  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      // if (!timer) {
      func.apply(this);
      // }

      timer = undefined;
    }, timeout);
  };
};

export default debounce;
