/**
 * Sleep for a specified amount of time.
 * @param seconds Sleep time in seconds. Default is 1 second.
 * @example
 * ```ts
 * await sleep(2);
 * ```
 * @returns Always returns true after the sleep time.
 */
const sleep = (seconds: number = 1): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, seconds * 1000);
  });
};

export default sleep;
