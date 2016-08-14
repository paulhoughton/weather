module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'fixture'],
    files: [
      "node_modules/systemjs/dist/system.js",
      "node_modules/angular/angular.js",
      "node_modules/angular-mocks/angular-mocks.js",
      "node_modules/angular-ui-router/release/angular-ui-router.js",
      "bundle.js",
      "bootstrap.js",
      "tests/*"
    ],
    exclude: [
    ],
    preprocessors: {
      'tests/*.ts': ['typescript'],
      'tests/*.json': ['json_fixtures']
    },
    jsonFixturesPreprocessor: {
      variableName: '__json__'
    },
    typescriptPreprocessor: {
      options: {
        sourceMap: false,
        target: 'ES5',
        noImplicitAny: true,
        noResolve: true,
        removeComments: true
      },
      transformPath: function (path) {
        return path.replace(/\.ts$/, '.js');
      }
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity
  })
}

