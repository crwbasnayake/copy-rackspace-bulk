# Rackspace Cloud File Copy Script

This node.js project is created to copy large set of files from one of your cloud container to another cloud container

Important:
I had to modify pkgcloud node module to remove "x-object-meta-" prefix when setting the headers. So I have uploaded customized node_module in side the project. So you can use it.
https://developer.rackspace.com/docs/cloud-files/quickstart/?lang=node.js#change-object-metadata

pkgcloud/lib/pkgcloud/openstack/storage/storageClient.js
```sh
// removed this "x-object-meta-" prefix to fix cors origin key issue
// const OBJECT_META_PREFIX = 'x-object-meta-';
const OBJECT_META_PREFIX = '';
```

Created by:
Charitha Basnayake
crwbasnayake@gmail.com

Reference:
https://developer.rackspace.com/docs/cloud-files/quickstart/?lang=node.js
https://developer.rackspace.com/docs/cloud-files/v1/storage-api-reference/object-services-operations/#get-object-content-and-metadata
https://support.rackspace.com/how-to/set-up-cloud-files-and-acls/
https://support.rackspace.com/how-to/set-up-cors-on-cloud-files/
https://git.isi.nc/smti/pkgcloud_bis/commit/05e5bfe674683b82caac4531b7fbbfaacc5e3c10
https://git.isi.nc/smti/pkgcloud_bis/-/blob/05e5bfe674683b82caac4531b7fbbfaacc5e3c10/test/rackspace/storage/storage-object-test.js
https://git.isi.nc/smti/pkgcloud_bis/-/blob/master/lib/pkgcloud/amazon/storage/file.js
https://git.isi.nc/smti/pkgcloud_bis/-/blob/master/examples/storage/rackspace.js
https://git.isi.nc/smti/pkgcloud_bis/-/blob/master/docs/providers/hp/storage.md
https://stackabuse.com/reading-and-writing-json-files-with-node-js/
