import { formatDistance, subDays, format } from 'date-fns';

export const helper = {
  name: 'helper',
  getDuration(from, to) {
    const date1 = new Date(from);
    const date2 = new Date(to);
    let duration = formatDistance(subDays(date2, 0), date1, {
      addSuffix: false,
    });

    if (duration.includes('minute')) {
      return '1 day';
    }

    if (duration.includes('about')) {
      duration = duration.replace('about', '');
    }

    return duration;
  },
  formatDate(val) {
    return val ? format(new Date(val), 'dd.MM.yyyy') : undefined;
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
