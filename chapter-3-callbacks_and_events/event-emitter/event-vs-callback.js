const EventEmitter = require("events");

const helloWorldCallBack = (cb) => {
  setTimeout(() => cb(null, "Hello World!"), 0);
};

const helloWorldEvent = () => {
  const eventEmitter = new EventEmitter();
  setTimeout(() => eventEmitter.emit("msg", "Hello World"), 0);
  return eventEmitter;
};

const main = () => {
  helloWorldCallBack((err, msg) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("[CALLBACK] ", msg);
  });

  helloWorldEvent().on("msg", (msg) => {
    console.log("[EVENT] ", msg);
  });
};

main();
