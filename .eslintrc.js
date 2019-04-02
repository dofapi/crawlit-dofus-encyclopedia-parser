module.exports = {
    'env': {
        'es6': true,
        'node': true,
        'mocha': true
    },
    'extends': 'eslint:recommended',
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    'parserOptions': {
        'ecmaVersion': 2018,
        'sourceType': 'module'
    },
    'rules': {
        'indent': [
            'error',
            'tab'
        ],
        'linebreak-style': [
            'error',
            'windows'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ],
        'no-control-regex': 'off',
        'no-console': 'off',
        'no-unused-vars': 'off',
        'no-var': 1,
        "prefer-const": ["error", {
            "destructuring": "any",
            "ignoreReadBeforeAssign": false
        }],
        "spaced-comment": ["error", "always", {
            "line": {
                "markers": ["/"],
                "exceptions": ["-", "+"]
            },
            "block": {
                "markers": ["!"],
                "exceptions": ["*"],
                "balanced": true
            }
        }]
    }
};