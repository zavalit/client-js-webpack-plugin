var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));

function ClientJsWebpackPlugin(libraries)
{
  this.vendor_dir_path = "/var/www/node_modules/";
  this.dest_file_path = "/var/www/public/client.js";
  this.libraries = libraries;
}

ClientJsWebpackPlugin.prototype.apply = function(compiler)
{
  compiler.plugin('emit', function(compilation, done) {

    var content = "";
    var vendor_dir_path = this.vendor_dir_path;

    var Promises = this.libraries.map(function(path){
      return fs.readFileAsync(vendor_dir_path + path).then(function(data){

        content = content + '\n\n' +  data;

      });
    });

    Promise.all(Promises).then(function(){
      compilation.assets["client.js"] = this.createAssetFromContent(content);
    }.bind(this)).nodeify(done);

 }.bind(this));
}

ClientJsWebpackPlugin.prototype.loadContent = function (){


}

ClientJsWebpackPlugin.prototype.processData = function (data){
  fs.appendFile(this.dest_file_path, '\n\n'+data, function(err){
    if(err !== null)
      console.log(err);


  })
}

ClientJsWebpackPlugin.prototype.createAssetFromContent = function (contents){
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
