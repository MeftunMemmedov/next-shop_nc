export const debounce = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callback: (...args: any[]) => void,
  waitTime: number
) => {
  let timer: NodeJS.Timeout;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
    }, waitTime);
  };
};
