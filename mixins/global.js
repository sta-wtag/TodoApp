import swal from 'sweetalert';

import { SUCCESS, ERROR } from '@/constants.js';
export default {
  methods: {
    sanitizeInput(textInput) {
      const sanitizedInput = textInput.replace(/<[^>]+>/g, '');

      return sanitizedInput;
    },
    triggerToast(type) {
      const styles = type === SUCCESS ? 'success' : 'error';

      console.log(styles);

      swal(
        type === SUCCESS
          ? $nuxt.$t('alert.message.success')
          : $nuxt.$t('alert.message.error'),
        {
          buttons: false,
          className: styles,
          iconHtml: '<img src="https://picsum.photos/100/100">',
          timer: 3000,
        }
      );
    },
  },
};
