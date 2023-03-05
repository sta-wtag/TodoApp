export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Todo App',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/todo.svg' }],
    script: [
      {
        src: 'https://code.jquery.com/jquery-3.3.1.slim.min.js',
        type: 'text/javascript',
      },
      {
        src: 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js',
        type: 'text/javascript',
      },
      {
        src: 'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js',
        type: 'text/javascript',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~assets/css/main.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/helpers/helper.js', '~/helpers/debounce.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxtjs/style-resources'],
  styleResources: {
    scss: ['~assets/scss/variables.scss', '~assets/scss/mixins.scss'],
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['nuxt-i18n', 'lodash', 'nuxt-svg-loader', 'sweetalert'],
  i18n: {
    locales: [
      {
        code: 'en',
        file: 'en-Us.json',
      },
      {
        code: 'bn',
        file: 'bn-BN.json',
      },
    ],
    lazy: true,
    langDir: 'lang/',
    defaultLocale: 'en',
    strategy: 'no_prefix',
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  env: {
    BASE_URL: process.env.SUPABASE_URL,
    KEY: process.env.SUPABASE_KEY,
  },
};
