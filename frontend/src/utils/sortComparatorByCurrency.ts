export const sortComparatorByCurrency = () => (a: string, b: string) => {
  const value1 = Number(a.replace(/[^0-9.-]+/g, ""));
  const value2 = Number(b.replace(/[^0-9.-]+/g, ""));
  return value1 - value2;
};
