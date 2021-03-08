System.config({
    transpiler: 'plugin-babel',
    meta: {
      'devextreme/localization.js': {
        "esModule": true
      },
  },
    paths: {
      'npm:': 'https://unpkg.com/'
    },
    defaultExtension: 'js',
    map: {
      'react': 'npm:react@16.14.0/umd/react.development.js',
      'react-dom': 'npm:react-dom@16.14.0/umd/react-dom.development.js',
      'prop-types': 'npm:prop-types@15.7.2/prop-types.js',
      'globalize': 'npm:globalize@1.1.1/dist/globalize',
      'json': 'npm:systemjs-plugin-json@0.3.0/json.js',
      'cldr': 'npm:cldrjs@0.4.4/dist/cldr',
      'rrule': 'npm:rrule@2.6.6/dist/es5/rrule.js',
      'luxon': 'npm:luxon@1.25.0/build/global/luxon.min.js',
      'es6-object-assign': 'npm:es6-object-assign@1.1.0',
      'devextreme': 'npm:devextreme@20.2.5',
      'devextreme-react': 'npm:devextreme-react@20.2.5',
      'jszip': 'npm:jszip@3.5.0/dist/jszip.min.js',
      'devextreme-quill': 'npm:devextreme-quill@0.9.8/dist/dx-quill.min.js',
      'devexpress-diagram': 'npm:devexpress-diagram@2.0.11/dist/dx-diagram.js',
      'devexpress-gantt': 'npm:devexpress-gantt@2.0.18/dist/dx-gantt.js',
      'preact': 'npm:preact@10.5.11/dist/preact.js',
      'preact/hooks': 'npm:preact@10.5.11/hooks/dist/hooks.js',
      // SystemJS plugins
      'plugin-babel': 'npm:systemjs-plugin-babel@0.0.25/plugin-babel.js',
      'systemjs-babel-build': 'npm:systemjs-plugin-babel@0.0.25/systemjs-babel-browser.js'
    },
    packages: {
      'devextreme': {
        defaultExtension: 'js'
      },
      'devextreme-react': {
        main: 'index.js'
      },
      'devextreme/events/utils': {
        main: 'index'
      },
      'devextreme/events': {
        main: 'index'
      },
      'globalize': {
        main: '../globalize.js',
        defaultExtension: 'js'
      },
      'cldr': {
        main: '../cldr.js',
        defaultExtension: 'js'
      },
      'es6-object-assign': {
        main: './index.js',
        defaultExtension: 'js'
      }
    },
    babelOptions: {
      sourceMaps: false,
      stage0: true,
      react: true
    }
  });
  