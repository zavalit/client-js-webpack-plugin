var fs = require('fs');

function ClientJsWebpackPlugin(libraries)
{
  this.vendor_dir_path = "/var/www/node_modules/";
  this.dest_file_path = "/var/www/public/client.js";
  this.libraries = libraries;
}

ClientJsWebpackPlugin.prototype.apply = function(compiler)
{
  fs.writeFile(this.dest_file_path, '//client.js\n', function(err){
    if(err !== null)
      console.log(err);
  })

  this.libraries.forEach(function(path){
    fs.readFile(this.vendor_dir_path + path, function(err, data){

      if(err !== null)
        console.log(err);

      this.processData(data);
    }.bind(this));
  }.bind(this))
  
  console.log(this.dest_file_path + " created!");
}

ClientJsWebpackPlugin.prototype.processData = function (data){
  fs.appendFile(this.dest_file_path, data + '\n', function(err){
    if(err !== null)
      console.log(err);


  })
}


module.exports = ClientJsWebpackPlugin;
