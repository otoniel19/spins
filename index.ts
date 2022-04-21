import cliSpinners from "cli-spinners";
import readline from "readline";
import * as utils from "./utils";
import c from "chalk";

//to stop and persist the spinner this is required
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

process.stdin.on("keypress", (str, key) => {
  if (key.ctrl && key.name === "c") process.exit();
  if (key.ctrl && key.name === "d") process.exit();
});

/**
 * the spins class
 */
class spins {
  options: utils.options;
  private interval: NodeJS.Timer = setInterval(() => {});
  private index: number = 0;
  text: any = "";
  /**
   * @param options the options
   */
  constructor(options: utils.options) {
    this.options = options;
  }
  /**
   * starts the spinner and returns the instance
   * @example
   * ```ts
   * import spins from 'spins'
   * const spin = new spins({
   *  stream: process.stdout,
   *  spinner: 'dots',
   *  color: 'green',
   * });
   * spin.start("loading...");
   * ```
   */
  start(...text: any[]): this {
    var opts = this.options;
    //@ts-ignore
    var spinner = cliSpinners[opts.spinner] || opts.spinner;
    this.text = text.join(" ");
    this.interval = setInterval(() => {
      opts.stream.clearScreenDown();
      //if has a color
      if (opts.color)
        opts.stream.write(
          `\r${c[opts.color](spinner.frames[this.index++])} ${text.join(" ")}`
        );
      //else write the spinner without color
      else
        opts.stream.write(
          `\r${spinner.frames[this.index++]} ${text.join(" ")}`
        );
      //if index is greater than the length of the frames array, reset it
      if (this.index === spinner.frames.length) this.index = 0;
    }, spinner.interval);
    return this;
  }
  /**
   * stop the spinner and exit the process
   */
  stop() {
    process.exit();
  }
  /**
   * stop and persist the process
   */
  stopAndPersist(): this {
    var opts = this.options;
    clearInterval(this.interval);
    opts.stream.clearLine(0);
    return this;
  }
  /**
   * resumes the spinner with the old text
   */
  resume(): this {
    this.options.stream.clearScreenDown();
    this.start.apply(this, [this.text.split(" ")]);
    return this;
  }
  /**
   * write a success message and exit the spinner
   */
  success(...text: any[]) {
    var opts = this.options;
    opts.stream.clearLine(0);
    opts.stream.write(`${utils.symbols.success} ${text.join(" ")}\r`);
    this.stop();
  }
  /**
   * write a error message and exit the spinner
   */
  fail(...text: any[]) {
    var opts = this.options;
    opts.stream.clearLine(0);
    opts.stream.write(`${utils.symbols.fail} ${text.join(" ")}\r`);
    this.stop();
  }
  /**
   * write a warning message
   */
  warn(...text: any[]): this {
    var opts = this.options;
    this.stopAndPersist();
    opts.stream.write(`\r${utils.symbols.warn} ${text.join(" ")}`);
    return this;
  }
  /**
   * write a info message
   */
  info(...text: any[]): this {
    var opts = this.options;
    this.stopAndPersist();
    opts.stream.write(`\r${utils.symbols.info} ${text.join(" ")}`);
    return this;
  }
  /**
   * update the text
   */
  setText(...text: any[]): this {
    this.text = text.join(" ");
    this.stopAndPersist();
    this.start(...text);
    return this;
  }
  /**
   * update the spinner
   */
  setSpinner(spinner: utils.options["spinner"]): this {
    this.options.spinner = spinner;
    this.stopAndPersist();
    this.resume();
    return this;
  }
  /**
   * update the color
   */
  setColor(color: utils.options["color"]): this {
    this.options.color = color;
    this.stopAndPersist();
    this.resume();
    return this;
  }
  /**
   * remove the spinner and logs the text and resume the spinner
   */
  log(...data: any[]): this {
    this.stopAndPersist();
    this.options.stream.cursorTo(0);
    console.log(...data);
    this.resume();
    return this;
  }
}

export = spins;
