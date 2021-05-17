module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es2021': true
  },
  'extends': 'eslint:recommended',
  'parserOptions': {
    'ecmaVersion': 12
  },
  'ignorePatterns': ['js/*.min.js'],
  'rules': {
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'no-multi-spaces': 'error',
    'comma-spacing': ['error', { 'before': false, 'after': true }],
    'implicit-arrow-linebreak': ['error', 'beside'],
  }
};
