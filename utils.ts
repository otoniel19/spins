import cliSpinners from "cli-spinners";
import c from "chalk";

export interface options {
  /**
   * The stream to use to show the spinner
   * @example
   * ```ts
   * import spins from 'spins'
   * const spin = new spins({ stream: process.stdout })
   * ```
   */
  stream: NodeJS.WriteStream;
  /**
   * the spinner to use

   * @example
   * ```ts
   * import spins from 'spins'
   * const spin = new spins({ stream: process.stdout, spinner: 'dots' })
   * ```
   */
  spinner: cliSpinners.SpinnerName | { frames: string[]; interval: number };
  /**
   * the color of the spinner
   * @example
   * ```ts
   * import spins from 'spins'
   * const spin = new spins({ stream: process.stdout, color: 'red' })
   * ```
   */
  color?: typeof c.Color;
}

export const symbols = {
  success: c.green("✔"),
  fail: c.red("✖"),
  warn: c.yellow("⚠"),
  info: c.blue("ℹ")
};
