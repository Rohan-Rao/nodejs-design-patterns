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
    .on("error", (err) => console.error("error: ", err))
    .on("file-found", (...data) => console.log(data));
};

main();
