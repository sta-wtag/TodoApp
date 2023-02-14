import { formatDistance, format } from 'date-fns';
export const helper = {
  name: 'helper',
  getDuration(from, to) {
    const date1 = new Date(from);
    const date2 = new Date(to);

    return formatDistance(date2, date1, { addSuffix: true });
  },
  formatDate(val) {
    if (val) {
      return format(new Date(val), 'dd.MM.yyyy');
    }
  },
};
// export default ({ app }, inject) => {
//   inject('helper', helper);
// };
