module.exports = {
  "root": true,
  "extends": [
    "airbnb",
    "prettier",
    "prettier/react"
  ],
  "plugins": [
    "react",
    "prettier",
    "cypress"
  ],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 2016,
    "sourceType": "module",
    "jsx": true,
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "env": {
    "browser": true,
    "commonjs": true,
    "node": true,
    "es6": true,
    "jest": true,
    "mocha": true,
    "cypress/globals": true
  },
  "settings": {
    "import/resolver": {
      "typescript": {},
      "typescript": {
        "directory": "./"
      }
    }
  },
  "rules": {
    "no-debugger": "warn",
    "no-console": "warn",
    "import/prefer-default-export": "off",
    "react/jsx-filename-extension": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-autofocus": "off",
    "consistent-return": "off",
    "no-underscore-dangle": "off",
    "no-nested-ternary": "off",
    "prefer-const": ["error", {"destructuring": "all"}],
    "no-unused-expressions": ["error", { allowShortCircuit: true }],
    "react/jsx-sort-props": ["error", {
      "callbacksLast": true,
      "shorthandFirst": true,
      "noSortAlphabetically": false,
      "reservedFirst": true,
    }],
    "react/sort-comp": [
      "error", {
        order: [
          'type-annotations',
          'static-methods',
          'lifecycle',
          'everything-else',
          'render'
        ],
      }
    ],
    "prettier/prettier": [
      "error",
      {
        "semi": true,
        "trailingComma": "es5",
        "printWidth": 80,
        "tabWidth": 2,
        "useTabs": false,
        "singleQuote": false,
        "bracketSpacing": false,
        "jsxBracketSameLine": false
      },
    ],
  }
}
