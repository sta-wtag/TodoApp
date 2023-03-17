import swal from 'sweetalert';

import {
  SUCCESS,
  SWALCOLORS,
  ADD,
  EDIT,
  DELETE,
  SEARCH,
  ERROR,
  COMPLETE,
} from '@/constants.js';

export default {
  methods: {
    sanitizeInput(textInput) {
      const sanitizedInput = textInput.replace(/<[^>]+>/g, '');

      return sanitizedInput;
    },
    toastMessage(type, feature) {
      if (type === SUCCESS) {
        switch (feature) {
          case ADD:
            return this.$t('alert.add.message.success');
          case EDIT:
            return this.$t('alert.edit.message.success');
          case DELETE:
            return this.$t('alert.delete.message.success');
          case SEARCH:
            return this.$t('alert.search.message.success');
          case COMPLETE:
            return this.$t('alert.complete.message.success');
          default:
            this.$t('alert.message.success');
        }
      }

      if (type === ERROR) {
        switch (feature) {
          case ADD:
            return this.$t('alert.add.message.error');
          case EDIT:
            return this.$t('alert.edit.message.error');
          case DELETE:
            return this.$t('alert.delete.message.error');
          case SEARCH:
            return this.$t('alert.search.message.error');
          case COMPLETE:
            return this.$t('alert.complete.message.error');
          default:
            this.$t('alert.message.error');
        }
      }
    },
    SwalOverlayColor(overlay, textColor) {
      setTimeout(function () {
        $('.swal-overlay').css({ 'background-color': SWALCOLORS[overlay] });
        $('.swal-text').css({ color: SWALCOLORS[textColor] });
        $('.swal-button').css({ 'background-color': SWALCOLORS.purple });
      }, 0);
    },
    triggerToast(type, feature) {
      const styles = type === SUCCESS ? 'success' : 'error';

      this.SwalOverlayColor('transparent', 'white');
      swal(
        type === SUCCESS
          ? this.toastMessage(type, feature)
          : this.$t('alert.message.error'),
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
        title: this.$t('alert.task.description'),
        className: 'text-modal',
        iconHtml: '<img src="https://picsum.photos/100/100">',
        buttons: false,
      });
    },
  },
};
