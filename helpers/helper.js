import { formatDistance, subDays, format } from 'date-fns';
import { bn } from 'date-fns/locale';

const helper = {
  name: 'helper',
  getDuration(from, to) {
    const date1 = new Date(from);
    const date2 = new Date(to);

    return formatDistance(subDays(date2, 0), date1);
  },
  formatDate(val) {
    if (val) {
      return format(new Date(val), 'dd.MM.yyyy');
    }
  },
};
export default ({ app }, inject) => {
  inject('helper', helper);
};
