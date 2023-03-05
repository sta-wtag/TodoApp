import { formatDistance, subDays, format } from 'date-fns';

function getDuration(from, to) {
  const date1 = new Date(from);
  const date2 = new Date(to);
  const duration = formatDistance(subDays(date2, 0), date1, {
    addSuffix: true,
  });

  if (duration.includes('minute')) {
    return '1 day';
  }

  return formatDistance(subDays(date2, 0), date1, { addSuffix: true });
}

function formatDate(val) {
  return val ? format(new Date(val), 'dd.MM.yyyy') : undefined;
}

function checkForm(textInput) {
  if (textInput.trim().length <= 0) {
    return false;
  }

  return true;
}

export { getDuration, formatDate, checkForm };
