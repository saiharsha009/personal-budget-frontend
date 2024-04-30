export const call = async (func, ...args) => {
  try {
    if (args)
      await func(...args);
    else
      await func();
  } catch (err) {
    alert('Something went wrong!!!');
  }
}