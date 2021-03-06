module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'import/first': 'off',
    'import/prefer-default-export': 'off',
    'no-use-before-define': 'off',
    'vuejs-accessibility/click-events-have-key-events': 'off',
    'no-shadow': 'off',
    'no-undef': 'off',
    'no-alert': 'off',
    'vuejs-accessibility/label-has-for': 'off',
  },
  ignorePatterns: ['ckeditor5'],
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
