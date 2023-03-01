import swal from 'sweetalert';

import { SUCCESS, SWALCOLORS } from '../constants.js';

export default {
  methods: {
    sanitizeInput(textInput) {
      const sanitizedInput = textInput.replace(/<[^>]+>/g, '');

      return sanitizedInput;
    },

    SwalOverlayColor(overlay, textColor) {
      setTimeout(function () {
        $('.swal-overlay').css({ 'background-color': SWALCOLORS[overlay] });
        $('.swal-text').css({ color: SWALCOLORS[textColor] });
        $('.swal-button').css({ 'background-color': SWALCOLORS.purple });
      }, 0);
    },
    triggerToast(type) {
      const styles = type === SUCCESS ? 'success' : 'error';

      this.SwalOverlayColor('transparent', 'white');
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
    openModal(taskDescription) {
      this.SwalOverlayColor('greyOverlay', 'black');
      swal(taskDescription, {
        className: 'text-modal',
        iconHtml: '<img src="https://picsum.photos/100/100">',
        showCancelButton: false,
      });
    },
  },
};
