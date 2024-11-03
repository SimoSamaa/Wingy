const debounce = <T extends [string, string]>(
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

export default debounce;