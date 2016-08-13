var path = require('path');
module.exports = {
  module: {
    loaders: [{
      test : /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader : 'babel',
      query: {
        presets: ['es2015', 'react']
      }
    },
    {
      test: /\.scss$/,
      loaders: ["style", "css", "sass"]
    }

    ]
  },
  entry: {
    main: "./javascript/main.js"
  },
  output: {

    filename: "./javascript/bundle.js",
    chunkFilename: "./javascript/[id].js"
  }
}
