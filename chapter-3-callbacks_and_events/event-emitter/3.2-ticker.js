/**
 * 3.2 Ticker
 */

const EventEmitter = require("events");

function ticker(numOfMs, cb) {
  let timeoutId = null;
  const eventEmitter = new EventEmitter();
  const emitEventEvery = 50; // in MS
  let numOfTicks = 0;
  let currentTicksInMs = 0;
  timeoutId = setInterval(() => {
    if (currentTicksInMs >= numOfMs) {
      cb(numOfTicks);
      clearInterval(timeoutId);
      return eventEmitter;
    }
    eventEmitter.emit("tick");
    numOfTicks += 1;
    currentTicksInMs += emitEventEvery;
  }, emitEventEvery);

  return eventEmitter;
}

/**
 *  recursive example as suggested in the question hint
 */

// const recursiveTo = (numOfMs, eventEmitter, cb, currMs, numOfTicks) => {
//   let timeoutId = null;
//   timeoutId = setTimeout(() => {
//     if (currMs >= numOfMs) {
//       clearTimeout(timeoutId);
//       cb(numOfTicks);
//       return;
//     }
//     eventEmitter.emit("tick");
//     recursiveTo(numOfMs, eventEmitter, cb, currMs + 50, numOfTicks + 1);
//   }, 50);
// };

// function ticker2(numOfMs, cb) {
//   const eventEmitter = new EventEmitter();
//   let numOfTicks = 0;
//   let currentTicksInMs = 0;
//   recursiveTo(numOfMs, eventEmitter, cb, numOfTicks, currentTicksInMs);
//   return eventEmitter;
// }

function main() {
  ticker(200, (numOfTicks) => {
    console.log(`Total ticks: ${numOfTicks}`);
  }).on("tick", () => console.log("Ticking..."));
}

main();
