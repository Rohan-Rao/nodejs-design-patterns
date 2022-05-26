/**
 * Code Assignment 3.1:
 * A simple event - Modify the FindRegex class in making-any-object-observable.js, so that
 * it emits an event when the process starts, passing input file list as an argument.
 * Hint: beware of Zalgo!
 */

const EventEmitter = require("events");
const fs = require("fs");

class FileFinder extends EventEmitter {
  constructor(regex) {
    super();
    this.files = [];
    this.regex = regex;
  }

  addFile(filePath) {
    this.files.push(filePath);
    return this;
  }

  find() {
    for (const file of this.files) {
      // Zalgo eliminated!!
      process.nextTick(() => {
        this.emit("find-process-started", file);
      });
      fs.readFile(file, "utf8", (err, content) => {
        if (err) {
          this.emit("error", err);
          return;
        }

        const matchResults = content.match(this.regex);
        if (matchResults) {
          for (const matchResult of matchResults) {
            this.emit("file-found", file, matchResult);
          }
        }
      });
    }
    return this;
  }
}

const main = () => {
  const fileFinder = new FileFinder(/code/gi);
  fileFinder
    .addFile("dummy-files/file-1.txt")
    .addFile("dummy-files/file-2.txt")
    .find()
    .on("find-process-started", (fileLocation) =>
      console.log("Find process started for file", fileLocation)
    )
    .on("error", (err) => console.error("error: ", err))
    .on("file-found", (...data) => console.log(data));
};

main();
