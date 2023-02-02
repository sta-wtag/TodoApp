import { formatDistance, format } from 'date-fns';
const helper = {
  name: 'helper',
  getDuration(from, to) {
    const date1 = new Date(from);
    const date2 = new Date(to);

    return formatDistance(date2, date1, { addSuffix: true });
  },
  formatDate(val) {
    return format(new Date(val), 'dd.MM.yyyy');
  },
  debounce(func, timeout = 300) {
    let timer;

    console.log(func);

    return () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this);
      }, timeout);
    };
  },
};
export default ({ app }, inject) => {
  inject('helper', helper);
};
