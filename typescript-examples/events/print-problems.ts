import { Config, events, forStream, printError, type Event } from "xcl-lang";

const logEvent = events.toLogger(console, { order: "message-first" });

function onEvent(event: Event): void {
  logEvent(event);

  // one problem's error collects no others; the error that ends the call
  // collects them all as its causes
  if (event.error !== undefined && event.error.tokens.length > 0 && event.error.causes.length === 0) {
    printError(event.error, { formatter: forStream(process.stderr) });
  }
}

await using config = new Config({ onEvent });
