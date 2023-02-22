export default {
  methods: {
    sanitizeInput(textInput) {
      const sanitizedInput = textInput.replace(/<[^>]+>/g, '');

      console.log(sanitizedInput);

      return sanitizedInput;
    },
  },
};
