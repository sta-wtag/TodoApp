const debounce = (func, timeout) => {
  let timer;

  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this);

      timer = undefined;
    }, timeout);
  };
};

export default debounce;
