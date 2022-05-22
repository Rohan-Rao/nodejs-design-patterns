const EventEmitter = require("events");
const fs = require("fs");

const FILE_READ_ERROR = "file-read-error";
const FILE_READ_SUCCESSFULLY = "file-read-successfully";
const FILE_MATCHED = "file-matched";

const findFilesWithRegex = (files, regex) => {
  const eventEmitter = new EventEmitter();

  for (const file of files) {
    fs.readFile(file, "utf8", (err, data) => {
      if (err) {
        eventEmitter.emit(FILE_READ_ERROR, err);
      }

      eventEmitter.emit(FILE_READ_SUCCESSFULLY, data);
      const fileMatched = data.match(regex);
      if (fileMatched) {
        eventEmitter.emit(FILE_MATCHED, file);
      }
    });
  }
  return eventEmitter;
};

const main = () => {
  findFilesWithRegex(
    ["dummy-files/file-1.txt", "dummy-files/file-2.txt"],
    /hello/i
  )
    .on(FILE_READ_ERROR, (err) => {
      console.error(err);
    })
    .on(FILE_READ_SUCCESSFULLY, (data) => console.log(data))
    .on(FILE_MATCHED, (fileName) =>
      console.log("*** Matched file name ***", fileName)
    );
};

main();
