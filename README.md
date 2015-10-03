# client-js-webpack-plugin
Puts multiple js libraries into one client.js file

## Usage
    
    // webpack.config.js
    var clientJsWebpackPlugin = require('client-js-webpack-plugin'),

    module.exports = {
      entry: { ... },
      ...
      plugins: [
           new clientJsWebpackPlugin(['jquery/dist/jquery.min.js', 'hammerjs/hammer.min.js', 'materialize-sass-origin/js/bin/materialize.min.js'])
      ]
    
    }
