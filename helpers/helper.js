import { formatDistance, format } from 'date-fns';
const helper = {
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
