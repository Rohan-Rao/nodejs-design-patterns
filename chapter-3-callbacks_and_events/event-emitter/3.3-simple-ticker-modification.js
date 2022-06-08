const EventEmitter = require("events");
const recursiveTo = (numOfMs, eventEmitter, cb, currMs, numOfTicks) => {
  let timeoutId = null;
  timeoutId = setTimeout(() => {
    if (currMs >= numOfMs) {
      clearTimeout(timeoutId);
      cb(numOfTicks);
      return;
    }
    eventEmitter.emit("tick");
    recursiveTo(numOfMs, eventEmitter, cb, currMs + 50, numOfTicks + 1);
  }, 50);
};

function ticker2(numOfMs, cb) {
  const eventEmitter = new EventEmitter();
  setImmediate(() => {
    eventEmitter.emit("start-tick");
  });
  let numOfTicks = 0;
  let currentMS = 0;
  recursiveTo(numOfMs, eventEmitter, cb, currentMS, numOfTicks);
  return eventEmitter;
}

function main() {
  ticker2(300, (numOfTicks) => {
    console.log(`Number of ticks: ${numOfTicks}`);
  })
    .on("start-tick", () => console.log("Staring Ticker"))
    .on("tick", () => console.log("Ticking..."));
}

main();
