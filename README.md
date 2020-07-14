# Rackspace Cloud File Copy Script

If you want to move large set of files from one of your cloud container to another cloud container, you can use this NodeJS project.

Important:
I had to modify pkgcloud node module to remove "x-object-meta-" prefix when setting the headers. So I have uploaded customized node_module in side the project. So you can use it.

_createHeaders: function (metadata) {
    var headers = {};
    Object.keys(metadata).forEach(function (key) {
      //I removed this "x-object-meta-" prefix to fix cors origin key issue
      var header = "x-object-meta-" + key;
      headers[header] = metadata[key];
    });

    return headers;
  }
