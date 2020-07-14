"use strict";

const fs = require("fs");
var pkgcloud = require("../corsUpdater/custom_modules/pkgcloud");

// this will show the operation progress on the terminal
const cliProgress = require("cli-progress");

// create a file only file logger
const log = require("simple-node-logger").createSimpleFileLogger(
  "activity.log"
);

// create a new progress bar instance and use shades_classic theme
const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

var sourceContainerName = "rackspace_source_container";
var destContainerName = "rackspace_destination_container";

var filecount = 0;
var successCount = 0;
var failedOperation = 0;

// each client is bound to a specific service and provider
var client = pkgcloud.providers.rackspace.storage.createClient({
  provider: "rackspace",
  username: "<user_name>",
  apiKey: "<api_key>",
  region: "<region>",
});

const delay = (millis) =>
  new Promise((resolve, reject) => {
    setTimeout((_) => resolve(), millis);
  });

var filesToCopy = [
  "Photos/32454183-efgc-4ff4-a72f-6501453a8a43.jpg",
  "Photo Thumbnails/54345f57-g398-4e7c-8d00-de43625e93bb_Thumb.jpg",
  "Videos/5s3e5r47-g498-4e7c-8d00-de43625e93be.mp4",
];

async function getFile(fileName) {
  return new Promise(function (resolve, reject) {
    client.getFile(sourceContainerName, fileName, function (err, file) {
      if (err) {
        resolve(null);
      } else {
        resolve(file);
      }
    });
  });
}

async function copy(file) {
  return new Promise(function (resolve, reject) {
    var fileName = file.name;

    // set cors policy
    var origin = 'https://admin.sample_origin.com';

    var options = {
      sourceContainer: sourceContainerName,
      destinationContainer: destContainerName,
      sourceFile: file,
      destinationFile: fileName,
      headers: {
        "Access-Control-Allow-Origin": origin,
      },
    };

    client.copy(options, function (err) {
      if (err) {
        log.info("File:", fileName, " - copy error occured: ", err);
        resolve(false);
      } else {
        log.info("File:", fileName, " - copied successfully!");
        resolve(true); // successfully fill promise
      }
    });
  });
}

async function runUpdater() {
  // start the progress bar with a total array count and start value of 0
  bar1.start(filesToCopy.length, 0);

  while (filecount < filesToCopy.length) {
    try {
      var file = await getFile(filesToCopy[filecount]);
      if (file == null) {
        failedOperation++;
        log.info("File accessing error: ", err);
      } else {
        var status = await copy(file);
        if (status) {
          // log.info(file);
          // log.info("", file.name, " file copied successfully!");
          successCount++;
        } else {
          failedOperation++;
          log.info("+++++++++++++++++++++++++++++++++++++++++++++++");
          log.info(file);
          log.info("+++++++++++++++++++++++++++++++++++++++++++++++");
          log.info("", file.name, " file copy falied!");
          log.info("+++++++++++++++++++++++++++++++++++++++++++++++");
        }
      }
      // wait 1 second 
      await delay(1000);
    } catch (err) {
      failedOperation++;
      log.info("Error caught: ", err);
    }
    filecount++;
    bar1.update(filecount);
  }

  // stop the progress bar
  bar1.update(filesToCopy.length);
  bar1.stop();

  log.info("Total items processed: ", filecount);
  log.info("Total items copied: ", successCount);
  log.info("", failedOperation, " items operations failed!!!\n\n");
}

runUpdater();

/*
https://support.rackspace.com/how-to/set-up-cloud-files-and-acls/
https://support.rackspace.com/how-to/set-up-cors-on-cloud-files/
https://developer.rackspace.com/docs/cloud-files/v1/storage-api-reference/object-services-operations/#get-object-content-and-metadata
https://developer.rackspace.com/docs/cloud-files/quickstart/?lang=node.js
https://git.isi.nc/smti/pkgcloud_bis/commit/05e5bfe674683b82caac4531b7fbbfaacc5e3c10
https://git.isi.nc/smti/pkgcloud_bis/-/blob/05e5bfe674683b82caac4531b7fbbfaacc5e3c10/test/rackspace/storage/storage-object-test.js
https://git.isi.nc/smti/pkgcloud_bis/-/blob/master/lib/pkgcloud/amazon/storage/file.js
https://git.isi.nc/smti/pkgcloud_bis/-/blob/master/examples/storage/rackspace.js
https://git.isi.nc/smti/pkgcloud_bis/-/blob/master/docs/providers/hp/storage.md
https://stackabuse.com/reading-and-writing-json-files-with-node-js/
*/
