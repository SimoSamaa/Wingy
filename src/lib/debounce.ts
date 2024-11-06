const debounce = <T extends unknown[]>(
  fn: (...args: T) => void,
  delay: number,
  immediate: boolean = false
) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: T) => {
    const callNow = immediate && !timeout;
    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      timeout = null;
      if (!immediate) fn(...args);
    }, delay);

    if (callNow) fn(...args);
  };
};

// const debounce = <T extends unknown[]>(
//   fn: (...args: T) => void,
//   delay: number
// ) => {
//   let timeout: ReturnType<typeof setTimeout>;

//   return (...args: T) => {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => {
//       fn(...args);
//     }, delay);
//   };
// };

export default debounce;