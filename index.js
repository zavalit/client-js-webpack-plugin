var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));

function ClientJsWebpackPlugin(libraries)
{
  this.vendor_dir_path = "./node_modules/";
  this.dest_file_path = "./public/client.js";
  this.libraries = libraries;
}

ClientJsWebpackPlugin.prototype.apply = function(compiler)
{
  compiler.plugin('emit', function(compilation, done) {

    var content_blocks = []
    var vendor_dir_path = this.vendor_dir_path;

    var Promises = this.libraries.map(function(path){
      return fs.readFileAsync(vendor_dir_path + path).then(function(data){

        content_blocks[path] =  '\n\n' +  data;

      });
    });

    Promise.all(Promises).then(function(){
      compilation.assets["client.js"] = this.createAssetFromContent(content_blocks);
    }.bind(this)).nodeify(done);

 }.bind(this));
}


ClientJsWebpackPlugin.prototype.createAssetFromContent = function (content_blocks){

  var contents = "";

  this.libraries.forEach(function(path){
      contents = contents + '\n\n' + content_blocks[path]
  })

   return {
     source: function() {
       return contents;
     },
     size: function() {
       return contents.length;
     }
   };
}


module.exports = ClientJsWebpackPlugin;
