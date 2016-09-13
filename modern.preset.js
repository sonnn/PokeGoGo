module.exports = [
  "babel-plugin-transform-decorators-legacy", // extra
  // stage 0,1,2,3,4
  "babel-plugin-transform-exponentiation-operator", // 4
  "babel-plugin-transform-async-to-generator", // 3
  "babel-plugin-transform-object-rest-spread", // 2
  "babel-plugin-transform-class-constructor-call", // 1
  "babel-plugin-transform-class-properties", // 1
  "babel-plugin-transform-decorators", // 1
  "babel-plugin-transform-export-extensions", // 1
  "babel-plugin-transform-do-expressions",
  "babel-plugin-transform-function-bind",
  // react
  "babel-plugin-transform-react-jsx",
  "babel-plugin-transform-flow-strip-types",
  "babel-plugin-syntax-flow",
  "babel-plugin-syntax-jsx",
  "babel-plugin-transform-react-display-name",
  // es2015
  // "babel-plugin-transform-es2015-template-literals", // chrome 41
  // "babel-plugin-transform-es2015-literals", // chrome 41
  // "babel-plugin-transform-es2015-function-name", // chrome 52
  "babel-plugin-transform-es2015-arrow-functions", // chrome 49
  // "babel-plugin-transform-es2015-block-scoped-functions", // chrome 41
  // "babel-plugin-transform-es2015-classes", // chrome 49
  // "babel-plugin-transform-es2015-object-super", // chrome 49
  // "babel-plugin-transform-es2015-shorthand-properties", // chrome 43
  "babel-plugin-transform-es2015-duplicate-keys",
  // "babel-plugin-transform-es2015-computed-properties", // chrome 44
  // "babel-plugin-transform-es2015-for-of", // chrome 51
  // "babel-plugin-transform-es2015-sticky-regex", // chrome 49
  // "babel-plugin-transform-es2015-unicode-regex", // chrome 51
  "babel-plugin-check-es2015-constants",
  // "babel-plugin-transform-es2015-spread", // chrome 46
  // "babel-plugin-transform-es2015-parameters", // chrome 47
  // "babel-plugin-transform-es2015-destructuring", // chrome 52
  // "babel-plugin-transform-es2015-block-scoping", // chrome 49
  // "babel-plugin-transform-es2015-typeof-symbol", // chrome 38
  "babel-plugin-transform-es2015-modules-commonjs",
  // [require.resolve("babel-plugin-transform-regenerator"), { async: false, asyncGenerators: false }], // chrome 51
];
