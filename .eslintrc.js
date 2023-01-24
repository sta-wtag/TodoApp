module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  extends: [
    '@nuxtjs',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
  ],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true,
        semi: true,
      },
    ],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      { blankLine: 'always', prev: ['if', 'for', 'import'], next: '*' },
      { blankLine: 'always', prev: '*', next: ['if', 'for', 'export'] },
      {
        blankLine: 'any',
        prev: ['const', 'let', 'var', 'import', 'export'],
        next: ['const', 'let', 'var', 'import', 'export'],
      },
    ],
    'newline-before-return': 'error',
    'vue/no-v-html': 'off',
    'no-undef': 'off',
    'no-console': 'off',
    'no-unused-vars': 'error',
    'no-useless-catch': 'off',
    'vue/no-unused-components': [
      'error',
      {
        ignoreWhenBindingPresent: true,
      },
    ],
    quotes: [2, 'single', { avoidEscape: true, allowTemplateLiterals: true }],
  },
};
