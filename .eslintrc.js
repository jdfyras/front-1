// Using ES module export
export default {
    env: {
        browser: true,
        commonjs: true,
        es2021: true
    },
    extends: ['standard', 'prettier'],
    overrides: [],
    parserOptions: {
        ecmaVersion: 'latest'
    },
    rules: {
        camelcase: 'off',
        'no-console': 'off',
        'consistent-return': 'off',
        'no-process-exit': 'off',
        'no-param-reassign': 'off',
        'no-return-await': 'off',
        'no-underscore-dangle': 'off',
        'class-methods-use-this': 'off',
        'no-use-before-define': [
            'error',
            {
                functions: true,
                classes: true,
                variables: true
            }
        ],
        'prefer-const': 'off',
        'no-unused-vars': ['error'],
        semi: 'off'
    }
};
