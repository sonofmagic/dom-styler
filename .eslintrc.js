function getJestGlobals (flag = true) {
  return {
    afterAll: flag,
    afterEach: flag,
    beforeAll: flag,
    beforeEach: flag,
    describe: flag,
    expect: flag,
    fit: flag,
    it: flag,
    jest: flag,
    test: flag,
    xdescribe: flag,
    xit: flag,
    xtest: flag
  }
}

module.exports = {
  root: false,
  env: {
    // https://eslint.bootcss.com/docs/user-guide/configuring
    es2021: true,
    browser: true
  },
  extends: [
    'standard'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
  },
  globals: {
    ...getJestGlobals()
  }
}
