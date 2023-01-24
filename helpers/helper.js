import { formatDistance } from 'date-fns';
const helper = {
  name: 'helper',
  getDuration(from, to) {
    const date1 = new Date(from);
    const date2 = new Date(to);

    console.log(date1);
    console.log(date2);
    console.log(formatDistance(date2, date1, { addSuffix: true }));

    return formatDistance(date2, date1, { addSuffix: true });
  },
  formatDate(val) {
    const date = new Date(val);
    const day = date.getDay();
    const month = date.getMonth();
    const year = date.getFullYear();

    return day + '.' + month + '.' + year;
  },
};
export default ({ app }, inject) => {
  inject('helper', helper);
};
