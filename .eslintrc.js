module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    quotes: ['error', 'single', {
      allowTemplateLiterals: true,
    }],
    semi: ['error', 'always'],
    'import/extensions': ['error', 'never'],
    'import/no-unresolved': 'off',
    'class-methods-use-this': 'off',
  },
};
