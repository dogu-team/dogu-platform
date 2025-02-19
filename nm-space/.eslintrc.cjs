module.exports = {
  root: true,
  extends: [
    'eslint:recommended', //
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,

    /**
     * @note Please set the file explicitly. If you use the glob pattern, you may experience an error while loading tscconfig.
     */
    project: [
      './tsconfig.eslint.json', //
      './projects/dost/tsconfig.json',
      './projects/dost/electron/tsconfig.json',
      './projects/env-generator/tsconfig.json',
      './packages/device-server/tsconfig.json',
      './packages/dogu-agent-core/tsconfig.json',
      './packages/dogu-device-client/configs/tsconfig.dev.json',
      './packages/dost-children/tsconfig.json',
      './packages/host-agent/tsconfig.json',
      './packages/sdk-core/configs/tsconfig.dev.json',
    ],
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  rules: {
    quotes: 'off',
    'no-inner-declarations': 'off',
    '@typescript-eslint/quotes': 'off',
    '@typescript-eslint/prefer-namespace-keyword': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/no-misused-promises': 'error',
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/promise-function-async': 'error',
  },
};
