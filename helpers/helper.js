import { formatDistance, subDays, format } from 'date-fns';
// import { bn } from 'date-fns/locale';

export const helper = {
  name: 'helper',
  getDuration(from, to) {
    const date1 = new Date(from);
    const date2 = new Date(to);
    const duration = formatDistance(subDays(date2, 0), date1, {
      addSuffix: true,
    });

    if (duration.includes('minute')) {
      return '1 day';
    }

    return formatDistance(subDays(date2, 0), date1, { addSuffix: true });
  },
  formatDate(val) {
    if (val) {
      return format(new Date(val), 'dd.MM.yyyy');
    }
  },
  checkForm(textInput) {
    if (textInput.trim().length <= 0) {
      return false;
    }

    return true;
  },
};
export default ({ app }, inject) => {
  inject('helper', helper);
};
