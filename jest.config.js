
  module.exports = {
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/$1',
      '^~/(.*)$': '<rootDir>/$1',
      '^vue$': 'vue/dist/vue.common.js'
    },
    moduleFileExtensions: [
      'ts', // if using TypeScript
      'js',
      'vue',
      'json'
    ],
    transform: { // if using TypeScript
      '^.+\\.js$': 'babel-jest',
      '.*\\.(vue)$': 'vue-jest'
    },
    collectCoverage: true,
    collectCoverageFrom: [
      '<rootDir>/components/**/*.vue',
      '<rootDir>/pages/**/*.vue'
    ],
    transformIgnorePatterns: ['<rootDir>/node_modulees/vue-i18n'],
    testEnvironment:'jsdom'
}
