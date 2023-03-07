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
      if (type === SUCCESS && feature === ADD) {
        return $nuxt.$t('alert.add.message.success');
      } else if (type === SUCCESS && feature === EDIT) {
        return $nuxt.$t('alert.edit.message.success');
      } else if (type === SUCCESS && feature === DELETE) {
        return $nuxt.$t('alert.delete.message.success');
      } else if (type === SUCCESS && feature === SEARCH) {
        return $nuxt.$t('alert.search.message.success');
      } else if (type === SUCCESS && feature === COMPLETE) {
        return $nuxt.$t('alert.complete.message.success');
      } else {
        $nuxt.$t('alert.message.success');
      }

      if (type === ERROR && feature === ADD) {
        return $nuxt.$t('alert.add.message.error');
      } else if (type === ERROR && feature === EDIT) {
        return $nuxt.$t('alert.edit.message.error');
      } else if (type === ERROR && feature === DELETE) {
        return $nuxt.$t('alert.delete.message.error');
      } else if (type === ERROR && feature === SEARCH) {
        return $nuxt.$t('alert.search.message.error');
      } else if (type === ERROR && feature === COMPLETE) {
        return $nuxt.$t('alert.complete.message.error');
      } else {
        $nuxt.$t('alert.message.error');
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
        title: 'Task description',
        className: 'text-modal',
        iconHtml: '<img src="https://picsum.photos/100/100">',
        showCancelButton: false,
      });
    },
  },
};
