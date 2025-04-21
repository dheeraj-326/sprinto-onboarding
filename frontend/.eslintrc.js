module.exports = {
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
    ],
    plugins: ['react'],
    parserOptions: {
      ecmaVersion: 2015,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
    rules: {
      // Optional, add JSX-specific rules
      'react/no-unescaped-entities': 'warn',
      'react/no-invalid-html-attribute': 'error',
    },
    extends: ['plugin:react/recommended', 'prettier'],
    settings: {
      react: {
        version: 'detect',
      },
    },
  };