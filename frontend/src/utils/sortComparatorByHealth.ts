export const sortComparatorByHealth =
  () =>
  (
    a: { red: number; green: number; blue: number },
    b: { red: number; green: number; blue: number }
  ) => {
    const getRgbValue = (rgb: { red: number; green: number; blue: number }) =>
      rgb.red * 65536 + rgb.green * 256 + rgb.blue;
    const aValue = getRgbValue(a);
    const bValue = getRgbValue(b);
    return aValue - bValue;
  };
