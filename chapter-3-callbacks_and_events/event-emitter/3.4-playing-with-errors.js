const EventEmitter = require("events");

const checkIfCurrTimestampIsDivisibleByFive = () => {
  const currTimestamp = Date.now();
  return currTimestamp % 5 === 0;
};

const recursiveTo = (numOfMs, eventEmitter, cb, currMs, numOfTicks) => {
  let timeoutId = null;
  timeoutId = setTimeout(() => {
    if (currMs >= numOfMs) {
      clearTimeout(timeoutId);
      cb(null, numOfTicks);
      return;
    }
    const isDivisible = checkIfCurrTimestampIsDivisibleByFive();
    if (isDivisible) {
      eventEmitter.emit("error", new Error("Divisible by 5"));
      cb(new Error("Divisible by 5"));
      return;
    }
    eventEmitter.emit("tick");
    recursiveTo(numOfMs, eventEmitter, cb, currMs + 50, numOfTicks + 1);
  }, 50);
};

function ticker(numOfMs, cb) {
  const eventEmitter = new EventEmitter();
  setImmediate(() => {
    eventEmitter.emit("start-tick");
    const isDivisible = checkIfCurrTimestampIsDivisibleByFive();
    if (isDivisible) {
      eventEmitter.emit("error", new Error("Divisible by 5"));
      cb(new Error("Divisible by 5"));
      return;
    } else {
      recursiveTo(numOfMs, eventEmitter, cb, 0, 0);
    }
  });

  return eventEmitter;
}

function main() {
  ticker(300, (err, numOfTicks) => {
    if (err) {
      console.error("Error via callback:", err.message);
      throw err;
    }
    console.log(`Number of ticks: ${numOfTicks}`);
  })
    .on("error", (err) =>
      console.error("error propagated via EventEmitter: ", err.message)
    )
    .on("start-tick", () => console.log("Staring Ticker"))
    .on("tick", () => console.log("Ticking..."));
}

main();
